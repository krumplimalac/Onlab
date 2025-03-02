using Microsoft.AspNetCore.Identity;

namespace OnlabAPI.DataTransferObjects
{
    public class ReservationDTO
    {
        public string ReserverId { get; set; }
        public int TableId { get; set; }
        public int NumberOfPeople { get; set; }
        public DateTime Date { get; set; }
        public int Duration { get; set; }
    }
}
