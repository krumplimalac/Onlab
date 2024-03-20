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

        public Meal ChangeImage(Meal meal, Meal newmeal)
        {
            using (var memoryStream = new MemoryStream())
            {
                meal.File.CopyToAsync(memoryStream);
                if (memoryStream.Length < 2097152)
                {
                    var newimage = new Image
                    {
                        Bytes = memoryStream.ToArray(),
                        Description = meal.File.FileName,
                        FileExtension = Path.GetExtension(meal.File.FileName),
                        Size = meal.File.Length
                    };
                    newmeal.Image = newimage;
                    return newmeal;
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

            var restrictions = await _context.Restrictions.Where(r => r.Id == mealParameters.Restrictions).ToListAsync();

            if (restrictions.Any() )
            {
                var restriction = restrictions[0];
                if (restriction != null)
                {
                    var meals = await _context.Meals.Select(m => new Meal
                    {
                        Name = m.Name,
                        Id = m.Id,
                        Description = m.Description,
                        Price = m.Price,
                        Restrictions = m.Restrictions.ToList(),
                        Image = m.Image
                    }).Where(m => m.Restrictions.Contains(restriction)).ToListAsync();
                    return PagedList<Meal>.ToPagedList(meals,
                    mealParameters.PageNumber,
                    mealParameters.PageSize);
                }
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
                Image = m.Image
            }).Where(m => m.Id == id).ToListAsync();
            if (meals.Any())
            {
                return meals[0];
            }
            return null;
        }

        public async void PostMeal(Meal meal)
        {

            var newmeal = new Meal
            {
                Name = meal.Name,
                Description = meal.Description,
                Price = meal.Price,
            };

            newmeal = ChangeImage(meal, newmeal);
          
            _context.Meals.Add(newmeal);
            _context.SaveChanges();

        }

        public void PutMeal(Meal meal, int id)
        {
           
            meal = ChangeImage(meal, meal);

            _context.Entry(meal).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
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
