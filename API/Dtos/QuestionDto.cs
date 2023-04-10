using DAFwebAPI.Entities;

namespace DAFwebAPI.Dtos
{
    public class QuestionDto:Questions
    {
        public List<string>? Choices { get; set; }
    }
}
