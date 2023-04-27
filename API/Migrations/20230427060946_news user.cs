using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAFwebAPI.Migrations
{
    public partial class newsuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Vaccancies",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vaccancies_UserId",
                table: "Vaccancies",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vaccancies_Users_UserId",
                table: "Vaccancies",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vaccancies_Users_UserId",
                table: "Vaccancies");

            migrationBuilder.DropIndex(
                name: "IX_Vaccancies_UserId",
                table: "Vaccancies");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Vaccancies");
        }
    }
}
