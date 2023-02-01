


namespace DAFwebAPI.Services
{
    public interface IBorderMemberRepository
    {
        Task Create(DAFwebAPI.Entities.BoardMember member);

        Task Update(DAFwebAPI.Entities.BoardMember member);

        Task<List<DAFwebAPI.Entities.BoardMember>> GetAll();
    }
}
