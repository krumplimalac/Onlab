﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Pizza
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public List<Topping> Toppings { get; set; }
        public List<Restriction> Restrictions { get; set; }
        public Image Image { get; set; }
        public int ImageId { get; set; }
        [NotMapped]
        public IFormFile? File { get; set; }

    }
}
