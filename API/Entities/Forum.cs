using System.ComponentModel.DataAnnotations.Schema;

namespace DAFwebAPI.Entities
{
    public class Forum :Common
    {

        public string? Title { get; set; }
       
        public string? Img { get; set; }
        [NotMapped]
        public IFormFile? Photo { get; set; }

        public string? Description { get; set; }

        public ForumEvent IsForumEvent { get; set; }

        public string ? AmharicDescription { get; set; }

        public virtual User? WaterFederation { get; set; }

        public Guid WaterFederationId { get; set; }

    }

    public enum ForumEvent
    {
        Forum,
        Event
    }
}
