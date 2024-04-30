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
        public async Task<List<Restriction>> GetRestrictions()
        {
            return await _dbContext.Restrictions.ToListAsync();
        }


    }
}
