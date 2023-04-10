namespace DAFwebAPI.Entities
{
    public class Choices:Common
    {

        public string Choice { get; set; }
        public Guid QuestionId { get; set; }
        public Questions Question { get; set; }
    }
}
