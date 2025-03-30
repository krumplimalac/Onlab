using Domain;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository
{
    public class MealRepository : IMealRepository
    {
        public DatabaseContext _context;

        public MealRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Meal>?> GetMeals()
        {
            return await _context.Meals.Select(m => m).Include(m => m.Restrictions).Include(m => m.Image).ToListAsync();
        }
        public async Task<List<Meal>?> GetMealsByParameters(MealParameters mealParameters)
        {
           return await _context.Meals.Select(m => m).Include(m => m.Restrictions).Include(m => m.Image).Where(m => m.Restrictions.Any(r => mealParameters.Restrictions.Contains(r.Id))).ToListAsync();
            
        }

        public async Task<Meal?> GetMealById(int id)
        {
            return await _context.Meals.Select(m => m).Include(m => m.Restrictions).Include(m => m.Image).Where(m => m.Id == id).FirstAsync();
            
        }

        public async Task CreateMeal(Meal meal)
        {
            await _context.Meals.AddAsync(meal);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateMeal(Meal meal)
        {
            _context.Update(meal);
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

        public async Task<bool> DeleteMeal(int id)
        {
            var meal = await _context.Meals.FindAsync(id);
            if (meal == null)
            {
                return false;
            }
            _context.Meals.Remove(meal);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteRestriction(int id)
        {
            var restriction = await _context.Restrictions.FindAsync(id);
            if (restriction == null)
            {
                return false;
            }
            _context.Restrictions.Remove(restriction);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Restriction>?> GetRestrictions()
        {
            return await _context.Restrictions.ToListAsync();
        }

        public async Task<List<Restriction>?> GetRestrictionsIncludingToppings()
        {
            return await _context.Restrictions.Include(r => r.Toppings).ToListAsync();
        }

    }
}
