﻿using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IRestrictionRepository
    {
        Task<List<Restriction>?> GetRestrictions();
        Task<bool> DeleteRestriction(int id);
    }
}
