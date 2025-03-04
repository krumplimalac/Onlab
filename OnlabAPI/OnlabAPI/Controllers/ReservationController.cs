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
        private readonly IReservationRepository _repo;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly DTOMappers mapper;

        public ReservationController(IReservationRepository repository, UserManager<IdentityUser> usermanager)
        {
            _repo = repository;
            _userManager = usermanager;
            mapper = new();
        }

        [HttpGet]
        public async Task<ActionResult> GetAllReservations()
        {
            var reservations = await _repo.GetReservations();
            if (reservations == null) return NotFound();
            List<ReservationDTO> dtos = [];
            foreach (var r in reservations)
            {
                dtos.Add(mapper.ReservationToDTO(r));
            }
            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetReservationByUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return NotFound();
            var reservations = await _repo.GetReservationsByUser(user);
            if (reservations == null) return NotFound();
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
            if (await _repo.DeleteReservation(id))
                return Ok();
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> PostReservation(ReservationDTO reservation)
        {
            var user = await _userManager.FindByIdAsync(reservation.ReserverId);
            if (user == null) return NotFound();
            var newReservation = new Reservation
            {
                Date = reservation.Date,
                StartTime = reservation.StarTime,
                EndTime = reservation.EndTime,
                NumberOfPeople = reservation.NumberOfPeople,
                Reserver = user,
            };
            if (await _repo.PostReservation(newReservation, reservation.TableId)) return Ok();
            return BadRequest();
        }
    }
}
