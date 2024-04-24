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
            itemDTO.Image = meal.Image;
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
    }
}
