namespace DAFwebAPI.Services
{
    public interface IReasearchRepository
    {

        Task Create(DAFwebAPI.Entities.Research research);

        Task Update(DAFwebAPI.Entities.Research research);

        Task<List<DAFwebAPI.Entities.Research>> GetAll();
    }
}
