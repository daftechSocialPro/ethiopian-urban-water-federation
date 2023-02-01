using DAFwebAPI.Data;
using DAFwebAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services.Sponsor
{
    public class SponsorRepository :ISponsorRepository
    {

        private readonly ApplicationDbContext _context;
        public SponsorRepository(ApplicationDbContext context)
        {
            _context = context;


        }


        public async Task Create(DAFwebAPI.Entities.Sponsor sponsor)
        {
            try
            {

                if (sponsor.Photo != null)
                {
                    var image = sponsor.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Sponsor_upload_photo/"), sponsor.ID.ToString() + fileExtension);

                    await image.SaveAsAsync(savingPath);
                    sponsor.Logo = "Assets/Sponsor_upload_photo/" + sponsor.ID + fileExtension;
                }

                await _context.Sponsors.AddAsync(sponsor);
                await _context.SaveChangesAsync();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public async Task<List<DAFwebAPI.Entities.Sponsor>> GetAll()
        {



            return await _context.Sponsors.ToListAsync();
        }

        public async Task Update(DAFwebAPI.Entities.Sponsor sponsor)
        {
            try
            {

                var sponsor1 = _context.Sponsors.Find(sponsor.ID);

                sponsor1.CompanyName = sponsor.CompanyName;
                sponsor1.AmharicCompanyName = sponsor.AmharicCompanyName;
                sponsor1.Description = sponsor.Description;
                sponsor1.SponcerLevel = sponsor.SponcerLevel;


                if (sponsor.Photo != null)
                {
                    var image = sponsor.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Sponsor_upload_photo/"), sponsor.ID.ToString() + fileExtension);

                    await image.SaveAsAsync(savingPath);
                    sponsor1.Logo = "Assets/Sponsor_upload_photo/" + sponsor.ID + fileExtension;
                }



                _context.Sponsors.Update(sponsor1);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }


    }
}
