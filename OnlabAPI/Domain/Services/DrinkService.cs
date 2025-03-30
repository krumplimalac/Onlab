using Domain.Interfaces;
using Domain.Models;
using Domain.Parameters;
using Domain.Repository;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class DrinkService : IDrinkService
    {
        private readonly IDrinkRepository _drinkRepository;

        public DrinkService(IDrinkRepository drinkRepository)
        {
            _drinkRepository = drinkRepository;
        }

        public async Task<Drink> ChangeImage(Drink drink)
        {
            using var memoryStream = new MemoryStream();
            if (drink.File == null) return drink;
            await drink.File.CopyToAsync(memoryStream);
            if (memoryStream.Length < 2097152)
            {
                var newimage = new Image
                {
                    Bytes = memoryStream.ToArray(),
                    Description = drink.File.FileName
                };
                drink.Image = newimage;
            }
            return drink;
        }

        public async Task<PagedList<Drink>?> GetAllDrinksToPagedList(Parameter parameters)
        {
            var drinks = await _drinkRepository.GetAllDrinks();
            if (drinks == null) { return null; }
            return PagedList<Drink>
                .ToPagedList(
                    drinks,
                    parameters.PageNumber,
                    parameters.PageSize
                );
        }

        public async Task<Drink?> GetDrinkById(int id)
        {
            return await _drinkRepository.GetDrinkById(id);
        }

        public async Task<Drink?> AddDrink(Drink drink)
        {
            drink = await ChangeImage(drink);
            await _drinkRepository.CreateDrink(drink);
            return drink;
        }

        public async Task<Drink?> ChangeDrink(Drink drink, int id)
        {
            drink.Id = id;
            var originaldrink = await _drinkRepository.GetDrinkById(id);
            if (originaldrink == null) return null;
            originaldrink.Name = drink.Name;
            originaldrink.Price = drink.Price;
            originaldrink.Description = drink.Description;
            originaldrink.Type = drink.Type;
            originaldrink = await ChangeImage(drink);
            if (await _drinkRepository.UpdateDrink(originaldrink))
            {
                return originaldrink;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> DeleteDrink(int id)
        {
            return await _drinkRepository.DeleteDrink(id);
        }

    }
}
