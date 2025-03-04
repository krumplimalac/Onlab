using Microsoft.AspNetCore.Identity;

namespace OnlabAPI.DataTransferObjects
{
    public class ReservationDTO
    {
        public string ReserverId { get; set; }
        public int TableId { get; set; }
        public int NumberOfPeople { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly StarTime { get; set; }
        public TimeOnly EndTime { get; set; }
    }
}
