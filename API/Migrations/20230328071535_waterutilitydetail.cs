using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAFwebAPI.Migrations
{
    public partial class waterutilitydetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Distributionkm",
                table: "waterUtilities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Establisheddate",
                table: "waterUtilities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Kmfromaa",
                table: "waterUtilities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Mainpresure",
                table: "waterUtilities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Noemployees",
                table: "waterUtilities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Prodcapa",
                table: "waterUtilities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Purification",
                table: "waterUtilities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Reservwire",
                table: "waterUtilities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Source",
                table: "waterUtilities",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Distributionkm",
                table: "waterUtilities");

            migrationBuilder.DropColumn(
                name: "Establisheddate",
                table: "waterUtilities");

            migrationBuilder.DropColumn(
                name: "Kmfromaa",
                table: "waterUtilities");

            migrationBuilder.DropColumn(
                name: "Mainpresure",
                table: "waterUtilities");

            migrationBuilder.DropColumn(
                name: "Noemployees",
                table: "waterUtilities");

            migrationBuilder.DropColumn(
                name: "Prodcapa",
                table: "waterUtilities");

            migrationBuilder.DropColumn(
                name: "Purification",
                table: "waterUtilities");

            migrationBuilder.DropColumn(
                name: "Reservwire",
                table: "waterUtilities");

            migrationBuilder.DropColumn(
                name: "Source",
                table: "waterUtilities");
        }
    }
}
