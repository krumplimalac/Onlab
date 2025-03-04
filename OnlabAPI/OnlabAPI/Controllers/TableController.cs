using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Mvc;
using OnlabAPI.DataTransferObjects;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private readonly ITableRepository _repo;
        private readonly DTOMappers mapper;

        public TableController(ITableRepository repository)
        {
            _repo = repository;
             mapper = new();
        }

        [HttpGet]
        public async Task<ActionResult> GetAllTables()
        {
            var tables = await _repo.GetTables();
            if (tables == null) return NotFound();
            List<TableDTO> dtos = [];
            foreach (var t in tables)
            {
                dtos.Add(mapper.TableToDTO(t));
            }
            return Ok(dtos);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTable(int id)
        {
            if (await _repo.DeleteTable(id))
                return Ok();
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> PostTable(TableDTO table)
        {
            var newTable = new Table { Number = table.Number };
            if (await _repo.PostTable(newTable)) return Ok();
            return BadRequest();
        }
    }
}
