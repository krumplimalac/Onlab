using Domain.Interfaces;
using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnlabAPI.DataTransferObjects;

namespace OnlabAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly DTOMappers mapper;

        public ReservationController(IReservationService service, UserManager<IdentityUser> usermanager)
        {
            _reservationService = service;
            _userManager = usermanager;
            mapper = new();
        }

        [HttpGet]
        public async Task<ActionResult> GetReservarionsByDay(DateTime date)
        {
            var reservations = await _reservationService.GetReservationsByDate(date);
            if (reservations == null) return NotFound("Nincs folgalás ekkor");
            List<ReservationDTO> dtos = [];
            foreach (var r in reservations)
            {
                r.StartTime.AddHours(1);
                r.EndTime.AddHours(1);
                dtos.Add(mapper.ReservationToDTO(r));
            }
            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetReservationByUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id); //Uer manager itt vagy serviceben?
            if (user == null) return NotFound("Nincs ilyen felhasználó");
            var reservations = await _reservationService.GetReservationsByUser(user);
            if (reservations == null) return NotFound("Nincs foglalás");
            List<ReservationDTO> dtos = [];
            foreach (var r in reservations)
            {
                dtos.Add(mapper.ReservationToDTO(r));
            }
            return Ok(dtos);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReservation(int id)
        {
            if (await _reservationService.DeleteReservation(id))
                return Ok("Sikeres törlés");
            return NotFound("Nincs ilyen foglalás");
        }

        [HttpPost]
        public async Task<ActionResult> PostReservation(ReservationDTO reservation)
        {
            var user = await _userManager.FindByIdAsync(reservation.ReserverId);
            if (user == null) return NotFound("Nincs ilyen felhasználó!");
            var newReservation = new Reservation
            {
                StartTime = reservation.StartTime,
                EndTime = reservation.EndTime,
                NumberOfPeople = reservation.NumberOfPeople,
                Reserver = user,
                PhoneNumber = reservation.PhoneNumber,
                ReserverName = reservation.Reserver
            };
            if (await _reservationService.AddReservation(newReservation)) return Ok("Sikeres felvétel");
            return BadRequest("Sikertelen foglalás!");
        }

        [HttpGet("GetFreeTimes")]
        public async Task<ActionResult> GetFreeTimes(int numberOfPeople, int duration)
        {
            return Ok( await _reservationService.GetFreeTimes(numberOfPeople,duration));
        }
    }
}
