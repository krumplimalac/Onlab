using Domain.Interfaces;
using Domain.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestrictionController : ControllerBase
    {
        private readonly IMealService _mealService;
        public RestrictionController(IMealService service)
        {
            _mealService = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetRestrictions() 
        {
            var restrictions = await _mealService.GetRestrictions();
            if (restrictions == null)
            {
                return NotFound("Nincsenek megkötések");
            }
            return Ok(restrictions);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRestriction(int id)
        {
            var result = await _mealService.DeleteRestriction(id);
            if(!result) 
            {
                return NotFound("Nincs ilyen megkötés"); 
            }
            return Ok("Sikeres törlés");
        }
    }
}
