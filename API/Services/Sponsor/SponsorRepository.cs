﻿using DAFwebAPI.Data;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using DAFwebAPI.Migrations;
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
                if (sponsor.Brocher != null)
                {
                    var image = sponsor.Brocher;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Brosher_file/"), sponsor.ID.ToString() + fileExtension);



                    await image.SaveAsAsync(savingPath);
                    sponsor.BrocherPath = "Assets/Brosher_file/" + sponsor.ID + fileExtension;
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
        public async Task<List<DAFwebAPI.Entities.Sponsor>> GetAllBYSupportTYpe(SupportType supportType)
        {



            return await _context.Sponsors.Where(x => x.SupportType == supportType).ToListAsync();
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
                sponsor1.SupportType= sponsor.SupportType;
                sponsor1.WebLink= sponsor.WebLink;


                if (sponsor.Photo != null)
                {
                    var image = sponsor.Photo;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Sponsor_upload_photo/"), sponsor.ID.ToString() + fileExtension);

                    await image.SaveAsAsync(savingPath);
                    sponsor1.Logo = "Assets/Sponsor_upload_photo/" + sponsor.ID + fileExtension;
                }
                if (sponsor.Brocher != null)
                {
                    var image = sponsor.Brocher;
                    var photoinfo = new FileInfo(Path.GetFileName(image.FileName));
                    var fileExtension = photoinfo.Extension;
                    var savingPath = Path.Combine(Path.GetDirectoryName("./Assets/Brosher_file/"), sponsor.ID.ToString() + fileExtension);

                    if (File.Exists(savingPath))
                    {
                        File.Delete(savingPath);
                    }

                    await image.SaveAsAsync(savingPath);
                    sponsor1.BrocherPath = "Assets/Brosher_file/" + sponsor.ID.ToString() + fileExtension;
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
