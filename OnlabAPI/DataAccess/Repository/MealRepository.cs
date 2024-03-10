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
            var meals = await _context.Meals.ToListAsync();
            return PagedList<Meal>.ToPagedList(meals,
                mealParameters.PageNumber,
                mealParameters.PageSize);
        }
    }
}
