using Domain.Interfaces;
using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlabAPI.DataTransferObjects;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private readonly ITableService _tableService;
        private readonly DTOMappers mapper;

        public TableController(ITableService service)
        {
            _tableService = service;
            mapper = new();
        }

        [HttpGet]
        public async Task<ActionResult> GetAllTables()
        {
            var tables = await _tableService.GetTables();
            if (tables == null) return NotFound("Nincsenek asztalok");
            List<TableDTO> dtos = [];
            foreach (var t in tables)
            {
                dtos.Add(mapper.TableToDTO(t));
            }
            return Ok(dtos);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTable(int id)
        {
            if (await _tableService.DeleteTable(id))
                return Ok("sikeres törlés");
            return NotFound("Nincs ilyen asztal");
        }

        [HttpPost]
        public async Task<ActionResult> PostTable(TableDTO table)
        {
            var newTable = new Table { Capacity = table.Capacity };
            await _tableService.AddTable(newTable);
            return CreatedAtAction(nameof(PostTable), table);
        }
    }
}
