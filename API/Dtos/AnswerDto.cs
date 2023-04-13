namespace DAFwebAPI.Dtos
{
    public class AnswerDto
    {
        public Guid ? QuestionerId { get; set; }
        public Guid ? QuestionId { get; set; }
        public Guid ? UserId { get; set; }
        public string?  Answers { get; set; }
    }



    public class GetAnswersDto
    {

        public string Name { get; set; }
        public List<QuestionAnswerDto> Answers { get; set; }
    }

    public class QuestionAnswerDto
    {


        public string? Question { get; set; }
        public Guid? QuestionId { get; set; }

        public Guid? AnswerId { get; set; }
        public string? Answer { get; set; }
    }

}
