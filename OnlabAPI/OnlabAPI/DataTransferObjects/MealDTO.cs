namespace OnlabAPI.DataTransferObjects
{
    public class MealDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Restrictions { get; set; }
        public int Price { get; set; }
        public IFormFile? FormFile { get; set; }
    }
}
