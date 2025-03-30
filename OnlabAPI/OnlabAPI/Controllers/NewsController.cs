using DataAccess.Repository;
using Domain.Interfaces;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlabAPI.DataTransferObjects;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;
        private DTOMappers mapper = new();
        public NewsController(INewsService service)
        {
            _newsService = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetNews([FromQuery] Parameter parameters)
        {
            if (parameters == null) return BadRequest("Roszz paraméterek");

            var news = await _newsService.GetAllNewsToPagedList(parameters);
            if (news == null)
            {
                return NotFound("Nincsenek hírek");
            }
            List<NewsDTO> newsDTOs = [];
            foreach (var item in news)
            {
                newsDTOs.Add(mapper.NewsToDTO(item));
            }
            var metadata = new
            {
                news.TotalCount,
                news.PageSize,
                news.CurrentPage,
                news.TotalPages,
                news.HasNext,
                news.HasPrevious
            };
            Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(metadata));
            return Ok(newsDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetNewsById(int id)
        {
            var news = await _newsService.GetNewsById(id);
            if (news == null)
            {
                return NotFound("Nincs ilyen hír");
            }
            return Ok(mapper.NewsToDTO(news));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<NewsFormDTO>> PostNews(NewsFormDTO news)
        {
            await _newsService.AddNews(mapper.DTOtoNews(news));
            return CreatedAtAction(nameof(PostNews), news);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> PutNews(NewsFormDTO news, int id)
        {
            var result = await _newsService.ChangeNews(mapper.DTOtoNews(news), id);
            if (result == null)
            {
                return NotFound("Nincs ilyen hír");
            }
            NewsDTO DTO = mapper.NewsToDTO(result);
            return Ok(DTO);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNews(int id)
        {
            var result = await _newsService.DeleteNews(id);
            if (!result)
            {
                return NotFound("Nincs ilyen hír");
            }
            return Ok("sikeres törlés");
        }
    }
}
