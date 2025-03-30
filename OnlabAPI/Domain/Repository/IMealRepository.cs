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
        Task<List<Meal>?> GetMealsByParameters(MealParameters mealParameters);
        Task<List<Meal>?> GetMeals();
        Task<Meal?> GetMealById(int id);
        Task CreateMeal(Meal meal);
        Task<bool> UpdateMeal(Meal meal);
        Task<bool> DeleteMeal(int id);
        Task<List<Restriction>?> GetRestrictions();
        Task<bool> DeleteRestriction(int id);
        Task<List<Restriction>?> GetRestrictionsIncludingToppings();
    }
}
