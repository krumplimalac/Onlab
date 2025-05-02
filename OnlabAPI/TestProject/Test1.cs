using Domain.Models;
using JSNLog.Infrastructure;
using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace TestProject
{
    public class Test1
    {
        
        [Fact]
        public async Task Test()
        {
            var application = new IntegrationTestFactory<Program>();
            var _client = application.CreateClient();
            // Arrange
            var meal = new Meal
            {
                Name = "Szendvics"
            };

            //Act
            var meals = await _client.GetAsync("api/Meal");
            var content = await meals.Content.ReadAsStringAsync();

            // Assert
            Assert.Equal(HttpStatusCode.OK, meals.StatusCode);
            Assert.Contains(meal.Name, content);
            
        }
    }
}
