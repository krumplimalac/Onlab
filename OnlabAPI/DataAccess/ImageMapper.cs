using Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    
    public class ImageMapper
    {
        
        public Image? ChangeImage(IFormFile file)
        {
            using var memoryStream = new MemoryStream();
            file.CopyTo(memoryStream);
            if (memoryStream.Length < 2097152)
            {
                var bytes = memoryStream.ToArray();
                var newimage = new Image
                {
                    Bytes = memoryStream.ToArray(),
                    Description = file.FileName
                };
                return newimage;
            }
            else
            {
                return null;
            }
        }
    }
}
