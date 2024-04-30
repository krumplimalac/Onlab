using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OnlabAPI.DataTransferObjects;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToppingController : ControllerBase
    {
        private readonly IToppingRepository _repo;
        public ToppingController(IToppingRepository toppingRepository)
        {
            _repo = toppingRepository;
        }

        [HttpGet]
        public async Task<ActionResult> GetToppings() 
        {
            return Ok( await _repo.GetAllToppings() );
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ToppingDTO>> PostTopping([FromForm]ToppingDTO topping)
        {
            var names = JsonConvert.DeserializeObject<string[]>(topping.Restrictions);
            var newtopping = new Topping
            {
                Name = topping.Name,
            };
            await _repo.PostTopping(newtopping,names);
            return Ok();
        }
    }
}
