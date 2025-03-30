using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Domain.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject
{
    public class MealServiceTest
    {
        private readonly MealService mealService;
        private readonly Mock<IMealRepository> mockMealRepository = new Mock<IMealRepository>();

        public MealServiceTest()
        {
            mealService = new MealService(mockMealRepository.Object);
        }

        [Fact]
        public async Task GetAllMealsToPagedList_ShouldReturnPagedList_WhenParameterRestrictionsAreNotNull()
        {
            var parameters = new MealParameters();
            parameters.Restrictions = [1, 2];
            var meals = new List<Meal>();
            var meal = new Meal();
            meals.Add(meal);

            mockMealRepository.Setup(x => x.GetMealsByParameters(parameters)).ReturnsAsync(meals);

            var result = await mealService.GetAllMealsToPagedList(parameters);

            Assert.Equal(meals.First(), result.First());
        }

        [Fact]
        public async Task GetAllMealsToPagedList_ShouldReturnPagedList_WhenParameterRestrictionsAreNull()
        {
            var parameters = new MealParameters();
            var meals = new List<Meal>();
            var meal = new Meal();
            meals.Add(meal);

            mockMealRepository.Setup(x => x.GetMealsByParameters(parameters)).ReturnsAsync(meals);

            var result = await mealService.GetAllMealsToPagedList(parameters);

            Assert.Equal(meals.First(), result.First());
        }

        [Fact]
        public async Task GetAllMealsToPagedList_ShouldReturnNull_WhenParameterRestrictionsAreNull()
        {
            var parameters = new MealParameters();

            mockMealRepository.Setup(x => x.GetMealsByParameters(parameters)).ReturnsAsync(() => null);

            var result = await mealService.GetAllMealsToPagedList(parameters);

            Assert.Null(result);
        }

        [Fact]
        public async Task GetAllMealsToPagedList_ShouldReturnNull_WhenParameterRestrictionsAreNotNull()
        {
            var parameters = new MealParameters();
            parameters.Restrictions = [1, 2];

            mockMealRepository.Setup(x => x.GetMealsByParameters(parameters)).ReturnsAsync(() => null);

            var result = await mealService.GetAllMealsToPagedList(parameters);

            Assert.Null(result);
        }
    }
}
