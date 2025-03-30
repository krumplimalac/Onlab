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
        Task<List<Drink>?> GetAllDrinks();
        Task<Drink?> GetDrinkById(int id);
        Task CreateDrink(Drink drink);
        Task<bool> UpdateDrink(Drink drink);
        Task<bool> DeleteDrink(int id);
    }
}
