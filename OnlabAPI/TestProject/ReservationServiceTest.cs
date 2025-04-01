using Domain.Models;
using Domain.Repository;
using Domain.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject
{
    public class ReservationServiceTest
    {
        private readonly ReservationService reservationService;
        private readonly Mock<IReservationRepository> mockReservationRepository = new();
        private readonly Mock<ITableRepository> mockTableRepository = new();

        public ReservationServiceTest()
        {
            reservationService = new ReservationService(mockReservationRepository.Object,mockTableRepository.Object);
        }

        [Fact]
        public async Task FreeTableShouldReturnFreeTable_WhenThereIsFreeTable()
        {
            List<Table> tables = [];
            var reservedTable = new Table
            {
                Capacity = 2,
                Id = 1
            };
            var freeTable = new Table
            {
                Capacity = 4,
                Id = 2
            };
            tables.Add(reservedTable);
            tables.Add(freeTable);
            List<Table> reservedTables = [];
            reservedTables.Add(reservedTable);
            var startTime = new DateTime();
            var endTime = startTime.AddHours(1);
            var numberOfPeople = 2;

            mockTableRepository.Setup(x => x.GetTables()).ReturnsAsync(tables);
            mockTableRepository.Setup(x => x.GetReservedTablesByTimeFrame(startTime, endTime)).ReturnsAsync(reservedTables);

            var result = await reservationService.FreeTable(startTime, endTime, numberOfPeople);

            Assert.Equal(result,freeTable);
        }

        [Fact]
        public async Task FreeTableShouldReturnSmallestCapacityFreeTable_WhenThereAreFreeTables()
        {
            List<Table> tables = [];
            var table_1 = new Table
            {
                Capacity = 2,
                Id = 1
            };
            var table_2 = new Table
            {
                Capacity = 4,
                Id = 2
            };
            var table_3 = new Table
            {
                Capacity = 5,
                Id = 3
            };
            tables.Add(table_3);
            tables.Add(table_1);
            tables.Add(table_2);
            List<Table> reservedTables = [];
            var startTime = new DateTime();
            var endTime = startTime.AddHours(1);
            var numberOfPeople = 1;

            mockTableRepository.Setup(x => x.GetTables()).ReturnsAsync(tables);
            mockTableRepository.Setup(x => x.GetReservedTablesByTimeFrame(startTime, endTime)).ReturnsAsync(reservedTables);

            var result = await reservationService.FreeTable(startTime, endTime, numberOfPeople);

            Assert.Equal(result, table_1);
        }

        [Fact]
        public async Task FreeTableShouldReturnNull_WhenThereIsNoFreeTable() //Név túl slang (?)
        {
            List<Table> tables = [];
            var reservedTable_1 = new Table
            {
                Capacity = 2,
                Id = 1
            };
            var reservedTable_2 = new Table
            {
                Capacity = 4,
                Id = 2
            };
            tables.Add(reservedTable_1);
            tables.Add(reservedTable_2);
            List<Table> reservedTables = [];
            reservedTables.Add(reservedTable_1);
            reservedTables.Add(reservedTable_2);
            var startTime = new DateTime();
            var endTime = startTime.AddHours(1);
            var numberOfPeople = 2;

            mockTableRepository.Setup(x => x.GetTables()).ReturnsAsync(tables);
            mockTableRepository.Setup(x => x.GetReservedTablesByTimeFrame(startTime, endTime)).ReturnsAsync(reservedTables);

            var result = await reservationService.FreeTable(startTime, endTime, numberOfPeople);

            Assert.Null(result);
        }

        [Fact]
        public async Task FreeTableShouldReturnNull_WhenThereAreNotAnyTables()
        {
            List<Table> tables = [];
            List<Table> reservedTables = [];
            var startTime = new DateTime();
            var endTime = startTime.AddHours(1);
            var numberOfPeople = 2;

            mockTableRepository.Setup(x => x.GetTables()).ReturnsAsync(tables);
            mockTableRepository.Setup(x => x.GetReservedTablesByTimeFrame(startTime, endTime)).ReturnsAsync(reservedTables);

            var result = await reservationService.FreeTable(startTime, endTime, numberOfPeople);

            Assert.Null(result);
        }

        [Fact]
        public async Task FreeTableShouldReturnNull_WhenNumberOfPeopleIsTooHigh()
        {
            List<Table> tables = [];
            var table_1 = new Table
            {
                Capacity = 2,
                Id = 1
            };
            var table_2 = new Table
            {
                Capacity = 4,
                Id = 2
            };

            tables.Add(table_1);
            tables.Add(table_2);
            List<Table> reservedTables = [];
            var startTime = new DateTime();
            var endTime = startTime.AddHours(1);
            var numberOfPeople = 5;

            mockTableRepository.Setup(x => x.GetTables()).ReturnsAsync(tables);
            mockTableRepository.Setup(x => x.GetReservedTablesByTimeFrame(startTime, endTime)).ReturnsAsync(reservedTables);

            var result = await reservationService.FreeTable(startTime, endTime, numberOfPeople);

            Assert.Null(result);
        }

        [Fact]
        public async Task FreeTimesShouldReturnEmptyList_WhenThereAreNotAnyFreeTime()
        {
            List<Table> tables = [];
            var table_1 = new Table
            {
                Capacity = 2,
                Id = 1
            };
            var table_2 = new Table
            {
                Capacity = 4,
                Id = 2
            };

            tables.Add(table_1);
            tables.Add(table_2);

            List<Table> reservedTables = [];
            reservedTables.Add(table_1);
            reservedTables.Add(table_2);
            var numberOfPeople = 1;
            var duration = 1;

            mockTableRepository.Setup(x => x.GetTables()).ReturnsAsync(tables);
            mockTableRepository.Setup(x => x.GetReservedTablesByTimeFrame(It.IsAny<DateTime>(),It.IsAny<DateTime>())).ReturnsAsync(reservedTables);

            var result = await reservationService.GetFreeTimes(numberOfPeople, duration);

            Assert.Empty(result);
        }

        [Fact]
        public async Task FreeTimesShouldReturnFreeTimes_WhenThereAreFreeTimes()
        {
            List<Table> tables = [];
            var table_1 = new Table
            {
                Capacity = 2,
                Id = 1
            };
            var table_2 = new Table
            {
                Capacity = 4,
                Id = 2
            };

            tables.Add(table_1);
            tables.Add(table_2);

            List<Table> reservedTables = [];
            reservedTables.Add(table_1);
            reservedTables.Add(table_2);
            var numberOfPeople = 1;
            var duration = 2;
            var startTime = DateTime.Today;
            startTime = startTime.AddDays(1);
            startTime = startTime.AddHours(9);
            var endTime = startTime.AddHours(1);
            List<DateTime> freeTimes = [];
            for(int i = 0; i <= duration; i++)
            {
                freeTimes.Add(startTime.AddMinutes(i * 30));
            }

            mockTableRepository.Setup(x => x.GetTables()).ReturnsAsync(tables);
            mockTableRepository.Setup(x => x.GetReservedTablesByTimeFrame(startTime, endTime)).ReturnsAsync(() => []);
            mockTableRepository.Setup(x => x.GetReservedTablesByTimeFrame(It.IsNotIn(freeTimes.ToArray()), It.IsNotIn(freeTimes.ToArray()))).ReturnsAsync(reservedTables);

            var result = await reservationService.GetFreeTimes(numberOfPeople, duration);

            Assert.Equal(freeTimes, result);
        }
    }
}
