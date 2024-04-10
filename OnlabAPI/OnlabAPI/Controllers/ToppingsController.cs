using Domain.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToppingsController : ControllerBase
    {
        private readonly IToppingRepository _repo;
        public ToppingsController(IToppingRepository toppingRepository)
        {
            _repo = toppingRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetToppings() 
        {
            return Ok( await _repo.GetAllToppings() );
        }
    }
}
