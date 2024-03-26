using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class News
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Date {  get; set; }
        public Image Image { get; set; }
        public int ImageId { get; set; }
        [NotMapped]
        public IFormFile File { get; set; }

    }
}
