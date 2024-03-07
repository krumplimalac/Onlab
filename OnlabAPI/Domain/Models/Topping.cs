using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Topping
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Restriction> Restrictions { get; set; }
        public List<Pizza> Pizzas { get; set; }
    }
}
