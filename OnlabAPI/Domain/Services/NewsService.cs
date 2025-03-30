using Domain.Interfaces;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class NewsService : INewsService
    {
        private readonly INewsRepository _newsRepository;

        public NewsService(INewsRepository repository)
        {
            _newsRepository = repository;
        }

        public async Task<News> ChangeImage(News news)
        {
            using var memoryStream = new MemoryStream();
            if (news.File == null) return news;
            await news.File.CopyToAsync(memoryStream);
            if (memoryStream.Length < 2097152)
            {
                var newimage = new Image
                {
                    Bytes = memoryStream.ToArray(),
                    Description = news.File.FileName
                };
                news.Image = newimage;
            }
            return news;
        }

        public async Task<PagedList<News>?> GetAllNewsToPagedList(Parameter parameters)
        {
            var news = await _newsRepository.GetAllNews();
            if (news == null) { return null; }
            return PagedList<News>
                .ToPagedList(
                    news,
                    parameters.PageNumber,
                    parameters.PageSize
                );
        }

        public async Task<News?> GetNewsById(int id)
        {
            return await _newsRepository.GetNewsById(id);
        }

        public async Task<News?> AddNews(News news)
        {
            news = await ChangeImage(news);
            await _newsRepository.CreateNews(news);
            return news;
        }

        public async Task<News?> ChangeNews(News news, int id)
        {
            news.Id = id;
            var originalNews = await _newsRepository.GetNewsById(id);
            if (originalNews == null) return null;
            originalNews.Title = news.Title;
            originalNews.Date = news.Date;
            originalNews.Description = news.Description;
            originalNews = await ChangeImage(news);
            if (await _newsRepository.UpdateNews(originalNews))
            {
                return originalNews;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> DeleteNews(int id)
        {
            return await _newsRepository.DeleteNews(id);
        }
    }
}
