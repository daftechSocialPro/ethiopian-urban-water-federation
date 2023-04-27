namespace DAFwebAPI.Entities
{

    public class Vaccancy :Common
    {
        
        public string? Title { get; set; }
       
        public string? AmharicTitle { get; set; }
      
        public string FromDateTime { get; set; }
    
        public string ToDateTime { get; set; }

        public string? Description { get; set; }
  
        public string? AmharicDescription { get; set; }

        public string? FilePath { get; set; }
   
        public string? Company { get; set; }  
      
        public string? Email { get; set; }

        public virtual User? User { get; set; }
        public Guid? UserId { get; set; }

    }
}
