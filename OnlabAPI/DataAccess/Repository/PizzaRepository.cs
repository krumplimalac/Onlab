using Domain;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class PizzaRepository : IPizzaRepository
    {
        private DatabaseContext _context;
        public PizzaRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Pizza>?> GetAllPizzas()
        {
            return await _context.Pizzas.Select(p => p).Include(p => p.Restrictions).Include(p => p.Toppings).Include(p => p.Image).ToListAsync();
            
        }

        public async Task<Pizza?> GetPizzaById(int id)
        {
            return await _context.Pizzas.Select(p => p).Where(p => p.Id == id).Include(p => p.Image).Include(p => p.Restrictions).Include(p => p.Toppings).FirstAsync();
        }

        public async Task CreatePizza(Pizza pizza)
        {
            await _context.Pizzas.AddAsync(pizza);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdatePizza(Pizza pizza)
        {
            _context.Update(pizza);
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

        public async Task<bool> DeletePizza(int id)
        {
            var pizzas = await _context.Pizzas.FindAsync(id);
            if (pizzas == null)
            {
                return false;
            }
            _context.Pizzas.Remove(pizzas);
            await _context.SaveChangesAsync();
            return true;
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
            return await _context.Toppings.Include(t => t.Restrictions).ToListAsync();
        }

        public async Task<Topping?> GetToppingById(int id)
        {
            return await _context.Toppings.Select(t => t).Where(t => t.Id == id).Include(t => t.Restrictions).FirstAsync();
        }

        public async Task CreateTopping(Topping topping)
        {
            await _context.Toppings.AddAsync(topping);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateTopping(Topping topping)
        {
            _context.Update(topping);
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

