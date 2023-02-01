using DAFwebAPI.Dtos;

namespace DAFwebAPI.Services.Dashborad
{
    public interface IDashboradRepository
    {
        DashboardDto GetAll();

    }
}
