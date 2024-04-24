using Domain.Models;

namespace OnlabAPI.DataTransferObjects
{
    public class ItemDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Id { get; set; }
        public string Type { get; set; }
        public int Price { get; set; }
        public Image Image { get; set; }
        
    }
}
