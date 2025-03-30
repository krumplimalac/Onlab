using DataAccess.Repository;
using Domain.Interfaces;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OnlabAPI.DataTransferObjects;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly IPizzaService _pizzaService;
        DTOMappers mapper = new DTOMappers();
        public PizzaController(IPizzaService service)
        {
            _pizzaService = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllPizzas([FromQuery] PizzaParameters parameters)
        {
            if (parameters == null) return BadRequest("Rossz paraméterek");

            var pizzas = await _pizzaService.GetAllPizzas(parameters);
            if (pizzas == null)
            {
                return NotFound("Nincsenek pizzák");
            }
            var metadata = new
            {
                pizzas.TotalCount,
                pizzas.PageSize,
                pizzas.CurrentPage,
                pizzas.TotalPages,
                pizzas.HasNext,
                pizzas.HasPrevious
            };
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(metadata));
            List<ItemDTO> pizzaDTOs = [];
            foreach(var pizza in pizzas)
            {
                pizzaDTOs.Add(mapper.PizzaToDTO(pizza));
            }
            return Ok(pizzaDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPizzaById(int id)
        {
            var pizza = await _pizzaService.GetPizzaById(id);
            if (pizza == null)
            {
                return NotFound("Nincs ilyen pizza");
            }
            return Ok(mapper.PizzaToDTO(pizza));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<PizzaDTO>> PostPizza(PizzaDTO pizza)
        {

            await _pizzaService.AddPizza(mapper.DTOtoPizza(pizza), pizza.Toppings);
            return CreatedAtAction(nameof(PostPizza), pizza);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> PutPizza(PizzaDTO pizza, int id)
        {
            var result = await _pizzaService.ChangePizza(mapper.DTOtoPizza(pizza), id, pizza.Toppings);
            if (!result)
            {
                return NotFound("Nincs ilyen pizza");
            }
            var newPizza = await _pizzaService.GetPizzaById(id);
            if (newPizza == null) return NotFound("Nincs ilyen pizza");
            ItemDTO itemDTO = mapper.PizzaToDTO(newPizza);
            return Ok(itemDTO);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePizza(int id)
        {
            var result = await _pizzaService.DeletePizza(id);
            if (!result)
            {
                return NotFound("Nincs ilyen pizza");
            }
            return Ok("sikeres törlés");
        }

    }
}
