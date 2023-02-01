namespace DAFwebAPI.Services.Contact
{
    public interface IContactRepository
    {
        Task Create(DAFwebAPI.Entities.Contact contact);
        //Task Update(News entity);

        Task<List<DAFwebAPI.Entities.Contact>> getAll();
    }
}
