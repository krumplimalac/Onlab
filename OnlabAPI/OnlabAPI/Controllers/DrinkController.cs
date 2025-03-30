using DataAccess.Repository;
using Domain.Interfaces;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OnlabAPI.DataTransferObjects;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinkController : ControllerBase
    {
        private readonly IDrinkService _drinkService;
        private DTOMappers mapper = new DTOMappers();

        public DrinkController(IDrinkService service)
        {
            _drinkService = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetDrinks([FromQuery] Parameter parameters) 
        {
            if (parameters == null) return BadRequest("Roszz paraméterek");

            var drinks = await _drinkService.GetAllDrinksToPagedList(parameters);

            if (drinks == null)
            {
                return NotFound("Nincsenek italok");
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
            var drink = await _drinkService.GetDrinkById(id);
            if (drink == null)
            {
                return NotFound("Nincs ilyen ital");
            }
            else
            {
                return Ok(mapper.DrinkToDTO(drink));
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> PostDrink(DrinkDTO drink)
        {
            await _drinkService.AddDrink(mapper.DTOtoDrink(drink));
            return CreatedAtAction(nameof(PostDrink), drink);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> PutDrink(DrinkDTO drink,int id)
        {
            var result = await _drinkService.ChangeDrink(mapper.DTOtoDrink(drink), id);
            if (result == null)
            {
                return NotFound("Nincs ilyen ital");
            }
            ItemDTO itemDTO = mapper.DrinkToDTO(result);
            return Ok(itemDTO);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDrink(int id)
        {
            var deleted = await _drinkService.DeleteDrink(id);
            if (!deleted)
            {
                return NotFound("Nincs ilyen ital");
            }
            return Ok("Sikeres törlés");
        }

    }
}
