using DAFwebAPI.Data;
using DAFwebAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services.Region
{
    public class RegionRepository : IRegionRepository
    {
        private readonly ApplicationDbContext _context;
        public RegionRepository(ApplicationDbContext context)
        {
            _context = context;


        }


        public async Task Create(DAFwebAPI.Entities.Region region)
        {
            try
            {

                await _context.AddAsync(region);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public async Task<List<DAFwebAPI.Entities.Region>> GetAll()
        {
            return await _context.Regions.ToListAsync();
        }

        public async Task Update(DAFwebAPI.Entities.Region region)
        {
            try
            {

                var region1 = await _context.Regions.FindAsync(region.ID);
                region1.RegionName = region.RegionName;
                _context.Regions.Update(region1);
                await _context.SaveChangesAsync();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

    }
}
