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

        public async Task<List<News>?> GetAllNews()
        {
            return await _context.News.Include(n => n.Image).OrderByDescending(news => news.Id).ToListAsync();
        }

        public async Task<News?> GetNewsById(int id)
        {
            return await _context.News.Include(n => n.Image).Where(n => n.Id == id).Include(n => n.Image).FirstAsync();
        }

        public async Task CreateNews(News news)
        {
            await _context.News.AddAsync(news);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateNews(News news)
        {
            _context.Update(news);
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
