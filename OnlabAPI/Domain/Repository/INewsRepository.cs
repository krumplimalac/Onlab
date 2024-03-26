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
        Task<PagedList<News>> GetAllNews(Parameter parameters);
        Task PostNews(News newNews);
    }
}
