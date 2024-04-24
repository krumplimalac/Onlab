using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Parameters
{
    public class PizzaParameters: QueryStringParameters
    {
        public int[]? Toppings { get; set; }
        public int[]? Restrictions { get; set; }
    }
}
