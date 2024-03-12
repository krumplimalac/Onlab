using Domain.Models;
using Microsoft.EntityFrameworkCore;
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
                new MealRestriction { MealId = 2, RestrictionId = 2 , Id = 3 }
                );
        }
    }
}

