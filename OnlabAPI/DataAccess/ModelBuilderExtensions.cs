using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Meal>().HasData(
                new Meal { Name = "Bundás Kenyér", Description = "Bundás Kenyér bundából és kenyérből van", Price = 2000, Id = 1 },
                new Meal { Name = "Omlett", Description = "Omlett 3 tojásból készül és nagyon fincsa", Price = 1800, Id = 2 },
                new Meal { Name = "Tükörtojás", Description = "Tükörtojás 3 tojásból készül és nagyon fincsa", Price = 1800, Id = 3 },
                new Meal { Name = "Sült Oldalas", Description = "Ez az étel, jó, de nem mindenki szereti", Price = 2800, Id = 4 },
                new Meal { Name = "Szendvics", Description = "Sima szendvics... semmi extra, kenyér, vaj, cuccok", Price = 1200, Id = 5 },
                new Meal { Name = "Sültkrumpli", Description = "Legjobb házi krumpliból, friss olajban sülve", Price = 1000, Id = 6 },
                new Meal { Name = "Humusz tál", Description = "Frissen készült humusz, zöldségekkel", Price = 1200, Id = 7},
                new Meal { Name = "Bolognai Spagetti", Description = "Olasz módra készült, legfinomabb tésztaétel", Price = 2900, Id = 8},
                new Meal { Name = "Saláta", Description = "Frissen vágott zöldségekből, uborka, paaradicsom, saláta, és egy kis szeretet", Price = 1000, Id = 9}
                );

            modelBuilder.Entity<Restriction>().HasData(
                new Restriction { Name = "Gluténmentes" , Id = 1},
                new Restriction { Name = "Vegetáriánus", Id = 2},
                new Restriction { Name = "Laktózmentes", Id = 3},
                new Restriction { Name = "Vegán", Id = 4}
                );

            modelBuilder.Entity<MealRestriction>().HasData(
                new MealRestriction { MealId = 1, RestrictionId = 2 , Id = 1},
                new MealRestriction { MealId = 1, RestrictionId = 3 , Id = 2},
                new MealRestriction { MealId = 2, RestrictionId = 2 , Id = 3 },
                new MealRestriction { MealId = 3, RestrictionId = 1, Id = 4 },
                new MealRestriction { MealId = 3, RestrictionId = 2, Id = 5 },
                new MealRestriction { MealId = 4, RestrictionId = 1, Id = 6 },
                new MealRestriction { MealId = 4, RestrictionId = 3, Id = 7 },
                new MealRestriction { MealId = 5, RestrictionId = 2, Id = 8 },
                new MealRestriction { MealId = 6, RestrictionId = 1, Id = 9 },
                new MealRestriction { MealId = 6, RestrictionId = 2, Id = 10 },
                new MealRestriction { MealId = 6, RestrictionId = 3, Id = 11 },
                new MealRestriction { MealId = 6, RestrictionId = 4, Id = 12 },
                new MealRestriction { MealId = 7, RestrictionId = 1, Id = 13 },
                new MealRestriction { MealId = 7, RestrictionId = 2, Id = 14 },
                new MealRestriction { MealId = 7, RestrictionId = 3, Id = 15 },
                new MealRestriction { MealId = 7, RestrictionId = 4, Id = 16 },
                new MealRestriction { MealId = 9, RestrictionId = 1, Id = 17 },
                new MealRestriction { MealId = 9, RestrictionId = 2, Id = 18 },
                new MealRestriction { MealId = 9, RestrictionId = 3, Id = 19 },
                new MealRestriction { MealId = 9, RestrictionId = 4, Id = 20 }
                );

            modelBuilder.Entity<Drink>().HasData(
                new Drink { Id = 1, Name = "Espresso", Price = 700, Description = "Legfinomabb kávéból, igazi olaszos preszzó.", Type = "coffee" },
                new Drink { Id = 2, Name = "Gin Tonic", Price = 1300, Description = "Minőségi Ginből, minőségű Tonicból", Type = "alchoholic"}                
                );
        }
    }
}

