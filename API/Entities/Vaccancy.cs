namespace DAFwebAPI.Entities
{
    public class Vaccancy :Common
    {
        
        public string? Title { get; set; }
       
        public string? AmharicTitle { get; set; }
      
        public DateTime FromDateTime { get; set; }
    
        public DateTime ToDateTime { get; set; }

        public string? Description { get; set; }
  
        public string? AmharicDescription { get; set; }

        public string? FilePath { get; set; }
   
        public string? Company { get; set; }  
      
        public string? Email { get; set; }

    }
}
