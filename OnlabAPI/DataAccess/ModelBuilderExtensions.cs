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

            modelBuilder.Entity<Restriction>().HasData(
                new Restriction { Name = "Gluténmentes" , Id = 1},
                new Restriction { Name = "Vegetáriánus", Id = 2},
                new Restriction { Name = "Laktózmentes", Id = 3},
                new Restriction { Name = "Vegán", Id = 4}
                );


            modelBuilder.Entity<Table>().HasData(
                new Table { Capacity = 4, Id = 1, Reservations = [] },
                new Table { Capacity = 6, Id = 2, Reservations = [] },
                new Table { Capacity = 2, Id = 3, Reservations = [] }
                );

        }
    }
}

