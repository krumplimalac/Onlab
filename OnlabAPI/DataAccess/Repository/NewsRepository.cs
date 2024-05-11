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

        public News? ChangeImage(News news)
        {
            using (var memoryStream = new MemoryStream())
            {
                if (news.File == null)
                {
                    return null;
                }
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

        public async Task<bool> DeleteNews(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return false;
            }
            _context.News.Remove(news);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<PagedList<News>?> GetAllNews(Parameter parameters)
        {
            var news = await _context.News.Include(n => n.Image).OrderByDescending(news => news.Id).ToListAsync();
            if(news != null)
            {
                return PagedList<News>.ToPagedList(news,
                    parameters.PageNumber,
                    parameters.PageSize);
            }
            return null;
        }

        public async Task<News?> GetNewsById(int id)
        {
            var news = await _context.News.Select(n => new News
            {
                Title= n.Title,
                Date = n.Date,
                Description = n.Description,
                Id = n.Id,
                Image = n.Image,
            }).Where(n => n.Id == id).ToListAsync();
            if (news.Count != 0)
            {
                return news[0];
            }
            return null;
        }

        public async Task<bool> PostNews(News newNews)
        {
            var imagenews = ChangeImage(newNews);
            if (imagenews == null)
            {
                return false;
            }
            await _context.News.AddAsync(imagenews);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> PutNews(News news, int id)
        {
            var originalnews = _context.News.Include(n => n.Image).Single(n => n.Id == id);
            if (originalnews == null)
            {
                return false;
            }
            originalnews.Title = news.Title;
            originalnews.Description = news.Description;
            originalnews.Date = news.Date;
            if (news.File != null)
            {
                var imagenews = ChangeImage(news);
                if (imagenews == null) return false;
                originalnews.Image = imagenews.Image;
            }
            _context.Update(originalnews);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }

            return true;
        }
    }
}
