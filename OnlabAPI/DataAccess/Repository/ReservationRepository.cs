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

        public async Task<List<Reservation>> GetReservations()
        {
            return await _context.Reservations.Select(r => r).Include(r => r.Reserver).ToListAsync();
        }

        public async Task<List<Reservation>> GetReservationsByUser(IdentityUser user)
        {
            return await _context.Reservations.Select(r => r).Where(r =>r.Reserver == user).Include(r => r.Reserver).ToListAsync();
        }

        public async Task<bool> PostReservation(Reservation reservation, int tableid)
        {
            var table = await _context.Tables.Select(t => t).Where(t => t.Id == tableid).SingleAsync();
            if (table == null) return false;
            reservation.Table = table;
            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
