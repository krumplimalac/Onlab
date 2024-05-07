using Domain.Models;

namespace OnlabAPI.DataTransferObjects
{
    public class DTOMappers
    {
        public ItemDTO MealToDTO(Meal meal)
        {
            ItemDTO itemDTO = new ItemDTO();
            itemDTO.Name = meal.Name;
            itemDTO.Description = meal.Description;
            itemDTO.Id = meal.Id;
            itemDTO.Image = Convert.ToBase64String(meal.Image.Bytes);
            itemDTO.Price = meal.Price;
            itemDTO.Type = "";
            if(meal.Restrictions != null)
            {
                foreach (Restriction restriction in meal.Restrictions)
                {
                    itemDTO.Type = itemDTO.Type + restriction.Name + " ";
                }
                itemDTO.Type.TrimEnd();
            }
            return itemDTO;
        }

        public ItemDTO PizzaToDTO(Pizza pizza)
        {
            ItemDTO itemDTO = new ItemDTO();
            itemDTO.Name = pizza.Name;
            itemDTO.Description = pizza.Description;
            itemDTO.Id = pizza.Id;
            itemDTO.Image = Convert.ToBase64String(pizza.Image.Bytes);
            itemDTO.Price = pizza.Price;
            itemDTO.Type = "";
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
    }
}
