using DataAccess.Repository;
using Domain.Interfaces;
using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OnlabAPI.DataTransferObjects;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToppingController : ControllerBase
    {
        private readonly IPizzaService _pizzaService;
        public ToppingController(IPizzaService pizzaService)
        {
            _pizzaService = pizzaService;
        }

        [HttpGet]
        public async Task<ActionResult> GetToppings() 
        {
            var toppings = await _pizzaService.GetAllToppings();
            if (toppings == null)
            {
                return NotFound("Nincsenek feltétek");
            }
            return Ok(toppings);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<ToppingDTO>> PostTopping([FromForm]ToppingDTO topping)
        {
            var newtopping = new Topping
            {
                Name = topping.Name,
            };
            await _pizzaService.AddTopping(newtopping, topping.Restrictions);
            return CreatedAtAction(nameof(PostTopping), topping);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> PutTopping(ToppingDTO topping, int id)
        {
            var newTopping = new Topping
            {
                Name = topping.Name,
            };
            var result = await _pizzaService.ChangeTopping(newTopping, id, topping.Restrictions);
            if (!result)
            {
                return NotFound("Nincs ilyen feltét");
            }
            return CreatedAtAction(nameof(PutTopping), newTopping);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTopping(int id)
        {
            var result = await _pizzaService.DeleteTopping(id);
            if (!result)
            {
                return NotFound("Nincs ilyen feltét");
            }
            return Ok("sikeres törlés");
        }
    }
}
