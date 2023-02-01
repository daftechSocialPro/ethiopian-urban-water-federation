namespace DAFwebAPI.Services.RegionalFederation
{
    public interface IRegionalFederationRepository
    {
        Task Create(DAFwebAPI.Entities.RegionalWaterFederation regionalWaterFederation);

        Task Update(DAFwebAPI.Entities.RegionalWaterFederation regionalWaterFederation);

        Task<List<DAFwebAPI.Entities.RegionalWaterFederation>> GetAll();




    }
}
