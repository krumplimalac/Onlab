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

        public async Task<Topping> AddRestrictions(Topping topping, string[]? restrictionNames)
        {
            var restrictions = await _context.Restrictions.Include(r => r.Toppings).ToListAsync();
            topping.Restrictions = [];
            if (restrictions.Count != 0 && restrictionNames != null)
            {
                foreach (var restriction in restrictions)
                {
                    foreach (var name in restrictionNames)
                    {
                        if (restriction.Name == name)
                        {
                            topping.Restrictions.Add(restriction);
                        }
                    }
                }
            }
            return topping;
        }

        public async Task<bool> DeleteTopping(int id)
        {
            var topping = await _context.Toppings.FindAsync(id);
            if (topping == null)
            {
                return false;
            }
            _context.Toppings.Remove(topping);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Topping>?> GetAllToppings()
        {
            return await _context.Toppings.ToListAsync();   
        }

        public async Task<bool> PostTopping(Topping topping, string[]? restrictionNames)
        {
            topping = await AddRestrictions(topping, restrictionNames);
            await _context.Toppings.AddAsync(topping);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> PutTopping(Topping topping, int id, string[]? restrictionNames)
        {
            var originaltopping = _context.Toppings.Include(t => t.Restrictions).Single(t => t.Id == id);
            if (originaltopping == null) 
            {
                return false;
            }
            originaltopping.Name = topping.Name;
            originaltopping.Id = id;
            originaltopping.Restrictions.Clear();
            originaltopping = await AddRestrictions(topping, restrictionNames);
            _context.Update(originaltopping);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }

            return true;
        }
    }
}
