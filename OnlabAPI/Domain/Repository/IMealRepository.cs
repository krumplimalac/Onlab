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
        Task<PagedList<Meal>> GetAllMeals(MealParameters mealParameters);
        Task<Meal> GetMealById(int id);
        Task PostMeal(Meal meal, string[]? names);
        void PutMeal(Meal meal, int id);
        void Update(Meal meal);
        Task<int> Delete(int id);
    }
}
