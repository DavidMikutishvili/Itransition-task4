using Microsoft.EntityFrameworkCore.Migrations;

namespace CollectionBoxWebApi.Migrations
{
    public partial class AddBlock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "UserBlock",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserBlock",
                table: "AspNetUsers");
        }
    }
}
