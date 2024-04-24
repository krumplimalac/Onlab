using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Http;
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

        [HttpPost]
        public async Task<ActionResult<ToppingDTO>> PostTopping(ToppingDTO topping)
        {
            var names = JsonConvert.DeserializeObject<string[]>(topping.Restrictions);
            var newtopping = new Topping
            {
                Name = topping.Name,
            };
            _repo.PostTopping(newtopping,names);
            return CreatedAtAction(nameof(PostTopping), newtopping);
        }
    }
}
