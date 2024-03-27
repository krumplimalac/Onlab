using Domain.Models;
using Domain.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IDrinkRepository
    {
        public Task<PagedList<Drink>> GetAll(Parameter parameter);
        public Task PostDrink(Drink drink);
    }
}
