namespace DAFwebAPI.Dtos
{
    public class AnswerDto
    {
        public Guid ? QuestionerId { get; set; }
        public Guid ? QuestionId { get; set; }
        public Guid ? UserId { get; set; }
        public string?  Answers { get; set; }
    }
}
