using Domain;
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

        public async Task<List<Drink>?> GetAllDrinks()
        {
            return await _context.Drinks.Select(d => d).Include(d => d.Image).ToListAsync();
        }

        public async Task<Drink?> GetDrinkById(int id)
        {
            return await _context.Drinks.Select(d => d).Where(d => d.Id == id).Include(d => d.Image).FirstAsync();
        }

        public async Task CreateDrink(Drink drink)
        {
            await _context.Drinks.AddAsync(drink);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateDrink(Drink drink)
        {
            _context.Update(drink);
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
