using Domain.Models;
using Domain.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IPizzaRepository
    {
        Task<List<Pizza>?> GetAllPizzas();
        Task<Pizza?> GetPizzaById(int id);
        Task CreatePizza(Pizza pizza);
        Task<bool> UpdatePizza(Pizza pizza);
        Task<bool> DeletePizza(int id);
        Task<List<Topping>?> GetAllToppings();
        Task<Topping?> GetToppingById(int id);
        Task CreateTopping(Topping topping);
        Task<bool> UpdateTopping(Topping topping);
        Task<bool> DeleteTopping(int id);
    }
}
