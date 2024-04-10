using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Parameters
{
     public class MealParameters: QueryStringParameters
     {
        public  int[]? Restrictions {  get; set; }
    }
}
