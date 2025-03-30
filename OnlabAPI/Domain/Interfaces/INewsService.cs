using Domain.Models;
using Domain.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface INewsService
    {
        Task<PagedList<News>?> GetAllNewsToPagedList(Parameter parameters);
        Task<News?> GetNewsById(int id);
        Task<News?> AddNews(News news);
        Task<News?> ChangeNews(News news, int id);
        Task<bool> DeleteNews(int id);
    }
}
