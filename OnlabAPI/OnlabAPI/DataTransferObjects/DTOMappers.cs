using Domain.Models;

namespace OnlabAPI.DataTransferObjects
{
    public class DTOMappers
    {
        public ItemDTO MealToDTO(Meal meal)
        {
            ItemDTO itemDTO = new()
            {
                Name = meal.Name,
                Description = meal.Description,
                Id = meal.Id,
                Image = meal.Image != null ? Convert.ToBase64String(meal.Image.Bytes) : null,
                Price = meal.Price,
                Type = ""
            };
            if (meal.Restrictions != null)
            {
                foreach (Restriction restriction in meal.Restrictions)
                {
                    itemDTO.Type = itemDTO.Type + restriction.Name + " ";
                }
                itemDTO.Type.TrimEnd();
            }
            return itemDTO;
        }

        public Meal DTOtoMeal(MealDTO meal)
        {
            return new Meal
            {
                Name = meal.Name,
                Description = meal.Description,
                Price = meal.Price,
                File = meal.FormFile,
            };
        }

        public Drink DTOtoDrink(DrinkDTO drink)
        {
            return new Drink
            {
                Name = drink.Name,
                Description = drink.Description,
                Price = drink.Price,
                Type = drink.Type,
                File = drink.File
            };
        }

        public News DTOtoNews(NewsFormDTO news)
        {
            return new News
            {
                Title = news.Title,
                Description = news.Description,
                Date = news.Date,
                File = news.File
            };
        }

        public Pizza DTOtoPizza(PizzaDTO pizza)
        {
            return new Pizza
            {
                Name = pizza.Name,
                Description = pizza.Description,
                Price = pizza.Price,
                File = pizza.FormFile
            };
        }

        public ItemDTO PizzaToDTO(Pizza pizza)
        {
            ItemDTO itemDTO = new()
            {
                Name = pizza.Name,
                Description = pizza.Description,
                Id = pizza.Id,
                Image = pizza.Image != null ? Convert.ToBase64String(pizza.Image.Bytes) : null,
                Price = pizza.Price,
                Type = ""
            };
            if (pizza.Toppings != null)
            {
                foreach (var restriction in pizza.Restrictions)
                {
                    itemDTO.Type = itemDTO.Type + restriction.Name + " ";
                }
                foreach (var topping in pizza.Toppings)
                {
                    itemDTO.Type = itemDTO.Type + topping.Name + " ";
                }
                itemDTO.Type.TrimEnd();
            }
            return itemDTO;
        }

        public ItemDTO DrinkToDTO(Drink drink)
        {
            ItemDTO itemDTO = new()
            {
                Name = drink.Name,
                Description = drink.Description,
                Id = drink.Id,
                Image = drink.Image != null ? Convert.ToBase64String(drink.Image.Bytes) : null,
                Price = drink.Price,
                Type = drink.Type
            };
            return itemDTO;
        }

        public NewsDTO NewsToDTO(News news)
        {
            NewsDTO newsDTO = new()
            {
                Title = news.Title,
                Id = news.Id,
                Description = news.Description,
                Date = news.Date,
                Image = news.Image != null ? Convert.ToBase64String(news.Image.Bytes) : null
            };
            return newsDTO;
        }

        public ReservationDTO ReservationToDTO(Reservation reservation)
        {
            ReservationDTO reservationDTO = new()
            {
                EndTime = reservation.EndTime,
                StartTime = reservation.StartTime,
                NumberOfPeople = reservation.NumberOfPeople,
                Reserver = reservation.ReserverName,
                ReserverId = reservation.Reserver.Id,
                PhoneNumber = reservation.PhoneNumber,
                TableId = reservation.Table.Id
            };
            return reservationDTO;
        }

        public TableDTO TableToDTO(Table table)
        {
            return new TableDTO { Capacity = table.Capacity, Id = table.Id };
        }
    }
}
