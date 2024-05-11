using DataAccess.Repository;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
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
        private readonly INewsRepository _newsRepository;
        private DTOMappers mapper = new();
        public NewsController(INewsRepository repo)
        {
            _newsRepository = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetNews([FromQuery] Parameter parameters)
        {
            var news = await _newsRepository.GetAllNews(parameters);
            if (news == null)
            {
                return NotFound();
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
            var news = await _newsRepository.GetNewsById(id);
            if (news == null)
            {
                return NotFound();
            }
            return Ok(mapper.NewsToDTO(news));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<NewsFormDTO>> PostNews(NewsFormDTO news)
        {
            var newNews = new News
            { 
                Title = news.Title,
                Date = news.Date,
                Description = news.Description,
                File = news.File
            };
            var result = await _newsRepository.PostNews(newNews);
            if (!result)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetNews), newNews); ;
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNews(int id)
        {
            var result = await _newsRepository.DeleteNews(id);
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
