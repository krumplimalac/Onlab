using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Meals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pizza",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pizza", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Restrictions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restrictions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Topping",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topping", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MealRestrictions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MealId = table.Column<int>(type: "int", nullable: false),
                    RestrictionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealRestrictions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MealRestrictions_Meals_MealId",
                        column: x => x.MealId,
                        principalTable: "Meals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MealRestrictions_Restrictions_RestrictionId",
                        column: x => x.RestrictionId,
                        principalTable: "Restrictions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PizzaTopping",
                columns: table => new
                {
                    PizzasId = table.Column<int>(type: "int", nullable: false),
                    ToppingsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PizzaTopping", x => new { x.PizzasId, x.ToppingsId });
                    table.ForeignKey(
                        name: "FK_PizzaTopping_Pizza_PizzasId",
                        column: x => x.PizzasId,
                        principalTable: "Pizza",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PizzaTopping_Topping_ToppingsId",
                        column: x => x.ToppingsId,
                        principalTable: "Topping",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RestrictionTopping",
                columns: table => new
                {
                    RestrictionsId = table.Column<int>(type: "int", nullable: false),
                    ToppingsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RestrictionTopping", x => new { x.RestrictionsId, x.ToppingsId });
                    table.ForeignKey(
                        name: "FK_RestrictionTopping_Restrictions_RestrictionsId",
                        column: x => x.RestrictionsId,
                        principalTable: "Restrictions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RestrictionTopping_Topping_ToppingsId",
                        column: x => x.ToppingsId,
                        principalTable: "Topping",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Meals",
                columns: new[] { "Id", "Description", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Bundás Kenyér bundából és kenyérből van", "Bundás Kenyér", 2000 },
                    { 2, "Omlett 3 tojásból készül és nagyon fincsa", "Omlett", 1800 },
                    { 3, "Tükörtojás 3 tojásból készül és nagyon fincsa", "Tükörtojás", 1800 },
                    { 4, "Ez az étel, jó, de nem mindenki szereti", "Sült Oldalas", 2800 },
                    { 5, "Sima szendvics... semmi extra, kenyér, vaj, cuccok", "Szendvics", 1200 },
                    { 6, "Legjobb házi krumpliból, friss olajban sülve", "Sültkrumpli", 1000 },
                    { 7, "Frissen készült humusz, zöldségekkel", "Humusz tál", 1200 },
                    { 8, "Olasz módra készült, legfinomabb tésztaétel", "Bolognai Spagetti", 2900 },
                    { 9, "Frissen vágott zöldségekből, uborka, paaradicsom, saláta, és egy kis szeretet", "Saláta", 1000 }
                });

            migrationBuilder.InsertData(
                table: "Restrictions",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Gluténmentes" },
                    { 2, "Vegetáriánus" },
                    { 3, "Laktózmentes" },
                    { 4, "Vegán" }
                });

            migrationBuilder.InsertData(
                table: "MealRestrictions",
                columns: new[] { "Id", "MealId", "RestrictionId" },
                values: new object[,]
                {
                    { 1, 1, 2 },
                    { 2, 1, 3 },
                    { 3, 2, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_MealRestrictions_MealId",
                table: "MealRestrictions",
                column: "MealId");

            migrationBuilder.CreateIndex(
                name: "IX_MealRestrictions_RestrictionId",
                table: "MealRestrictions",
                column: "RestrictionId");

            migrationBuilder.CreateIndex(
                name: "IX_PizzaTopping_ToppingsId",
                table: "PizzaTopping",
                column: "ToppingsId");

            migrationBuilder.CreateIndex(
                name: "IX_RestrictionTopping_ToppingsId",
                table: "RestrictionTopping",
                column: "ToppingsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MealRestrictions");

            migrationBuilder.DropTable(
                name: "PizzaTopping");

            migrationBuilder.DropTable(
                name: "RestrictionTopping");

            migrationBuilder.DropTable(
                name: "Meals");

            migrationBuilder.DropTable(
                name: "Pizza");

            migrationBuilder.DropTable(
                name: "Restrictions");

            migrationBuilder.DropTable(
                name: "Topping");
        }
    }
}
