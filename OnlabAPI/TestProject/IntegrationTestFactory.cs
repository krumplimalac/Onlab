using Castle.Core.Configuration;
using DataAccess;
using Fluent.Infrastructure.FluentModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Storage.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject
{
    internal class IntegrationTestFactory<TEntryPoint> : WebApplicationFactory<Program> where TEntryPoint : Program
    {

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices( services =>
            {
                builder.ConfigureServices(services =>
                {
                    var dbContextDescriptor = services.SingleOrDefault(
                        d => d.ServiceType ==
                            typeof(DbContextOptions<DatabaseContext>));

                    services.Remove(dbContextDescriptor);

                    var dbConnectionDescriptor = services.SingleOrDefault(
                        d => d.ServiceType ==
                            typeof(DbConnection));

                    services.Remove(dbConnectionDescriptor);

                    services.AddDbContext<ApplicationDbContext>((container, options) =>
                    {
                       
                        options.UseInMemoryDatabase(GetConnectionString());
                    });
                });


            });
            builder.UseEnvironment("Development");

        }

        private static string? GetConnectionString()
        {
            var configuration = new ConfigurationBuilder()
                .AddUserSecrets<IntegrationTestFactory<Program>>()
                .Build();

            var connectionstring = configuration.GetConnectionString("default");
            return connectionstring;
        }
    }
}
