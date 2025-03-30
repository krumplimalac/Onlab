using Domain.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IReservationService
    {
        Task<List<Reservation>> GetReservationsByDate(DateTime date);
        Task<List<Reservation>> GetReservationsByUser(IdentityUser user);
        Task<List<DateTime>> GetFreeTimes(int numberOfPeople, int duration);
        Task<bool> AddReservation(Reservation reservation);
        Task<bool> DeleteReservation(int id);
        Task<Table?> FreeTable(DateTime startTime, DateTime endTime, int numberOfPeople);
    }
}
