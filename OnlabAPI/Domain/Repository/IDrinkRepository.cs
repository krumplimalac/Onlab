using Domain.Models;
using Domain.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IDrinkRepository
    {
        Task<PagedList<Drink>?> GetAll(Parameter parameter);
        Task<Drink?> GetDrinkById(int id);
        Task<bool> PostDrink(Drink drink);
        Task<bool> PutDrink(Drink drink, int id);
        Task<bool> DeleteDrink(int id);
    }
}
