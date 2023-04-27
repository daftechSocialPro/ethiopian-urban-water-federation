using DAFwebAPI.Data;
using DAFwebAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services.Vaccancy
{
    public class VaccancyRepository : IVaccancyRepository
    {
        private readonly ApplicationDbContext _context;

        public VaccancyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<DAFwebAPI.Entities.Vaccancy>> GetAll(Guid userId)
        {
            if(userId == Guid.Empty)
            {
                return await _context.Vaccancies.Include(x => x.User).ToListAsync();
            }
            else
            {
                var user = _context.Users.Find(userId);
                if(user != null && user.UserType == Entities.UserType.WaterFederation)
                {
                    return await _context.Vaccancies.Include(x => x.User).ToListAsync();
                }
                else
                {
                    return await _context.Vaccancies.Include(x => x.User).Where(x=>x.UserId == userId).ToListAsync();
                }
            }
            
        }
        public async Task Create(DAFwebAPI.Entities.Vaccancy vaccancy)
        {
            try
            {
                await _context.AddAsync(vaccancy);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Update(DAFwebAPI.Entities.Vaccancy vaccancy)
        {
            try
            {
                var vaccancys = _context.Vaccancies.Find(vaccancy.ID);

                if (vaccancys != null)
                {
                    vaccancys.Title = vaccancy.Title;
                    vaccancys.AmharicTitle=vaccancy.AmharicTitle;
                    vaccancys.ToDateTime= vaccancy.ToDateTime;
                    vaccancys.FromDateTime= vaccancy.FromDateTime;
                    vaccancys.Description = vaccancy.Description;
                    vaccancys.AmharicDescription=vaccancy.AmharicDescription;
                    vaccancys.Company=vaccancy.Company;
                    vaccancys.Email=vaccancy.Email;
                    vaccancys.updatedAt = DateTime.UtcNow;
                    _context.Vaccancies.Update(vaccancys);
                    _context.SaveChanges();

                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }

    }
}
