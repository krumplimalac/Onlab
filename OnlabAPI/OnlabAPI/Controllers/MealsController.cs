using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using Microsoft.Extensions.Primitives;
using OnlabAPI.DataTransferObjects;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.Serialization.Json;
using System.Text.Json;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : ControllerBase
    {
        private readonly IMealRepository _mealRepository;
        public MealsController(IMealRepository repo)
        {
            _mealRepository = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetMeals([FromQuery] MealParameters mealParameters)
        {
            var meals = await _mealRepository.GetAllMeals(mealParameters);

            var metadata = new
            {
                meals.TotalCount,
                meals.PageSize,
                meals.CurrentPage,
                meals.TotalPages,
                meals.HasNext,
                meals.HasPrevious
            };

            Response.Headers.Append("X-Pagination", JsonSerializer.Serialize(metadata));

            if (meals == null)
            {
                return NotFound();
            }
            return Ok(meals);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Meal>> GetMeal(int id)
        {
            var meal = await _mealRepository.GetMealById(id);
            if (meal == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(meal);
            }
        }

        [HttpPost]
        public async Task<ActionResult<MealDTO>> PostMeal(MealDTO meal)
        {
            var newmeal = new Meal
            {
                Name = meal.Name,
                Description = meal.Description,
                Price = meal.Price,
                File = meal.FormFile
            };
            _mealRepository.PostMeal(newmeal);
            return CreatedAtAction(nameof(GetMeals), meal);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeal(MealDTO meal,int id)
        {
            var newmeal = new Meal
            {
                Id = meal.Id,
                Name = meal.Name,
                Description = meal.Description,
                Price = meal.Price,
                File = meal.FormFile
            };
           _mealRepository.PutMeal(newmeal,id);
            return Ok(newmeal);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> Patch(int id, [FromBody] JsonPatchDocument<Meal> patch)
        {
            var fromDb = await _mealRepository.GetMealById(id);

            var original = fromDb;
            patch.ApplyTo(fromDb);

            _mealRepository.Update(fromDb); 
            var model = new
            {
                original,
                patched = fromDb
            }; 
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
           var tmp = await _mealRepository.Delete(id);
            if(tmp == 0)
            {
                return NotFound();
            }
            return NoContent();
        }

    }
}
