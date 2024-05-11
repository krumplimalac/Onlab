using DataAccess.Repository;
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
        private readonly IDrinkRepository _drinkRepository;
        private DTOMappers mapper = new DTOMappers();

        public DrinkController(IDrinkRepository repo)
        {
            _drinkRepository = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetDrinks([FromQuery] Parameter parameters) 
        {
            var drinks = await _drinkRepository.GetAll(parameters);
            if (drinks == null)
            {
                return NotFound();
            }
            List<ItemDTO> items = [];
            foreach (var drink in drinks)
            {
                items.Add(mapper.DrinkToDTO(drink));
            }
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
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDTO>> GetDrink(int id)
        {
            var drink = await _drinkRepository.GetDrinkById(id);
            if (drink == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(mapper.DrinkToDTO(drink));
            }
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
            var result = await _drinkRepository.PostDrink(newDrink);
            if (!result)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetDrinks), newDrink);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutDrink(DrinkDTO drink,int id)
        {
            var newDrink = new Drink
            {
                Name = drink.Name,
                Description = drink.Description,
                Price = drink.Price,
                Type = drink.Type,
                File = drink.File
            };
            var result = await _drinkRepository.PutDrink(newDrink, id);
            if (!result)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetDrinks), newDrink);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDrink(int id)
        {
            var deleted = await _drinkRepository.DeleteDrink(id);
            if (!deleted)
            {
                return NotFound();
            }
            return Ok();
        }

    }
}
