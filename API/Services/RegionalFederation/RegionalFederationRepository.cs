using DAFwebAPI.Data;
using DAFwebAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services.RegionalFederation
{
    public class RegionalFederationRepository : IRegionalFederationRepository
    {
        private readonly ApplicationDbContext _context;
        public RegionalFederationRepository(ApplicationDbContext context)
        {
            _context = context;


        }


        public async Task Create(DAFwebAPI.Entities.RegionalWaterFederation regionalWaterFederation)
        {
            try
            {

                if (regionalWaterFederation.Photo != null)
                {
                    var image = regionalWaterFederation.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Reg_upload_photo/"), regionalWaterFederation.ID.ToString() + fileExtension);


                    await image.SaveAsAsync(savingPath);
                    regionalWaterFederation.Logo = "Assets/Reg_upload_photo/" + regionalWaterFederation.ID + fileExtension;
                }


                await _context.AddAsync(regionalWaterFederation);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public async Task<List<DAFwebAPI.Entities.RegionalWaterFederation>> GetAll()
        {
            return await _context.RegionalWaterFederations.Include(x=>x.Region).ToListAsync();
        }

        public async Task Update(DAFwebAPI.Entities.RegionalWaterFederation regionalWaterFederation)
        {
            try
            {
                var regionfed = await _context.RegionalWaterFederations.FindAsync(regionalWaterFederation.ID);
                regionfed.Name = regionalWaterFederation.Name;
                regionfed.Email = regionalWaterFederation.Email;
                regionfed.Phone = regionalWaterFederation.Phone;
                regionfed.Description = regionalWaterFederation.Description;
                regionfed.RegionId = regionalWaterFederation.RegionId;
                regionfed.WebLink= regionalWaterFederation.WebLink;


                if (regionalWaterFederation.Photo != null)
                {
                    var image = regionalWaterFederation.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Reg_upload_photo/"), regionalWaterFederation.ID.ToString() + fileExtension);

                    await image.SaveAsAsync(savingPath);
                    regionfed.Logo = "Assets/Reg_upload_photo/" + regionalWaterFederation.ID + fileExtension;
                }

                _context.RegionalWaterFederations.Update(regionfed);
                await _context.SaveChangesAsync();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
