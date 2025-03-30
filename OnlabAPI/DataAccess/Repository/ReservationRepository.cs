using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class ReservationRepository : IReservationRepository
    {
        private DatabaseContext _context;

        public ReservationRepository(DatabaseContext context)
        {
            _context = context;
        }


        public async Task<bool> DeleteReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return false;
            }
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Reservation>> GetReservationsByDate(DateTime date)
        {
            return await _context.Reservations.Select(r => r).Where(r => r.StartTime.Year == date.Year && r.StartTime.Month == date.Month && r.StartTime.Day == date.Day).Include(r => r.Reserver).Include(r => r.Table).ToListAsync();
        }

        public async Task<List<Reservation>> GetReservationsByUser(IdentityUser user)
        {
            return await _context.Reservations.Select(r => r).Where(r =>r.Reserver == user).Include(r => r.Reserver).ToListAsync();
        }

        public async Task CreateReservation(Reservation reservation)
        {
            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();
        }

    }
}
