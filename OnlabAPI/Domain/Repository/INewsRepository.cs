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
        Task<PagedList<News>?> GetAllNews(Parameter parameters);
        Task<News?> GetNewsById(int id);
        Task<bool> PostNews(News newNews);
        Task<bool> PutNews(News news, int id);
        Task<bool> DeleteNews(int id);
    }
}
