using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IMealRepository
    {
        Task<IList<Meal>> GetAllMeals();
    }
}
