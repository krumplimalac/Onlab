using Domain.Models;
using Domain.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IPizzaService
    {
        Task<PagedList<Pizza>?> GetAllPizzas(PizzaParameters pizzaParameters);
        Task<Pizza?> GetPizzaById(int id);
        Task AddPizza(Pizza pizza, string toppingIds);
        Task<bool> ChangePizza(Pizza pizza, int id, string toppingIds);
        Task<bool> DeletePizza(int id);
        Task<List<Topping>?> GetAllToppings();
        Task AddTopping(Topping topping, string restrictionNames);
        Task<bool> ChangeTopping(Topping topping, int id, string restrictionNames);
        Task<bool> DeleteTopping(int id);
    }
}
