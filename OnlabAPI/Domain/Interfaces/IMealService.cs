using Domain.Models;
using Domain.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IMealService
    {
        Task<PagedList<Meal>?> GetAllMealsToPagedList(MealParameters parameters);
        Task<Meal?> GetMealById(int id);
        Task<Meal?> AddMeal(Meal meal,string restrictionNames);
        Task<Meal?> ChangeMeal(Meal meal, int id, string restrictionNames);
        Task<bool> DeleteMeal(int id);
        Task<List<Restriction>?> GetRestrictions();
        Task<bool> DeleteRestriction(int id);
    }
}
