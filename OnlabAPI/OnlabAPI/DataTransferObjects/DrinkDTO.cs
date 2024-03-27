using Domain.Models;

namespace OnlabAPI.DataTransferObjects
{
    public class DrinkDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public int Price { get; set; }
        public IFormFile File { get; set; }
    }
}
