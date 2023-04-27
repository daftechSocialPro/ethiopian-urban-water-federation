using DAFwebAPI.Data;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services.News
{
    public class NewsRepository : INewsRepository
    {

        private readonly ApplicationDbContext _context;


        public NewsRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<DAFwebAPI.Entities.News>> getAll(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return await _context.News.Include(x => x.WaterFederation).OrderByDescending(x => x.createdAt).Where(x => x.isApproved).ToListAsync();
            }
            else
            {
                var user = _context.Users.Find(userId);
                if (user != null && user.UserType == Entities.UserType.WaterFederation)
                {
                    return await _context.News.Include(x => x.WaterFederation).OrderByDescending(x => x.createdAt).ToListAsync();
                }
                else
                {
                    return await _context.News.Include(x => x.WaterFederation).OrderByDescending(x => x.createdAt).Where(x=>x.WaterFederationId == userId).ToListAsync();
                }
            }
      








        }
        public async Task Create(DAFwebAPI.Entities.News news)
        {
            try
            {





                if (news.Photo != null)
                {

                    var image = news.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/News_upload_photo/"), news.ID.ToString() + fileExtension);
                    await image.SaveAsAsync(savingPath);
                    news.Img = "Assets/News_upload_photo/" + news.ID + fileExtension;

                }



                await _context.AddAsync(news);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Update(DAFwebAPI.Entities.News news)
        {
            try
            {
                var newss = _context.News.Find(news.ID);

                if (newss != null)
                {
                    newss.Title = news.Title;
                    newss.SubTitle = news.SubTitle;
                    newss.Description = news.Description;
                    newss.isApproved = news.isApproved;
                    newss.updatedAt = DateTime.UtcNow;

                    if (news.Photo != null)
                    {
                        var image = news.Photo;
                        var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                        var fileExtension = photoinfo.Extension;
                        var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/News_upload_photo/"), news.ID.ToString() + fileExtension);

                        if (File.Exists(savingPath))
                        {
                            File.Delete(savingPath);
                        }

                        await image.SaveAsAsync(savingPath);
                        newss.Img = "Assets/News_upload_photo/" + news.ID + fileExtension;
                    }

                    _context.News.Update(newss);
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
