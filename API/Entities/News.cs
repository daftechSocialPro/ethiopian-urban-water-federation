using System.ComponentModel.DataAnnotations.Schema;

namespace DAFwebAPI.Entities
{
    public class News :Common
    {


        public string? Title { get; set; }
        public string? SubTitle { get; set; }
        public string? Img { get; set; }
        [NotMapped]
        public IFormFile? Photo { get; set; }

        public string? Description { get; set; }

        public bool isApproved { get; set; }

        public virtual User? WaterFederation { get; set; }

        public Guid WaterFederationId { get; set; }

    }
}
