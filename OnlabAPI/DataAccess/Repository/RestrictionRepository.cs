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
    public class RestrictionRepository : IRestrictionRepository
    {
        private DatabaseContext _dbContext;
        public RestrictionRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> DeleteRestriction(int id)
        {
            var restriction = await _dbContext.Restrictions.FindAsync(id);
            if (restriction == null)
            {
                return false;
            }
            _dbContext.Restrictions.Remove(restriction);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<Restriction>?> GetRestrictions()
        {
            return await _dbContext.Restrictions.ToListAsync();
        }


    }
}
