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

        public Meal? ChangeImage(Meal meal)
        {
            using var memoryStream = new MemoryStream();
            meal.File.CopyToAsync(memoryStream);
            if (memoryStream.Length < 2097152)
            {
                var newimage = new Image
                {
                    Bytes = memoryStream.ToArray(),
                    Description = meal.File.FileName
                };
                meal.Image = newimage;
                return meal;
            }
            else
            {
                return null;
            }
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

        public async Task<PagedList<Meal>?> GetAllMeals(MealParameters mealParameters)
        {
            if ( mealParameters.Restrictions == null )
            {
                return PagedList<Meal>.ToPagedList(await _context.Meals.Select(m => new Meal
                {
                    Name = m.Name,
                    Id = m.Id,
                    Description = m.Description,
                    Price = m.Price,
                    Restrictions = m.Restrictions.ToList(),
                    Image = m.Image
                }).ToListAsync(),
                        mealParameters.PageNumber,
                        mealParameters.PageSize);
            }
            
            var meals = await _context.Meals.Select(meal => new Meal
            {
                Name = meal.Name,
                Id = meal.Id,
                Description = meal.Description,
                Price = meal.Price,
                Restrictions = meal.Restrictions.ToList(),
                Image = meal.Image
            }).Where(m => m.Restrictions.Any(r => mealParameters.Restrictions.Contains(r.Id))).ToListAsync();
            if (meals.Count != 0)
            {
                return PagedList<Meal>.ToPagedList(meals,
                            mealParameters.PageNumber,
                            mealParameters.PageSize);
            }
            return null;
        }

        public async Task<Meal?> GetMealById(int id)
        {
            var meals = await _context.Meals.Select(m => new Meal
            {
                Name = m.Name,
                Id = m.Id,
                Description = m.Description,
                Price = m.Price,
                Restrictions = m.Restrictions.ToList(),
                Image = m.Image,
                File = m.File
            }).Where(m => m.Id == id).ToListAsync();
            if (meals.Count != 0)
            {
                return meals[0];
            }
            return null;
        }

        public async Task<bool> PostMeal(Meal meal, string[]? restrictionNames)
        {
            var restrictions = _context.Restrictions.ToList();
            meal.Restrictions = [];
            if (restrictions.Count != 0 && restrictionNames != null)
            {
                foreach (var restriction in restrictions)
                {
                    foreach (var name in restrictionNames)
                    {
                        if (restriction.Name == name)
                        {
                            meal.Restrictions.Add(restriction);
                        }
                    }
                }
            }
           
            var imagemeal = ChangeImage(meal);
            if (imagemeal == null)  
            {
                return false; 
            }
            await _context.Meals.AddAsync(imagemeal);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> PutMeal(Meal meal, int id)
        {
            var imagemeal = ChangeImage(meal);
            if (imagemeal == null)
            {
                return false;
            }
            meal = imagemeal;
            _context.Entry(meal).State = EntityState.Modified;
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
