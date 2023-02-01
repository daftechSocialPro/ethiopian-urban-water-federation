namespace DAFwebAPI.Services.WaterUtility
{
    public interface IWaterUtilityRepository
    {
        Task Create(DAFwebAPI.Entities.WaterUtility waterUtility);

        Task Update(DAFwebAPI.Entities.WaterUtility waterUtility);

        Task<List<DAFwebAPI.Entities.WaterUtility>> GetAll();

        Task<List<DAFwebAPI.Entities.WaterUtility>> GetAllByRegion(Guid regionalFedId);
    }
}
