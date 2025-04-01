using Domain.Interfaces;
using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly ITableRepository _tableRepository;

        public ReservationService(IReservationRepository reservationRepository, ITableRepository tableRepository)
        {
            _reservationRepository = reservationRepository;
            _tableRepository = tableRepository;
        }

        public async Task<Table?> FreeTable(DateTime startTime, DateTime endTime, int numberOfPeople)
        {
            var allTables = await _tableRepository.GetTables();
            if (allTables == null) return null;
            allTables = [.. allTables.OrderByDescending(t => t.Capacity).Reverse().Where(t => t.Capacity >= numberOfPeople)];
            var reservedTables = await _tableRepository.GetReservedTablesByTimeFrame(startTime, endTime);
            if (reservedTables == null) return allTables.First();
            foreach (var t in allTables)
            {
                if (!reservedTables.Contains(t))
                {
                    return t;
                }
            }
            return null;
        }

        public async Task<List<DateTime>> GetFreeTimes(int numberOfPeople, int duration)
        {
            DateTime today = DateTime.Today;
            DateTime startOfTheWeek = new();
            DateTime endOfTheWeek = new();
            List<DateTime> freeTimes = new();

            startOfTheWeek = today.AddDays(1.0);
            endOfTheWeek = today.AddDays(7.0 - (double)today.DayOfWeek);

            var max = (int)endOfTheWeek.DayOfWeek - (int)startOfTheWeek.DayOfWeek + 7;

            for (int i = 0; i <= max; i++)
            {
                var day = startOfTheWeek.AddDays(i); //FELESLEGES
                var indexdate = new DateTime(day.Year, day.Month, day.Day, 9, 0, 0);
                for (int k = 0; k <= 16 - duration; k++)
                {
                    if (await FreeTable(indexdate, indexdate.AddMinutes(duration * 30), numberOfPeople) != null)
                    {
                        freeTimes.Add(indexdate);
                    }
                    indexdate = indexdate.AddMinutes(30);
                }
            }
            return freeTimes;
        }

        public async Task<bool> AddReservation(Reservation reservation)
        {
            var table = await FreeTable(reservation.StartTime, reservation.EndTime, reservation.NumberOfPeople);
            if (table == null) return false;
            reservation.Table = table;
            await _reservationRepository.CreateReservation(reservation);
            return true;
        }

        public async Task<bool> DeleteReservation(int id)
        {
            return await _reservationRepository.DeleteReservation(id);
        }

        public async Task<List<Reservation>> GetReservationsByDate(DateTime date)
        {
            return await _reservationRepository.GetReservationsByDate(date);
        }

        public async Task<List<Reservation>> GetReservationsByUser(IdentityUser user)
        {
            return await _reservationRepository.GetReservationsByUser(user);
        }
    }
}
