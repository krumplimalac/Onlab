using Domain;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class NewsRepository : INewsRepository
    {
        private DatabaseContext _context;
        public NewsRepository(DatabaseContext databaseContext)
        {
            _context = databaseContext;
        }

        public News ChangeImage(News news)
        {
            using (var memoryStream = new MemoryStream())
            {
                news.File.CopyToAsync(memoryStream);
                if (memoryStream.Length < 2097152)
                {
                    var newimage = new Image
                    {
                        Bytes = memoryStream.ToArray(),
                        Description = news.File.FileName
                    };
                    news.Image = newimage;
                    return news;
                }
                else
                {
                    return null;
                }
            }
        }

        public async Task<PagedList<News>> GetAllNews(Parameter parameters)
        {
            var news = await _context.News.Select(n => new News
            {
                Title = n.Title,
                Description = n.Description,
                Date = n.Date,
                Id = n.Id,
                Image = n.Image
            }).OrderByDescending(news => news.Id).ToListAsync();
            
            return PagedList<News>.ToPagedList(news,
                    parameters.PageNumber,
                    parameters.PageSize);
        }

        public async Task PostNews(News newNews)
        {
            newNews = ChangeImage(newNews);
            await _context.News.AddAsync(newNews);
            await _context.SaveChangesAsync();
        }
    }
}
