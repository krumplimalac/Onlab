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
        public Pizza? ChangeImage(Pizza pizza)
        {
            using var memoryStream = new MemoryStream();
            if (pizza.File == null)
            {
                return null;
            }
            pizza.File.CopyToAsync(memoryStream);
            if (memoryStream.Length < 2097152)
            {
                var newimage = new Image
                {
                    Bytes = memoryStream.ToArray(),
                    Description = pizza.File.FileName
                };
                pizza.Image = newimage;
                return pizza;
            }
            else
            {
                return null;
            }
        }

        public async Task<Pizza> AddToppingsWithRestrictions(Pizza pizza, int[]? toppingIds)
        {
            var toppings = await _context.Toppings.Include(t => t.Restrictions).ToListAsync();
            pizza.Toppings = [];
            if (toppings != null && toppingIds != null)
            {
                foreach (var topping in toppings)
                {
                    foreach (var id in toppingIds)
                    {
                        if (topping.Id == id)
                        {
                            pizza.Toppings.Add(topping);
                        }
                    }
                }
            }
            pizza.Restrictions = [];
            var restrictions = await _context.Restrictions.ToListAsync();
            bool put = true;
            foreach (var restriction in restrictions)
            {
                foreach (var topping in pizza.Toppings)
                {
                    if (!topping.Restrictions.Contains(restriction))
                    {
                        put = false;
                    }
                }
                if (put)
                {
                    pizza.Restrictions.Add(restriction);
                }
                else
                {
                    put = true;
                }
            }
            return pizza;
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

        public async Task<PagedList<Pizza>?> GetAllPizzas(PizzaParameters pizzaParameters)
        {
            if (pizzaParameters.Restrictions == null && pizzaParameters.Toppings == null)
            {
                return PagedList<Pizza>
                    .ToPagedList(
                    await _context.Pizzas
                    .Include(p => p.Restrictions)
                    .Include(p => p.Toppings)
                    .Include(p => p.Image)
                    .ToListAsync(),
                        pizzaParameters.PageNumber,
                        pizzaParameters.PageSize);
            }
            var pizzas = await _context.Pizzas.Include(p => p.Restrictions).Include(p => p.Toppings).Include(p => p.Image).ToListAsync();
            if (pizzaParameters.Restrictions != null)
            {
                pizzas = pizzas.Where(p => p.Restrictions.Any(r => pizzaParameters.Restrictions.Contains(r.Id))).ToList();
            }
            if(pizzaParameters.Toppings != null)
            {
                pizzas = pizzas.Where(p => p.Toppings.Any(t => pizzaParameters.Toppings.Contains(t.Id))).ToList();
            }
            
            if (pizzas.Count != 0) { 
                return PagedList<Pizza>.ToPagedList(pizzas,
                            pizzaParameters.PageNumber,
                            pizzaParameters.PageSize);
            }
            return null;
        }

        public async Task<Pizza?> GetPizzaById(int id)
        {
            var pizzas = await _context.Pizzas.Select(p => new Pizza
            {
                Name = p.Name,
                Id = p.Id,
                Description = p.Description,
                Price = p.Price,
                Image = p.Image,
                Restrictions = p.Restrictions.ToList(),
                Toppings = p.Toppings.ToList(),
            }).Where(p => p.Id == id).ToListAsync();
            if (pizzas.Any())
            {
                return pizzas[0];
            }
            return null;
        }

        public async Task<bool> PostPizza(Pizza pizza, int[]? toppingIds)
        {
            pizza = await AddToppingsWithRestrictions(pizza, toppingIds);
            var imagepizza = ChangeImage(pizza);
            if (imagepizza == null)
            {
                return false;
            }
            pizza = imagepizza;
            await _context.Pizzas.AddAsync(pizza);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> PutPizza(Pizza pizza, int id, int[]? ids)
        {
            var originalpizza = _context.Pizzas.Include(p => p.Image).Include(p => p.Restrictions).Include(p => p.Toppings).Single(p => p.Id == id);
            originalpizza.Name = pizza.Name;
            originalpizza.Price = pizza.Price;
            originalpizza.Description = pizza.Description;
            originalpizza.Restrictions.Clear();
            originalpizza.Toppings.Clear();
            originalpizza = await AddToppingsWithRestrictions(originalpizza, ids);
            if (pizza.File != null)
            {
                var imagepizza = ChangeImage(pizza);
                if (imagepizza == null) return false;
                originalpizza.Image = imagepizza.Image;
            }
            _context.Update(originalpizza);
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
