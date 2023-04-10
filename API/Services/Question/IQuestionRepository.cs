
using DAFwebAPI.Dtos;

namespace DAFwebAPI.Services.Question
{
    public interface IQuestionRepository
    {
        Task Create(QuestionDto questions);

        Task Update(QuestionDto questions);

        Task<List<QuestionDto>> GetAll( Guid questionerId);

        Task SubmitAnswer(DAFwebAPI.Entities.Answer answer);

    }
}
