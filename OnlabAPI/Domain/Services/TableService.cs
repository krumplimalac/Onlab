using Domain.Interfaces;
using Domain.Models;
using Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class TableService : ITableService
    {
        private readonly ITableRepository _tableRepository;

        public TableService(ITableRepository tableRepository)
        {
            _tableRepository = tableRepository;
        }

        public async Task AddTable(Table table)
        {
            await _tableRepository.CreateTable(table);
        }

        public async Task<bool> DeleteTable(int id)
        {
            return await _tableRepository.DeleteTable(id);
        }

        public async Task<List<Table>?> GetReservedTablesByTimeFrame(DateTime startTime, DateTime endTime)
        {
            return await _tableRepository.GetReservedTablesByTimeFrame(startTime, endTime);
        }

        public async Task<List<Table>?> GetTables()
        {
            return await _tableRepository.GetTables();
        }
    }
}
