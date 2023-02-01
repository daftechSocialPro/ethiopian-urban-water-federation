using DAFwebAPI.Data;
using DAFwebAPI.Helpers;
using DAFwebAPI.Migrations;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services.Forum
{
    public class ForumRepository : IForumRepository
    {
        private readonly ApplicationDbContext _context;


        public ForumRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<DAFwebAPI.Entities.Forum>> getAll()
        {

            List<DAFwebAPI.Entities.Forum> forums = await _context.Forums.Include(x => x.WaterFederation).OrderByDescending(x => x.createdAt).ToListAsync();




            return forums;
        }
        public async Task Create(DAFwebAPI.Entities.Forum forum)
        {
            try
            {





                if (forum.Photo != null)
                {

                    var image = forum.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Forum_upload_photo/"), forum.ID.ToString() + fileExtension);
                    await image.SaveAsAsync(savingPath);
                    forum.Img = "Assets/Forum_upload_photo/" + forum.ID + fileExtension;

                }



                await _context.Forums.AddAsync(forum);
             
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Update(DAFwebAPI.Entities.Forum forum)
        {
            try
            {
                var forums = _context.Forums.Find(forum.ID);

                if (forum != null)
                {
                    forums.Title = forum.Title;
                    forums.AmharicDescription = forum.AmharicDescription;
                    forums.Description = forum.Description;
                    forums.IsForumEvent = forum.IsForumEvent;

                    forums.Description = forum.Description;
                    forums.updatedAt = DateTime.UtcNow;

                    if (forum.Photo != null)
                    {
                        var image = forum.Photo;
                        var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                        var fileExtension = photoinfo.Extension;
                        var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Forum_upload_photo/"), forum.ID.ToString() + fileExtension);
                       
                        if (File.Exists(savingPath))
                        {
                            File.Delete(savingPath);
                        }

                        await image.SaveAsAsync(savingPath);
                        forums.Img = "Assets/Forum_upload_photo/" + forum.ID + fileExtension;
                    }

                    _context.Forums.Update(forums);
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
