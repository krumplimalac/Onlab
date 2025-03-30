using Domain.Interfaces;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class MealService : IMealService
    {
        private readonly IMealRepository _mealRepository;

        public MealService(IMealRepository repository)
        {
            _mealRepository = repository;
        }

        public async Task<Meal> AddRestricitons(Meal meal, string[]? restrictionNames)
        {
            List<Restriction>? restrictions = [];
            restrictions = await _mealRepository.GetRestrictions();
            if (restrictions == null) restrictions = [];
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
            return meal;
        }

        public async Task<Meal> ChangeImage(Meal meal)
        {
            using var memoryStream = new MemoryStream();
            if (meal.File == null) return meal;
            await meal.File.CopyToAsync(memoryStream);
            if (memoryStream.Length < 2097152)
            {
                var newimage = new Image
                {
                    Bytes = memoryStream.ToArray(),
                    Description = meal.File.FileName
                };
                meal.Image = newimage;
            }
            return meal;
        }

        public async Task<PagedList<Meal>?> GetAllMealsToPagedList(MealParameters parameters)
        {
            if(parameters.Restrictions == null)
            {
                var allMeals = await _mealRepository.GetMeals();
                if (allMeals == null) return null;
                return PagedList<Meal>.ToPagedList(allMeals,
                        parameters.PageNumber,
                        parameters.PageSize);
            } else
            {
                var restrictionedMeals = await _mealRepository.GetMealsByParameters(parameters);
                if (restrictionedMeals == null) return null;
                return PagedList<Meal>.ToPagedList(restrictionedMeals,
                        parameters.PageNumber,
                        parameters.PageSize);
            }
        }

        public async Task<Meal?> GetMealById(int id)
        {
            return await _mealRepository.GetMealById(id);
        }

        public async Task<Meal?> AddMeal(Meal meal,string restrictionNames)
        {
            var restrictionNamesParsed = JsonConvert.DeserializeObject<string[]>(restrictionNames);
            meal = await AddRestricitons(meal, restrictionNamesParsed);
            meal = await ChangeImage(meal);
            await _mealRepository.CreateMeal(meal);
            return meal;
        }

        public async Task<Meal?> ChangeMeal(Meal meal,int id, string restrictionNames)
        {
            meal.Id = id;
            var restrictionNamesParsed = JsonConvert.DeserializeObject<string[]>(restrictionNames);
            var originalmeal = await _mealRepository.GetMealById(id);
            if (originalmeal == null) return null;
            originalmeal.Name = meal.Name;
            originalmeal.Price = meal.Price;
            originalmeal.Description = meal.Description;
            originalmeal.Restrictions.Clear();
            originalmeal = await AddRestricitons(originalmeal, restrictionNamesParsed);
            originalmeal = await ChangeImage(meal);
            if ( await _mealRepository.UpdateMeal(originalmeal) )
            {
                return originalmeal;
            } else
            {
                return null;
            }
        }

        public async Task<bool> DeleteMeal(int id)
        {
            return await _mealRepository.DeleteMeal(id);
        }

        public async Task<List<Restriction>?> GetRestrictions()
        {
            return await _mealRepository.GetRestrictions();
        }

        public async Task<bool> DeleteRestriction(int id)
        {
            return await _mealRepository.DeleteRestriction(id);
        }
    }
}
