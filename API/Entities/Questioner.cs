namespace DAFwebAPI.Entities
{
    public class Questioner : Common
    {

        public string ? title { get; set; }

        public UserType? ForWhom { get; set; }

        public DateTime SubmittedDate { get; set; }


        public QuestionerStatus? Status { get; set; }


    }


    public enum QuestionerStatus    {
        Inactive,
        Active,
        Closed 
    }
}
