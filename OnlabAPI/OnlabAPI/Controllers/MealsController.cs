using Domain.Parameters;
using Domain.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using Microsoft.Extensions.Primitives;
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

            if ( meals == null)
            {
                return NotFound();
            }
            return Ok(meals);
        }
    }
}
