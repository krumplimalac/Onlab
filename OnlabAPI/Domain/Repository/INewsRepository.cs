using Domain.Models;
using Domain.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface INewsRepository
    {
        Task<List<News>?> GetAllNews();
        Task<News?> GetNewsById(int id);
        Task CreateNews(News newNews);
        Task<bool> UpdateNews(News news);
        Task<bool> DeleteNews(int id);
    }
}
