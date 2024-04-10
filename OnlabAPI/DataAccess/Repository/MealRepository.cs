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
    public class MealRepository : IMealRepository
    {
        public DatabaseContext _context;

        public MealRepository(DatabaseContext context)
        {
            _context = context;
        }

        public Meal ChangeImage(Meal meal)
        {
            using (var memoryStream = new MemoryStream())
            {
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
        }

        public async Task<int> Delete(int id)
        {
            var meal = await _context.Meals.FindAsync(id);
            if (meal == null)
            {
                return 0;
            }
            _context.Meals.Remove(meal);
            await _context.SaveChangesAsync();
            return 1;
        }

        public async Task<PagedList<Meal>> GetAllMeals(MealParameters mealParameters)
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
            var mealrestrictions = await _context.MealRestrictions.Where(mr => mealParameters.Restrictions.Contains(mr.RestrictionId)).ToListAsync();
            List<int> ids = new List<int>();
            if (mealrestrictions != null)
            {
                foreach (var mr in mealrestrictions)
                {
                    ids.Add(mr.MealId);
                }
                return PagedList<Meal>.ToPagedList(await _context.Meals.Select(m => new Meal
                {
                    Name = m.Name,
                    Id = m.Id,
                    Description = m.Description,
                    Price = m.Price,
                    Restrictions = m.Restrictions.ToList(),
                    Image = m.Image
                }).Where(m => ids.Contains(m.Id)).ToListAsync(),
                            mealParameters.PageNumber,
                            mealParameters.PageSize);
            }
            return null;
        }

        public async Task<Meal> GetMealById(int id)
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
            if (meals.Any())
            {
                return meals[0];
            }
            return null;
        }

        public async Task PostMeal(Meal meal, string[]? restrictionNames)
        {
            var restrictions = _context.Restrictions.ToList();
            meal.Restrictions = new List<Restriction>();
            if (restrictions.Any() && restrictionNames != null)
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
           
            meal = ChangeImage(meal);
            await _context.Meals.AddAsync(meal);
            await _context.SaveChangesAsync();

        }

        public async void PutMeal(Meal meal, int id)
        {
           
            meal = ChangeImage(meal);

            _context.Entry(meal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                
                    throw;
              
            }

            return;
        }

        public void Update(Meal meal)
        {
            _context.Update(meal);
            _context.SaveChanges();
        }
    }
}
