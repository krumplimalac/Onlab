using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface ITableRepository
    {
        Task<List<Table>> GetTables();
        Task<bool> PostTable(Table table);
        Task<bool> DeleteTable(int id);
    }
}
