using Domain.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetReservationsByDate(DateTime date);
        Task<List<Reservation>> GetReservationsByUser(IdentityUser user);
        Task CreateReservation(Reservation reservation);
        Task<bool> DeleteReservation(int id);
    }
}
