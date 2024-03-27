using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlabAPI.DataTransferObjects;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinkController : ControllerBase
    {
        private readonly IDrinkRepository _drinkrepository;

        public DrinkController(IDrinkRepository repo)
        {
            _drinkrepository = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetDrinks([FromQuery] Parameter parameters) 
        {
            var drinks = await _drinkrepository.GetAll(parameters);
            var metadata = new
            {
                drinks.TotalCount,
                drinks.PageSize,
                drinks.CurrentPage,
                drinks.TotalPages,
                drinks.HasNext,
                drinks.HasPrevious
            };

            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(metadata));

            if (drinks == null)
            {
                return NotFound();
            }
            return Ok(drinks);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> PostDrink(DrinkDTO drink)
        {
            var newDrink = new Drink
            {
                Name = drink.Name,
                Description = drink.Description,
                Price = drink.Price,
                Type = drink.Type,
                File = drink.File
            };
            await _drinkrepository.PostDrink(newDrink);
            return CreatedAtAction(nameof(GetDrinks), newDrink);
        }

    }
}
