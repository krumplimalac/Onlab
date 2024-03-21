using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Restriction
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Meal> Meals { get; set; }
        public List<Topping> Toppings { get; set; }
        public List<Pizza> Pizzas { get; set; }

    }
}
