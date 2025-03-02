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
        Task<List<Reservation>> GetReservations();
        Task<List<Reservation>> GetReservationsByUser(IdentityUser user);
        Task<bool> PostReservation(Reservation reservation, int tableid);
        Task<bool> DeleteReservation(int id);
    }
}
