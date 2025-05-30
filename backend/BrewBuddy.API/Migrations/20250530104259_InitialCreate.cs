using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BrewBuddy.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BrewRecipes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Style = table.Column<string>(type: "TEXT", nullable: false),
                    BatchSizeLiters = table.Column<double>(type: "REAL", nullable: false),
                    MashTempC = table.Column<int>(type: "INTEGER", nullable: false),
                    MashTimeMin = table.Column<int>(type: "INTEGER", nullable: false),
                    BoilTimeMin = table.Column<int>(type: "INTEGER", nullable: false),
                    Yeast = table.Column<string>(type: "TEXT", nullable: false),
                    Notes = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BrewRecipes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HopAdditions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HopName = table.Column<string>(type: "TEXT", nullable: false),
                    AmountGrams = table.Column<double>(type: "REAL", nullable: false),
                    TimeMin = table.Column<int>(type: "INTEGER", nullable: false),
                    BrewRecipeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HopAdditions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HopAdditions_BrewRecipes_BrewRecipeId",
                        column: x => x.BrewRecipeId,
                        principalTable: "BrewRecipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HopAdditions_BrewRecipeId",
                table: "HopAdditions",
                column: "BrewRecipeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HopAdditions");

            migrationBuilder.DropTable(
                name: "BrewRecipes");
        }
    }
}
