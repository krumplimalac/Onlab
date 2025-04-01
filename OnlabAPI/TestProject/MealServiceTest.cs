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

            mockMealRepository.Setup(x => x.GetMeals()).ReturnsAsync(meals);

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

        [Fact]
        public async Task GetMealById_ShouldReturnMeal_WhenIdIsNotNull()
        {
            var id = 0;
            var meal = new Meal();
            mockMealRepository.Setup(x => x.GetMealById(id)).ReturnsAsync(meal);

            var result = await mealService.GetMealById(id);

            Assert.Equal(meal, result);
        }

        [Fact]
        public async Task GetMealById_ShouldReturnNull_WhenMealNotExists()
        {
            var id = 0;
            mockMealRepository.Setup(x => x.GetMealById(It.IsAny<int>())).ReturnsAsync(() => null);

            var result = await mealService.GetMealById(id);

            Assert.Null(result);
        }

        [Fact]
        public async Task AddRestriction_ShouldReturnMealWithRestrictions_WhenRestrictionNamesNotNull()
        {
            var meal = new Meal
            {
                Name = "Szendvics"
            };
            string[] restrictionNames = ["Vegán", "Gluténmentes"];
            List<Restriction> restrictions = [];
            restrictions.Add(new Restriction
            {
                Name = "Vegán"
            });
            restrictions.Add(new Restriction
            {
                Name = "Gluténmentes"
            });

            mockMealRepository.Setup(x => x.GetRestrictions()).ReturnsAsync(restrictions);

            var result = await mealService.AddRestricitons(meal, restrictionNames);

            Assert.Equal(result.Restrictions, restrictions);

        }

        [Fact]
        public async Task AddRestriction_ShouldReturnMealWithoutRestriction_WhenRestrictionNamesAreNull()
        {
            var meal = new Meal
            {
                Name = "Szendvics"
            };
            string[]? restrictionNames = null;
            List<Restriction> restrictions = [];
            restrictions.Add(new Restriction
            {
                Name = "Vegán"
            });
            restrictions.Add(new Restriction
            {
                Name = "Gluténmentes"
            });

            mockMealRepository.Setup(x => x.GetRestrictions()).ReturnsAsync(restrictions);

            var result = await mealService.AddRestricitons(meal, restrictionNames);

            Assert.Empty(result.Restrictions);

        }

        [Fact]
        public async Task AddRestriction_ShouldReturnMealWithoutRestrictions_WhenRestrictionNamesNotNull()
        {
            var meal = new Meal
            {
                Name = "Szendvics"
            };
            string[] restrictionNames = ["Vegán", "Gluténmentes"];
            List<Restriction> restrictions = [];

            mockMealRepository.Setup(x => x.GetRestrictions()).ReturnsAsync(restrictions);

            var result = await mealService.AddRestricitons(meal, restrictionNames);

            Assert.Equal(result, meal);

        }

        [Fact]
        public async Task ChangeImage()
        {

        }
    }
}
