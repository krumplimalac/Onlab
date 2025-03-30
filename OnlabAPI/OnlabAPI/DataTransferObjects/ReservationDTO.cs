using Microsoft.AspNetCore.Identity;

namespace OnlabAPI.DataTransferObjects
{
    public class ReservationDTO
    {
        public string ReserverId { get; set; }
        public string Reserver { get; set; }
        public string PhoneNumber { get; set; }
        public int TableId { get; set; }
        public int NumberOfPeople { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
