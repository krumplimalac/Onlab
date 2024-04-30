using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlabAPI.DataTransferObjects;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly IPizzaRepository _repository;
        public PizzaController(IPizzaRepository repo)
        {
            _repository = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll([FromQuery] PizzaParameters parameters)
        {
            var pizzas = await _repository.GetAllPizzas(parameters);
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

            if (pizzas == null)
            {
                return NotFound();
            }
            
            return Ok(pizzas);
        }


    }
}
