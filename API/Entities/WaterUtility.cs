using System.ComponentModel.DataAnnotations.Schema;

namespace DAFwebAPI.Entities
{
    public class WaterUtility :Common
    {
        public string? Logo { get; set; }

        [NotMapped]
        public IFormFile? Photo { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Description { get; set; }

        public virtual RegionalWaterFederation? RegionalWaterFederation { get; set; }
        public Guid RegionalWaterFederationId { get; set; }

        public virtual User? User { get; set; }
        public Guid? UserId { get; set; }




    }
}
