using Domain.Models;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class TableRepository : ITableRepository
    {
        private DatabaseContext _context;

        public TableRepository(DatabaseContext context)
        {
            _context = context;
        }
        public async Task<bool> DeleteTable(int id)
        {
            var table = await _context.Tables.FindAsync(id);
            if (table == null)
            {
                return false;
            }
            _context.Tables.Remove(table);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Table>?> GetReservedTablesByTimeFrame(DateTime startTime, DateTime endTime)
        {
            return await _context.Reservations.
                Select(r => r).
                Where(r => r.StartTime < endTime && r.EndTime > startTime).
                Include(r => r.Table).
                Select(r => r.Table).
                Distinct().
                ToListAsync();
        }

        public async Task<List<Table>?> GetTables()
        {
            return await _context.Tables.Select(t => t).Include(t => t.Reservations).ToListAsync();
        }

        public async Task CreateTable(Table table)
        {
            await _context.Tables.AddAsync(table);
            await _context.SaveChangesAsync();
        }
    }
}
