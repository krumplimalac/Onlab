using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
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
            List<ItemDTO> itemDTOs = [];
            if (meals == null)
            {
                return NotFound();
            }
            foreach (var meal in meals)
            {
                itemDTOs.Add(mapper.MealToDTO(meal));
            }
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
            return Ok(itemDTOs);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Meal>> GetMeal(int id)
        {
            ItemDTO itemDTO;
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
            var restrictionnames = JsonConvert.DeserializeObject<string[]>(meal.Restrictions);
            var newmeal = new Meal
            {
                Name = meal.Name,
                Description = meal.Description,
                Price = meal.Price,
                File = meal.FormFile,
            };
            var result = await _mealRepository.PostMeal(newmeal,restrictionnames);
            if (!result)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(PostMeal), meal);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> PutMeal(MealDTO meal,int id)
        {
            var restrictionnames = JsonConvert.DeserializeObject<string[]>(meal.Restrictions);
            var newmeal = new Meal
            {
                Name = meal.Name,
                Description = meal.Description,
                Price = meal.Price,
                File = meal.FormFile
            };
            var result = await _mealRepository.PutMeal(newmeal,id,restrictionnames);
            if (!result)
            {
                return BadRequest();
            }
            ItemDTO itemDTO = mapper.MealToDTO(newmeal);
            return Ok(itemDTO);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
           var deleted = await _mealRepository.DeleteMeal(id);
            if(!deleted)
            {
                return NotFound();
            }
            return Ok();
        }

    }
}
