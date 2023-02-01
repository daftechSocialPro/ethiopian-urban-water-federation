using System.ComponentModel;
using System.Text.Json.Serialization;

namespace DAFwebAPI.Entities
{
    public class User : Common
    {



        public string FullName { get; set; }

        public string Email { get; set; }

        [DefaultValue(true)]
        public bool IsActive { get; set; }

        public UserType UserType { get; set; }  

      
        [JsonIgnore] public string Password { get; set; }



    }

    public enum UserType
    {
        WaterFederation,
        RegionalFederation,
        WaterUtility
    }

}
