
namespace DAFwebAPI.Services
{
    public interface IRegionRepository
    {
        Task Create(DAFwebAPI.Entities.Region region);

        Task Update(DAFwebAPI.Entities.Region region);

        Task<List<DAFwebAPI.Entities.Region>> GetAll();
    }
}
