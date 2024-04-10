using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class ToppingRepository : IToppingRepository
    {
        private DatabaseContext _context;
        public ToppingRepository(DatabaseContext databaseContext)
        {
            _context = databaseContext;
        }
        public async Task<List<Topping>> GetAllToppings()
        {
            return await _context.Toppings.ToListAsync();   
        }

        public async Task PostTopping(Topping topping)
        {
            await _context.Toppings.AddAsync(topping);
            await _context.SaveChangesAsync();
        }
    }
}
