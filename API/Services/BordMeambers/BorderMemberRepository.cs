using DAFwebAPI.Data;
using DAFwebAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services
{
    public class BorderMemberRepository : IBorderMemberRepository
    {
        private readonly ApplicationDbContext _context;
        public BorderMemberRepository(ApplicationDbContext context)
        {
            _context = context;


        }


        public async Task Create(DAFwebAPI.Entities.BoardMember member)
        {
            try
            {

                if (member.Photo != null)
                {
                    var image = member.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/member_upload_photo/"), member.ID.ToString() + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    member.UserPhoto = "Assets/member_upload_photo/" + member.ID + fileExtension;
                }


                await _context.AddAsync(member);


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public async Task<List<DAFwebAPI.Entities.BoardMember>> GetAll()
        {



            return await _context.BoardMembers.Include(x => x.WaterFederation).ToListAsync();
        }

        public async Task Update(DAFwebAPI.Entities.BoardMember member)
        {
            try
            {

                var bordMember = _context.BoardMembers.Find(member.ID);

                bordMember.Name = member.Name;
                bordMember.Position = member.Position;
                bordMember.BirthDate = member.BirthDate;
               
                bordMember.Description = member.Description;
                bordMember.IsActive = member.IsActive;


                if (member.Photo != null)
                {
                    var image = member.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/member_upload_photo/"), member.ID.ToString() + fileExtension);

                    if (File.Exists(savingPath))
                    {
                        File.Delete(savingPath);
                    }

                    await image.SaveAsAsync(savingPath);
                    bordMember.UserPhoto = "Assets/member_upload_photo/" + member.ID + fileExtension;
                }


                _context.BoardMembers.Update(bordMember);
                _context.SaveChanges();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }



    }
}
