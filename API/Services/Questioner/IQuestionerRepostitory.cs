namespace DAFwebAPI.Services.Questioner
{
    public interface IQuestionerRepostitory
    {
        Task Create(DAFwebAPI.Entities.Questioner questioner);

        Task Update(DAFwebAPI.Entities.Questioner questioner);

        Task<List<DAFwebAPI.Entities.Questioner>> GetAll();


        Task<List<DAFwebAPI.Entities.Questioner>> GetByUserId(Guid userId);


        Task<List<DAFwebAPI.Entities.Answer>> IsQuestionerSubmitted(Guid userId, Guid QuestionerId);

    }
}
