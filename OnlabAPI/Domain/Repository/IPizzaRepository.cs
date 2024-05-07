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
        Task<PagedList<Pizza>?> GetAllPizzas(PizzaParameters pizzalParameters);
        Task<Pizza?> GetPizzaById(int id);
        Task<bool> PostPizza(Pizza pizza, int[]? toppingNames);
        Task<bool> PutPizza(Pizza pizza, int id);
        Task<bool> DeletePizza(int id);
    }
}
