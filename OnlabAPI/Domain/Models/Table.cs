using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Table
    {
        [Key]
        public int Id { get; set; }
        public int Number { get; set; }
        public List<Reservation> Reservations { get; set; }

    }
}
