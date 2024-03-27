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
        public NewsController(INewsRepository repo)
        {
            _newsRepository = repo;
        }

        [HttpGet]
        public async Task<IActionResult>  GetNews([FromQuery] Parameter parameters)
        {
            var news = await _newsRepository.GetAllNews(parameters);

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

            if (news == null)
            {
                return NotFound();
            }
            return Ok(news);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<NewsDTO>> PostNews(NewsDTO news)
        {
            var newNews = new News
            { 
                Title = news.Title,
                Date = news.Date,
                Description = news.Description,
                File = news.File
            };
            await _newsRepository.PostNews(newNews);
            return CreatedAtAction(nameof(GetNews), newNews); ;
        }
    }
}
