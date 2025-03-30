using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        public IdentityUser Reserver { get; set; }
        public string ReserverName { get; set; }
        public string PhoneNumber { get; set; }
        public Table Table { get; set; }
        public int NumberOfPeople { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }



    }
}
