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
        private readonly IPizzaRepository _repository;
        DTOMappers mapper = new DTOMappers();
        public PizzaController(IPizzaRepository repo)
        {
            _repository = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllPizzas([FromQuery] PizzaParameters parameters)
        {
            var pizzas = await _repository.GetAllPizzas(parameters);
            if (pizzas == null)
            {
                return NotFound();
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
            var pizza = await _repository.GetPizzaById(id);
            if (pizza == null)
            {
                return NotFound();
            }
            return Ok(mapper.PizzaToDTO(pizza));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PizzaDTO>> PostPizza(PizzaDTO pizza)
        {
            var toppings = JsonConvert.DeserializeObject<int[]>(pizza.Toppings);
            var newPizza = new Pizza
            {
                Name = pizza.Name,
                Description = pizza.Description,
                Price = pizza.Price,
                File = pizza.formFile
            };
            var result = await _repository.PostPizza(newPizza, toppings);
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePizza(int id)
        {
            var result = await _repository.DeletePizza(id);
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }

    }
}
