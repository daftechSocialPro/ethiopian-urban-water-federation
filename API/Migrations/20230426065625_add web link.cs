using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAFwebAPI.Migrations
{
    public partial class addweblink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WebLink",
                table: "waterUtilities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WebLink",
                table: "Sponsors",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WebLink",
                table: "RegionalWaterFederations",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WebLink",
                table: "waterUtilities");

            migrationBuilder.DropColumn(
                name: "WebLink",
                table: "Sponsors");

            migrationBuilder.DropColumn(
                name: "WebLink",
                table: "RegionalWaterFederations");
        }
    }
}
