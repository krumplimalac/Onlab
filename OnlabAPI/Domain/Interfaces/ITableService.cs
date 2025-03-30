using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ITableService
    {
        Task<List<Table>?> GetTables();
        Task AddTable(Table table);
        Task<bool> DeleteTable(int id);
        Task<List<Table>?> GetReservedTablesByTimeFrame(DateTime startTime, DateTime endTime);
    }
}
