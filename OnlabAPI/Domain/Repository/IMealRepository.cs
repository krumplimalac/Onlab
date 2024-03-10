using Domain.Models;
using Domain.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IMealRepository
    {
        Task<PagedList<Meal>> GetAllMeals(MealParameters mealParameters);
    }
}
