using DAFwebAPI.Entities;

namespace DAFwebAPI.Services
{
    public interface INewsRepository
    {
        Task Create( DAFwebAPI.Entities.News News);
        //Task Update(News entity);

        Task<List< DAFwebAPI.Entities.News>> getAll(Guid userId);
     
        Task Update(DAFwebAPI.Entities.News news);

    }
}
