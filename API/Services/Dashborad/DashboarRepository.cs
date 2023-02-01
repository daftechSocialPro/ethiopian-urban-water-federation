using DAFwebAPI.Data;
using DAFwebAPI.Dtos;
using static DAFwebAPI.Services.Dashborad.DashboarRepository;

namespace DAFwebAPI.Services.Dashborad
{
    public class DashboarRepository : IDashboradRepository
    {

        private readonly ApplicationDbContext _context;
        public DashboarRepository(ApplicationDbContext context)
        {
            _context = context;

        }


        public DashboardDto GetAll()
        {




            DashboardDto u = new DashboardDto
            {
                numberOfRegionalFeds = _context.RegionalWaterFederations.Count(),
                numberOfWaterUtility = _context.waterUtilities.Count(),
                numberOfResearches = _context.Researchs.Count(),
                numberOfBoardMembers = _context.BoardMembers.Count()
            };

            return u;






        }
    }
}
