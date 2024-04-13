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
    public class DrinkRepository : IDrinkRepository
    {
        public DatabaseContext _context;

        public DrinkRepository(DatabaseContext dbcontext)
        {
            _context = dbcontext;
        }

        public Drink ChangeImage(Drink drink)
        {
            using (var memoryStream = new MemoryStream())
            {
                drink.File.CopyToAsync(memoryStream);
                if (memoryStream.Length < 2097152)
                {
                    var newimage = new Image
                    {
                        Bytes = memoryStream.ToArray(),
                        Description = drink.File.FileName
                    };
                    drink.Image = newimage;
                    return drink;
                }
                else
                {
                    return null;
                }
            }
        }

        public async Task<PagedList<Drink>> GetAll(Parameter parameters)
        {
            var drinks = await _context.Drinks.Select(d => new Drink
            {
                Id = d.Id,
                Name = d.Name,
                Description = d.Description,
                Price = d.Price,
                Type = d.Type,
                Image = d.Image
            }).ToListAsync();
            return PagedList<Drink>.ToPagedList(drinks,
                    parameters.PageNumber,
                    parameters.PageSize);
        }

        public async Task<Drink> GetDrinkById(int id)
        {
            var drinks = await _context.Drinks.Select(d => new Drink
            {
                Id = d.Id,
                Name = d.Name,
                Description = d.Description,
                Price = d.Price,
                Type = d.Type,
                Image = d.Image
            }).ToListAsync();
            return drinks != null ? drinks[0] : null;
        }

        public async Task PostDrink(Drink newDrink)
        {
            newDrink = ChangeImage(newDrink);
            await _context.Drinks.AddAsync(newDrink);
            await _context.SaveChangesAsync();
        }
    }
}
