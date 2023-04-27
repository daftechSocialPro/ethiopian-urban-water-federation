namespace DAFwebAPI.Services.Vaccancy
{
    public interface IVaccancyRepository
    {
       Task Create(DAFwebAPI.Entities.Vaccancy vaccancy);
        

        Task<List<DAFwebAPI.Entities.Vaccancy>> GetAll(Guid userid);

        Task Update(DAFwebAPI.Entities.Vaccancy vaccancy);
    }
}
