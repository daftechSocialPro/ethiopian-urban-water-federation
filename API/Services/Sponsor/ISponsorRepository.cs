using DAFwebAPI.Entities;

namespace DAFwebAPI.Services.Sponsor
{
    public interface ISponsorRepository
    {

        Task Create(DAFwebAPI.Entities.Sponsor research);

        Task Update(DAFwebAPI.Entities.Sponsor research);

        Task<List<DAFwebAPI.Entities.Sponsor>> GetAll();
        Task<List<DAFwebAPI.Entities.Sponsor>> GetAllBYSupportTYpe(SupportType supportType);
    }
}
