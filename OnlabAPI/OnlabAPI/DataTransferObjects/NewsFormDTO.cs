namespace OnlabAPI.DataTransferObjects
{
    public class NewsFormDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public IFormFile File { get; set; }
    }
}
