using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class MealRestriction
    {
        public int Id { get; set; }
        public int MealId { get; set; }
        public Meal Meal { get; set; }
        public int RestrictionId { get; set; }
        public Restriction Restriction { get; set; }
    }
}
