using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using OnlabAPI.DataTransferObjects;


namespace OnlabAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly IMealService _mealService;
        private DTOMappers mapper = new DTOMappers();
        public MealController(IMealService service)
        {
            _mealService = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<ItemDTO>>> GetMeals([FromQuery] MealParameters mealParameters)
        {
            if (mealParameters == null) return BadRequest("Roszz paraméterek");

            var pagedMeals = await _mealService.GetAllMealsToPagedList(mealParameters);

            if (pagedMeals == null)
            {
                return NotFound("Nincsenek ételek");
            }

            List<ItemDTO> itemDTOs = [];
            foreach (var meal in pagedMeals)
            {
                itemDTOs.Add(mapper.MealToDTO(meal));
            }
            var metadata = new
            {
                pagedMeals.TotalCount,
                pagedMeals.PageSize,
                pagedMeals.CurrentPage,
                pagedMeals.TotalPages,
                pagedMeals.HasNext,
                pagedMeals.HasPrevious
            };
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(metadata));
            return Ok(itemDTOs);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDTO>> GetMealById(int id)
        {
            ItemDTO itemDTO;
            var meal = await _mealService.GetMealById(id);
            if (meal == null)
            {
                return NotFound("Nincs ilyen étel!");
            }
            itemDTO = mapper.MealToDTO(meal);
            return Ok(itemDTO);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<MealDTO>> PostMeal(MealDTO meal)
        {
            await _mealService.AddMeal(mapper.DTOtoMeal(meal), meal.Restrictions);
            return CreatedAtAction(nameof(PostMeal), meal);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ItemDTO>> PutMeal(MealDTO meal,int id)
        {

            var result = await _mealService.ChangeMeal(mapper.DTOtoMeal(meal), id, meal.Restrictions);
            if (result == null)
            {
                return NotFound("Nincs ilyen étel");
            }
            ItemDTO itemDTO = mapper.MealToDTO(result);
            return Ok(itemDTO);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _mealService.DeleteMeal(id);
            if(!result)
            {
                return NotFound("Nincs ilyen étel");
            }
            return Ok("Sikeres törlés");
        }

    }
}
