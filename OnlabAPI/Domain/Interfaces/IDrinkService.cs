using Domain.Models;
using Domain.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IDrinkService
    {
        Task<PagedList<Drink>?> GetAllDrinksToPagedList(Parameter parameters);
        Task<Drink?> GetDrinkById(int id);
        Task<Drink?> AddDrink(Drink drink);
        Task<Drink?> ChangeDrink(Drink drink, int id);
        Task<bool> DeleteDrink(int id);
    }
}
