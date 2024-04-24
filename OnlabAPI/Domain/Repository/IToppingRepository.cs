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
        Task<List<Topping>> GetAllToppings();
        Task PostTopping(Topping topping, string[] names); 
    }
}
