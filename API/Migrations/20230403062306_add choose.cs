using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAFwebAPI.Migrations
{
    public partial class addchoose : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfChoise",
                table: "Questions",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfChoise",
                table: "Questions");
        }
    }
}
