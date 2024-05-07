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
        private readonly IRestrictionRepository _restrictionRepository;
        public RestrictionController(IRestrictionRepository repo)
        {
            _restrictionRepository = repo;
        }

        [HttpGet]
        public async Task<ActionResult> GetRestrictions() 
        {
            var restrictions = await _restrictionRepository.GetRestrictions();
            if (restrictions == null)
            {
                return NotFound();
            }
            return Ok(restrictions);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRestriction(int id)
        {
            var result = await _restrictionRepository.DeleteRestriction(id);
            if(!result) 
            {
                return NotFound(); 
            }
            return Ok();
        }
    }
}
