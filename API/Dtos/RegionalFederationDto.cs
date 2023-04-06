using DAFwebAPI.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAFwebAPI.Dtos
{
    public class RegionalFederationDto
    {

        public string? Logo { get; set; }

        [NotMapped]
        public IFormFile? Photo { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? Phone { get; set; }

        public string? Description { get; set; }

        public Guid RegionId { get; set; }

        public Guid UserId { get; set; }
    }
    public class WaterUtilityDto
    {

        public string? Logo { get; set; }

        [NotMapped]
        public IFormFile? Photo { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? Phone { get; set; }

        public string? Description { get; set; }

        public string? Prodcapa { get; set; }

        public string? Purification { get; set; }

        public string? Reservwire { get; set; }

        public string? Mainpresure { get; set; }

        public string? Distributionkm { get; set; }

        public string? Noemployees { get; set; }

        public string? Source { get; set; }

        public string? Establisheddate { get; set; }

        public string? Kmfromaa { get; set; }









        public Guid regionalWaterFederationId { get; set; }

        public Guid UserId { get; set; }
    }

}
