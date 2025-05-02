using Domain.Models;
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
    public class PizzaServiceTest
    {
        private readonly PizzaService pizzaService;
        private readonly Mock<IMealRepository> mockMealRepository = new();
        private readonly Mock<IPizzaRepository> mockPizzaRepository = new();

        public PizzaServiceTest()
        {
            pizzaService = new PizzaService(mockPizzaRepository.Object, mockMealRepository.Object);
        }

        [Fact]
        public async Task AddToppingWithRestrictonsShouldReturnPizzaWithToppings_WhenToppingIdsAreNotNull()
        {
            List<Restriction> restrictions = [];
            restrictions.Add(new Restriction
            {
                Id = 1,
                Name = "Laktózmentes"
            });
            restrictions.Add(new Restriction
            {
                Id = 2,
                Name = "Gluténmentes"
            });

            List<Topping> toppings = [];
            toppings.Add(new Topping
            {
                Id = 1,
                Name = "Laktózmentes sajt",
                Restrictions = restrictions
            });

            var pizza = new Pizza
            {
                Name = "Laktózmentes sajtot pizza"
            };
            int[] toppingIds = [1];

            mockPizzaRepository.Setup(x => x.GetAllToppings()).ReturnsAsync(toppings);
            mockMealRepository.Setup(x => x.GetRestrictions()).ReturnsAsync(restrictions);

            var result = await pizzaService.AddToppingsWithRestrictions(pizza, toppingIds);

            Assert.Equal(toppings, result.Toppings);
            Assert.Equal(restrictions, result.Restrictions);

        }


        [Fact]
        public async Task AddToppingWithRestrictonsShouldReturnPizzaWithToppings_WhenToppingIdsAreNull()
        {
            List<Restriction> restrictions = [];
            restrictions.Add(new Restriction
            {
                Id = 1,
                Name = "Laktózmentes"
            });
            restrictions.Add(new Restriction
            {
                Id = 2,
                Name = "Gluténmentes"
            });

            List<Topping> toppings = [];
            toppings.Add(new Topping
            {
                Id = 1,
                Name = "Laktózmentes sajt",
                Restrictions = restrictions
            });

            var pizza = new Pizza
            {
                Name = "Laktózmentes sajtot pizza"
            };
            int[] toppingIds = [];

            mockPizzaRepository.Setup(x => x.GetAllToppings()).ReturnsAsync(toppings);
            mockMealRepository.Setup(x => x.GetRestrictions()).ReturnsAsync(restrictions);

            var result = await pizzaService.AddToppingsWithRestrictions(pizza, toppingIds);

            Assert.Empty(result.Toppings);
            Assert.Empty(result.Restrictions);

        }

        [Fact]
        public async Task AddRestrictions()
        {

        }
    }
}
