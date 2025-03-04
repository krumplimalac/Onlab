using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Message
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string SenderId { get; set; }
        [Required]
        public string ReceiverId { get; set; }
        [Required]
        public string Sender { get; set; }
        [Required]
        public string Receiver { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }
        public string Text { get; set; }

    }
}
