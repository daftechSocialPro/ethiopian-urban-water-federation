namespace DAFwebAPI.Services.Forum
{
    public interface IForumRepository
    {
        Task Create(DAFwebAPI.Entities.Forum forum);
        //Task Update(News entity);

        Task<List<DAFwebAPI.Entities.Forum>> getAll();

        Task Update(DAFwebAPI.Entities.Forum forums);
    }
}
