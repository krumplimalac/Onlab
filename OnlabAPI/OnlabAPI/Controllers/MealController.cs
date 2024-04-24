using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using OnlabAPI.DataTransferObjects;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.Serialization.Json;
using System.Text.Json;
using System.Xml.Linq;

namespace OnlabAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {

        private readonly IMealRepository _mealRepository;
        private DTOMappers mapper = new DTOMappers();
        public MealController(IMealRepository repo)
        {
            _mealRepository = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetMeals([FromQuery] MealParameters mealParameters)
        {
            var meals = await _mealRepository.GetAllMeals(mealParameters);
            List<ItemDTO> itemDTOs = new List<ItemDTO>();
            var metadata = new
            {
                meals.TotalCount,
                meals.PageSize,
                meals.CurrentPage,
                meals.TotalPages,
                meals.HasNext,
                meals.HasPrevious
            };

            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(metadata));

            if (meals == null)
            {
                return NotFound();
            }
            foreach (var meal in meals)
            {
                itemDTOs.Add(mapper.MealToDTO(meal));
            }
            return Ok(itemDTOs);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Meal>> GetMeal(int id)
        {
            ItemDTO itemDTO = new ItemDTO();
            var meal = await _mealRepository.GetMealById(id);
            if (meal == null)
            {
                return NotFound();
            }
            else
            {
                itemDTO = mapper.MealToDTO(meal);
                return Ok(itemDTO);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<MealDTO>> PostMeal(MealDTO meal)
        {
            var names = JsonConvert.DeserializeObject<string[]>(meal.Restrictions);
            var newmeal = new Meal
            {
                Name = meal.Name,
                Description = meal.Description,
                Price = meal.Price,
                File = meal.FormFile,
            };
            await _mealRepository.PostMeal(newmeal,names);
            return CreatedAtAction(nameof(PostMeal), meal);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeal(MealDTO meal,int id)
        {
            var newmeal = new Meal
            {
                Id = id,
                Name = meal.Name,
                Description = meal.Description,
                Price = meal.Price,
                File = meal.FormFile
            };
           _mealRepository.PutMeal(newmeal,id);
            ItemDTO itemDTO = mapper.MealToDTO(newmeal);
            return Ok(itemDTO);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
           var tmp = await _mealRepository.Delete(id);
            if(tmp == 0)
            {
                return NotFound();
            }
            return Ok();
        }

    }
}
