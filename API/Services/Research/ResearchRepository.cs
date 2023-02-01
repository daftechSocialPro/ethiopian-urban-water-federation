using DAFwebAPI.Data;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Metrics;

namespace DAFwebAPI.Services.Research
{
    public class ResearchRepository : IReasearchRepository
    {
        private readonly ApplicationDbContext _context;
        public ResearchRepository(ApplicationDbContext context)
        {
            _context = context;


        }


        public async Task Create(DAFwebAPI.Entities.Research research)
        {
            try
            {

                if (research.AutherImage != null)
                {
                    var image = research.AutherImage;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Research_upload_photo/"), research.ID.ToString() + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    research.AuthorImagePath = "Assets/Research_upload_photo/" + research.ID + fileExtension;
                }

                if (research.ResearchFile != null)
                {
                    var image = research.ResearchFile;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Research_upload_photo/"), research.ID.ToString() + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    research.ResearchFilePath = "Assets/Research_upload_photo/" + research.ID + fileExtension;
                }


                await _context.Researchs.AddAsync(research);
                await _context.SaveChangesAsync();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public async Task<List<DAFwebAPI.Entities.Research>> GetAll()
        {



            return await _context.Researchs.ToListAsync();
        }

        public async Task Update(DAFwebAPI.Entities.Research research)
        {
            try
            {

                var Research = _context.Researchs.Find(research.ID);

                Research.Author = research.Author;
                Research.Title = research.Title;
                Research.Description = research.Description;

                Research.AmharicAuthor = research.AmharicAuthor;
                Research.AmharicTitle = research.AmharicTitle;
                Research.AmharicDescription = research.AmharicDescription;
                Research.PublishedAt = research.PublishedAt;



                if (research.AutherImage != null)
                {
                    var image = research.AutherImage;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Research_upload_photo/"), research.ID.ToString() + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    Research.AuthorImagePath = "Assets/Research_upload_photo/" + research.ID + fileExtension;
                }

                if (research.ResearchFile != null)
                {
                    var image = research.ResearchFile;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Research_upload_photo/"), research.ID.ToString() + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    research.ResearchFilePath = "Assets/Research_upload_photo/" + research.ID + fileExtension;
                }

                _context.Researchs.Update(Research);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }


    }
}
