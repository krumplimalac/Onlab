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
                name: "Drinks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drinks", x => x.Id);
                });

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
                name: "Pizzas",
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
                    table.PrimaryKey("PK_Pizzas", x => x.Id);
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
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Bytes = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileExtension = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Size = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MealId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Meals_MealId",
                        column: x => x.MealId,
                        principalTable: "Meals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                        name: "FK_PizzaTopping_Pizzas_PizzasId",
                        column: x => x.PizzasId,
                        principalTable: "Pizzas",
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
                table: "Drinks",
                columns: new[] { "Id", "Description", "Name", "Price", "Type" },
                values: new object[,]
                {
                    { 1, "Legfinomabb kávéból, igazi olaszos preszzó.", "Espresso", 700, "coffee" },
                    { 2, "Minőségi Ginből, minőségű Tonicból", "Gin Tonic", 1300, "alchoholic" }
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
                    { 3, 2, 2 },
                    { 4, 3, 1 },
                    { 5, 3, 2 },
                    { 6, 4, 1 },
                    { 7, 4, 3 },
                    { 8, 5, 2 },
                    { 9, 6, 1 },
                    { 10, 6, 2 },
                    { 11, 6, 3 },
                    { 12, 6, 4 },
                    { 13, 7, 1 },
                    { 14, 7, 2 },
                    { 15, 7, 3 },
                    { 16, 7, 4 },
                    { 17, 9, 1 },
                    { 18, 9, 2 },
                    { 19, 9, 3 },
                    { 20, 9, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_MealId",
                table: "Images",
                column: "MealId",
                unique: true);

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
                name: "Drinks");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "MealRestrictions");

            migrationBuilder.DropTable(
                name: "PizzaTopping");

            migrationBuilder.DropTable(
                name: "RestrictionTopping");

            migrationBuilder.DropTable(
                name: "Meals");

            migrationBuilder.DropTable(
                name: "Pizzas");

            migrationBuilder.DropTable(
                name: "Restrictions");

            migrationBuilder.DropTable(
                name: "Topping");
        }
    }
}
