using Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbMeal
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string Description { get; set; }
        public List<Restriction> Restrictions { get; set; }
        public Image Image { get; set; }
        [NotMapped]
        public IFormFile File { get; set; }
    }
}
