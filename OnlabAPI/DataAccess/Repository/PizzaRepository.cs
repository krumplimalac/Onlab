using Domain;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public Pizza ChangeImage(Pizza pizza)
        {
            using (var memoryStream = new MemoryStream())
            {
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
        }
        public async Task<PagedList<Pizza>> GetAllPizzas(PizzaParameters pizzaParameters)
        {
            if (pizzaParameters.Restrictions == null)
            {
                return PagedList<Pizza>.ToPagedList(await _context.Pizzas.Select(p => new Pizza
                {
                    Name = p.Name,
                    Id = p.Id,
                    Description = p.Description,
                    Price = p.Price,
                    Image = p.Image
                }).ToListAsync(),
                        pizzaParameters.PageNumber,
                        pizzaParameters.PageSize);
            }
            var pizzas = await _context.Pizzas.Select(pizza => new Pizza
            {
                Name = pizza.Name,
                Id = pizza.Id,
                Description = pizza.Description,
                Price = pizza.Price,
                Image = pizza.Image
            }).Where(p => p.Restrictions.Any(r => pizzaParameters.Restrictions.Contains(r.Id))).ToListAsync();
            pizzas = pizzas.Where(p => p.Toppings.Any(t => pizzaParameters.Toppings.Contains(t.Id))).ToList();
            if (pizzas.Any()) { 
                return PagedList<Pizza>.ToPagedList(pizzas,
                            pizzaParameters.PageNumber,
                            pizzaParameters.PageSize);
            }
            return null;
        }

        public async Task<Pizza> GetPizzaById(int id)
        {
            var pizzas = await _context.Pizzas.Select(p => new Pizza
            {
                Name = p.Name,
                Id = p.Id,
                Description = p.Description,
                Price = p.Price,
                Image = p.Image
            }).Where(p => p.Id == id).ToListAsync();
            if (pizzas.Any())
            {
                return pizzas[0];
            }
            return null;
        }

        public async Task PostPizza(Pizza pizza, string[]? toppingNames)
        {
            var toppings = _context.Toppings.ToList();
            pizza.Toppings = new List<Topping>();
            if (toppings.Any() && toppingNames != null)
            {
                foreach (var topping in toppings)
                {
                    foreach (var name in toppingNames)
                    {
                        if (topping.Name == name)
                        {
                            pizza.Toppings.Add(topping);
                        }
                    }
                }
            }
            pizza.Restrictions = await _context.Restrictions.Where(r => pizza.Toppings.Any(p => p.Restrictions.Contains(r))).ToListAsync();
            pizza = ChangeImage(pizza);
            await _context.Pizzas.AddAsync(pizza);
            await _context.SaveChangesAsync();
        }
    }
}
