
namespace DAFwebAPI.Services.Question
{
    public interface IQuestionRepository
    {
        Task Create(DAFwebAPI.Entities.Questions questions);

        Task Update(DAFwebAPI.Entities.Questions questions);

        Task<List<DAFwebAPI.Entities.Questions>> GetAll( Guid questionerId);

        Task SubmitAnswer(DAFwebAPI.Entities.Answer answer);

    }
}
