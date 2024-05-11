using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IToppingRepository
    {
        Task<List<Topping>?> GetAllToppings();
        Task<bool> PostTopping(Topping topping, string[]? toppingNames);
        Task<bool> PutTopping(Topping topping,int id,string[]? restrictionNames);
        Task<bool> DeleteTopping(int id);
    }
}
