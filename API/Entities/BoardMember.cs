using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DAFwebAPI.Entities
{
    public class BoardMember :Common
    {
        public virtual User ? WaterFederation { get; set; }
        public Guid WaterFederationId { get; set; }
        public string? Name { get; set; }
        public string? Position { get; set; }

        public string ? UserPhoto { get; set; }

        [NotMapped]
        [JsonIgnore] public IFormFile? Photo { get; set; }
        public string? Description { get; set; }

        public string? BirthDate { get; set; }

        public bool IsActive { get; set; }
     
        public string? InActiveDescription { get; set; }
    }
}
