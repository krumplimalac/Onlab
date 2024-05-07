using Domain.Models;

namespace OnlabAPI.DataTransferObjects
{
    public class PizzaDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string Toppings { get; set; }
        public IFormFile formFile { get; set; }
    }
}
