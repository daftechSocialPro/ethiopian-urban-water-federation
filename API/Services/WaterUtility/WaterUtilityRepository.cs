using DAFwebAPI.Data;
using DAFwebAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services.WaterUtility
{
    public class WaterUtilityRepository :IWaterUtilityRepository
    {
        private readonly ApplicationDbContext _context;
        public WaterUtilityRepository(ApplicationDbContext context)
        {
            _context = context;


        }


        public async Task Create(DAFwebAPI.Entities.WaterUtility waterUtility)
        {
            try
            {

                if (waterUtility.Photo != null)
                {
                    var image = waterUtility.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Reg_upload_photo/"), waterUtility.ID.ToString() + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    waterUtility.Logo = "Assets/Reg_upload_photo/" + waterUtility.ID + fileExtension;
                }


                await _context.AddAsync(waterUtility);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public async Task<List<DAFwebAPI.Entities.WaterUtility>> GetAll()
        {
            return await _context.waterUtilities.Include(x=>x.RegionalWaterFederation).ToListAsync();
        }
        public async Task<List<DAFwebAPI.Entities.WaterUtility>> GetAllByRegion( Guid regionId)
        {
            return await _context.waterUtilities.Where(x=>x.RegionalWaterFederationId== regionId).Include(x => x.RegionalWaterFederation).ToListAsync();
        }


        public async Task Update(DAFwebAPI.Entities.WaterUtility waterUtility)
        {
            try
            {

                var waterUtility1 = await _context.waterUtilities.FindAsync(waterUtility.ID);
                waterUtility1.Name = waterUtility.Name;
                waterUtility1.Email = waterUtility.Email;
                waterUtility1.Phone = waterUtility.Phone;
                waterUtility1.Description = waterUtility.Description;



                waterUtility1.Prodcapa = waterUtility.Prodcapa;
                waterUtility1.Purification = waterUtility.Purification;
                waterUtility1.Reservwire = waterUtility.Reservwire;
                waterUtility1.Mainpresure = waterUtility.Mainpresure;
                waterUtility1.Distributionkm = waterUtility.Distributionkm;
                waterUtility1.Noemployees = waterUtility.Noemployees;
                waterUtility1.Source = waterUtility.Source;
                waterUtility1.Establisheddate = waterUtility.Establisheddate;
                waterUtility1.Kmfromaa = waterUtility.Kmfromaa;
                waterUtility1.WebLink= waterUtility.WebLink;



                if (waterUtility.Photo != null)
                {
                    var image = waterUtility.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Reg_upload_photo/"), waterUtility1.ID.ToString() + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    waterUtility1.Logo = "Assets/Reg_upload_photo/" + waterUtility1.ID + fileExtension;
                }

                _context.waterUtilities.Update(waterUtility1);
                await _context.SaveChangesAsync();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
