﻿using Domain.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestrictionsController : ControllerBase
    {
        private readonly IRestrictionRepository _restrictionRepository;
        public RestrictionsController(IRestrictionRepository repo)
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
    }
}
