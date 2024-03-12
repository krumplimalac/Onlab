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
                    Restrictions = m.Restrictions.ToList()
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
                        Restrictions = m.Restrictions.Where(r => r.Id == mealParameters.Restrictions).ToList()
                    }).Where(m => m.Restrictions.Contains(restriction)).ToListAsync();
                    return PagedList<Meal>.ToPagedList(meals,
                    mealParameters.PageNumber,
                    mealParameters.PageSize);
                }
            }

            return null;
        }
    }
}
