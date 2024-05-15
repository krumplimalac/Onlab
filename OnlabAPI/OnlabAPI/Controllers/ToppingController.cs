using DataAccess.Repository;
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
            var toppings = await _repo.GetAllToppings();
            if (toppings == null)
            {
                return NotFound();
            }
            return Ok(toppings);
        }

        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> PutTopping(ToppingDTO topping, int id)
        {
            var names = JsonConvert.DeserializeObject<string[]>(topping.Restrictions);
            var newTopping = new Topping
            {
                Name = topping.Name,
            };
            var result = await _repo.PutTopping(newTopping, id, names);
            if (!result)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(PutTopping), newTopping);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTopping(int id)
        {
            var result = await _repo.DeleteTopping(id);
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
