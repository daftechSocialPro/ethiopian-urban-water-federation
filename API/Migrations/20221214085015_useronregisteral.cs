using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAFwebAPI.Migrations
{
    public partial class useronregisteral : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "waterUtilities",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "RegionalWaterFederations",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_waterUtilities_UserId",
                table: "waterUtilities",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RegionalWaterFederations_UserId",
                table: "RegionalWaterFederations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RegionalWaterFederations_Users_UserId",
                table: "RegionalWaterFederations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_waterUtilities_Users_UserId",
                table: "waterUtilities",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RegionalWaterFederations_Users_UserId",
                table: "RegionalWaterFederations");

            migrationBuilder.DropForeignKey(
                name: "FK_waterUtilities_Users_UserId",
                table: "waterUtilities");

            migrationBuilder.DropIndex(
                name: "IX_waterUtilities_UserId",
                table: "waterUtilities");

            migrationBuilder.DropIndex(
                name: "IX_RegionalWaterFederations_UserId",
                table: "RegionalWaterFederations");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "waterUtilities");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "RegionalWaterFederations");
        }
    }
}
