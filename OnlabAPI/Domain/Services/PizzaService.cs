using Domain.Interfaces;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class PizzaService : IPizzaService
    {
        private readonly IPizzaRepository _pizzaRepository;
        private readonly IMealRepository _mealRepository;

        public PizzaService(IPizzaRepository repository, IMealRepository mealRepository)
        {
            _pizzaRepository = repository;
            _mealRepository = mealRepository;
        }

        public async Task<Pizza> AddToppingsWithRestrictions(Pizza pizza, int[]? toppingIds)
        {
            var toppings = await GetAllToppings();
            pizza.Toppings = [];
            if (toppings != null && toppingIds != null)
            {
                foreach (var topping in toppings)
                {
                    foreach (var id in toppingIds)
                    {
                        if (topping.Id == id)
                        {
                            pizza.Toppings.Add(topping);
                        }
                    }
                }
            }
            pizza.Restrictions = [];
            var restrictions = await _mealRepository.GetRestrictions();
            if (restrictions == null) return pizza;
            bool put = true;
            foreach (var restriction in restrictions)
            {
                foreach (var topping in pizza.Toppings)
                {
                    if (!topping.Restrictions.Contains(restriction))
                    {
                        put = false;
                    }
                }
                if (put)
                {
                    pizza.Restrictions.Add(restriction);
                }
                else
                {
                    put = true;
                }
            }
            return pizza;
        }

        public async Task<Topping> AddRestrictions(Topping topping, string[]? restrictionNames)
        {
            var restrictions = await _mealRepository.GetRestrictionsIncludingToppings();
            if (restrictions == null) return topping;
            topping.Restrictions = [];
            if (restrictions.Count != 0 && restrictionNames != null)
            {
                foreach (var restriction in restrictions)
                {
                    foreach (var name in restrictionNames)
                    {
                        if (restriction.Name == name)
                        {
                            topping.Restrictions.Add(restriction);
                        }
                    }
                }
            }
            return topping;
        }

        public async Task<Pizza> ChangeImage(Pizza pizza)
        {
            using var memoryStream = new MemoryStream();
            if (pizza.File == null) return pizza;
            await pizza.File.CopyToAsync(memoryStream);
            if (memoryStream.Length < 2097152)
            {
                var newimage = new Image
                {
                    Bytes = memoryStream.ToArray(),
                    Description = pizza.File.FileName
                };
                pizza.Image = newimage;
            }
            return pizza;
        }

        public async Task<PagedList<Pizza>?> GetAllPizzas(PizzaParameters pizzaParameters)
        {
            var pizzas = await _pizzaRepository.GetAllPizzas();
            if (pizzas == null) return null;
            if (pizzaParameters.Restrictions != null)
            {
                pizzas = pizzas.Where(p => p.Restrictions.Any(r => pizzaParameters.Restrictions.Contains(r.Id))).ToList();
            }
            if (pizzaParameters.Toppings != null)
            {
                pizzas = pizzas.Where(p => p.Toppings.Any(t => pizzaParameters.Toppings.Contains(t.Id))).ToList();
            }
            return PagedList<Pizza>
                .ToPagedList(
                    pizzas,
                    pizzaParameters.PageNumber,
                    pizzaParameters.PageSize
                );
            
        }

        public async Task<Pizza?> GetPizzaById(int id)
        {
            return await _pizzaRepository.GetPizzaById(id);
        }

        public async Task AddPizza(Pizza pizza, string toppingIds)
        {
            pizza = await AddToppingsWithRestrictions(pizza, JsonConvert.DeserializeObject<int[]>(toppingIds));
            pizza = await ChangeImage(pizza);
            await _pizzaRepository.CreatePizza(pizza);
        }

        public async Task<bool> ChangePizza(Pizza pizza, int id, string toppingIds)
        {
            var originalpizza = await _pizzaRepository.GetPizzaById(id);
            if (originalpizza == null) return false;
            originalpizza = pizza;
            originalpizza = await ChangeImage(pizza);
            originalpizza.Restrictions.Clear();
            originalpizza.Toppings.Clear();
            originalpizza = await AddToppingsWithRestrictions(originalpizza, JsonConvert.DeserializeObject<int[]>(toppingIds));
            return await _pizzaRepository.UpdatePizza(originalpizza);
        }

        public async Task<bool> DeletePizza(int id)
        {
            return await _pizzaRepository.DeletePizza(id);
        }

        public Task<List<Topping>?> GetAllToppings()
        {
            throw new NotImplementedException();
        }

        public async Task AddTopping(Topping topping, string restrictionNames)
        {
            topping = await AddRestrictions(topping, JsonConvert.DeserializeObject<string[]>(restrictionNames));
            await _pizzaRepository.CreateTopping(topping);
        }

        public async Task<bool> ChangeTopping(Topping topping, int id, string restrictionNames)
        {
            var originaltopping = await _pizzaRepository.GetToppingById(id);
            if (originaltopping == null)
            {
                return false;
            }
            originaltopping.Name = topping.Name;
            originaltopping.Id = id;
            originaltopping.Restrictions.Clear();
            originaltopping = await AddRestrictions(originaltopping, JsonConvert.DeserializeObject<string[]>(restrictionNames));
            return await _pizzaRepository.UpdateTopping(originaltopping);
        }

        public async Task<bool> DeleteTopping(int id)
        {
            return await _pizzaRepository.DeletePizza(id);
        }
    }
}
