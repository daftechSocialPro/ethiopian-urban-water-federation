using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace DAFwebAPI.Entities
{
    public class Sponsor : Common
    {

        public string? CompanyName { get; set; }

        public string? AmharicCompanyName { get; set; }

        public string? Logo { get; set; }

        [NotMapped]
        public IFormFile? Photo {get;set;}

        public SponcerLevel ? SponcerLevel { get; set; }

        public string? Description { get; set; }

        public SupportType SupportType { get; set; }

        public string? WebLink { get; set; }

        [NotMapped]
        public IFormFile? Brocher { get; set; }

        public string? BrocherPath { get; set; }




    }

    public enum SponcerLevel
    {
        Platinum,
        Diamond,
        Gold,
        Silver
    }

    public enum SupportType
    {
        Sponser,
        Partnership
    }
}
