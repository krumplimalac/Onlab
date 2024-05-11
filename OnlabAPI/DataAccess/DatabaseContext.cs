using DataAccess.Repository;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class DatabaseContext: IdentityDbContext<IdentityUser>
    {
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Drink> Drinks { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Topping> Toppings { get; set; }
        public DbSet<Restriction> Restrictions { get; set; }
       // public DbSet<MealRestriction> MealRestrictions { get; set; }
        public DatabaseContext(DbContextOptions<DatabaseContext> options) :base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
           // modelBuilder.Entity<Meal>().HasMany(e => e.Restrictions).WithMany(e => e.Meals).UsingEntity<MealRestriction>();
            modelBuilder.Seed();

        }
    }
}
