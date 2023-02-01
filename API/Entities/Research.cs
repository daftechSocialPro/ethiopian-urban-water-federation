using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace DAFwebAPI.Entities
{
    public class Research :Common
    {

        public string? Author { get; set; }

        [NotMapped]
        public IFormFile? AutherImage { get; set; }
        public string ? AuthorImagePath { get; set; }
       
        public string  ? Title { get; set; }
     
        public string ? Description { get; set; }

        public string? AmharicAuthor { get; set; }
    
        public string? AmharicTitle { get; set; }
    
        public string? AmharicDescription { get; set; }


        [NotMapped]
        public IFormFile? ResearchFile { get; set; }

        public string? ResearchFilePath { get; set; }
  
        public DateTime PublishedAt { get; set; }
    }
}
