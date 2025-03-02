﻿using Domain;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository
{
    public class DrinkRepository : IDrinkRepository
    {
        public DatabaseContext _context;

        public DrinkRepository(DatabaseContext dbcontext)
        {
            _context = dbcontext;
        }

        public async Task<Drink?> ChangeImage(Drink drink)
        {
            using (var memoryStream = new MemoryStream())
            {
                if (drink.File == null)
                {
                    return null;
                }
                await drink.File.CopyToAsync(memoryStream);
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

        public async Task<bool> DeleteDrink(int id)
        {
            var drink = await _context.Drinks.FindAsync(id);
            if (drink == null)
            {
                return false;
            }
            _context.Drinks.Remove(drink);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<PagedList<Drink>?> GetAll(Parameter parameters)
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
            if(drinks == null) { return null; }
            return PagedList<Drink>.ToPagedList(drinks,
                    parameters.PageNumber,
                    parameters.PageSize);
        }

        public async Task<Drink?> GetDrinkById(int id)
        {
            var drinks = await _context.Drinks.Select(d => new Drink
            {
                Id = d.Id,
                Name = d.Name,
                Description = d.Description,
                Price = d.Price,
                Type = d.Type,
                Image = d.Image
            }).Where(d => d.Id == id).ToListAsync();
            return drinks != null ? drinks[0] : null;
        }

        public async Task<bool> PostDrink(Drink newDrink)
        {
            var imagedrink = await ChangeImage(newDrink);
            if(imagedrink == null)
            {
                return false;
            }
            newDrink = imagedrink;
            await _context.Drinks.AddAsync(newDrink);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> PutDrink(Drink drink, int id)
        {
            var originaldrink = _context.Drinks.Include(p => p.Image).Single(d => d.Id == id);
            if ( originaldrink == null )
            {
                return false;
            }
            originaldrink.Name = drink.Name;
            originaldrink.Price = drink.Price;
            originaldrink.Description = drink.Description;
            originaldrink.Type = drink.Type;
            if (drink.File != null)
            {
                var imagedrink = await ChangeImage(drink);
                if (imagedrink == null) return false;
                originaldrink.Image = imagedrink.Image;
            }
            _context.Update(originaldrink);
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
