using Domain.Models;
using Domain.Parameters;
using Microsoft.AspNetCore.JsonPatch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IMealRepository
    {
        Task<PagedList<Meal>?> GetAllMeals(MealParameters mealParameters);
        Task<Meal?> GetMealById(int id);
        Task<bool> PostMeal(Meal meal, string[]? restrictionNames);
        Task<bool> PutMeal(Meal meal, int id);
        Task<bool> DeleteMeal(int id);
    }
}
