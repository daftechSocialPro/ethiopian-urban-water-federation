using System.ComponentModel.DataAnnotations.Schema;

namespace DAFwebAPI.Entities
{
    public class RegionalWaterFederation: Common
    {

        public string? Logo { get; set; }

        [NotMapped]
        public IFormFile? Photo { get; set; }

        public string ? Name { get; set; }

        public string ? Email { get; set; }

        public string? Phone { get; set; }

        public string? Description { get; set; }

        public virtual Region? Region { get; set; }  
        public Guid RegionId { get; set; }


        public virtual User? User { get; set; }
        public Guid  ?  UserId { get; set; }

       
    }
}
