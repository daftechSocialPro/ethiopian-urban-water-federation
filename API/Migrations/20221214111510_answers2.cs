using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAFwebAPI.Migrations
{
    public partial class answers2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Answers",
                table: "Answers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "QuestionerId",
                table: "Answers",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RegionalWaterFederationId",
                table: "Answers",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionerId",
                table: "Answers",
                column: "QuestionerId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_RegionalWaterFederationId",
                table: "Answers",
                column: "RegionalWaterFederationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_Questioners_QuestionerId",
                table: "Answers",
                column: "QuestionerId",
                principalTable: "Questioners",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_RegionalWaterFederations_RegionalWaterFederationId",
                table: "Answers",
                column: "RegionalWaterFederationId",
                principalTable: "RegionalWaterFederations",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_Questioners_QuestionerId",
                table: "Answers");

            migrationBuilder.DropForeignKey(
                name: "FK_Answers_RegionalWaterFederations_RegionalWaterFederationId",
                table: "Answers");

            migrationBuilder.DropIndex(
                name: "IX_Answers_QuestionerId",
                table: "Answers");

            migrationBuilder.DropIndex(
                name: "IX_Answers_RegionalWaterFederationId",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "Answers",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "QuestionerId",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "RegionalWaterFederationId",
                table: "Answers");
        }
    }
}
