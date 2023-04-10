using DAFwebAPI.Data;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services.Questioner
{
    public class QuestionerRepository : IQuestionerRepostitory
    {
        private readonly ApplicationDbContext _context;


        public QuestionerRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<DAFwebAPI.Entities.Questioner>> GetAll()
        {

            List<DAFwebAPI.Entities.Questioner> questioners = await _context.Questioners.ToListAsync();

            return questioners;
        }
        public async Task<List<DAFwebAPI.Entities.Questioner>> GetByUserId(Guid userId)
        {

            var user = await _context.Users.FindAsync(userId);
            List<DAFwebAPI.Entities.Questioner> questioners = await _context.Questioners.Where(x => x.ForWhom == user.UserType && x.Status == DAFwebAPI.Entities.QuestionerStatus.Active).ToListAsync();

            return questioners;
        }





        public async Task Create(DAFwebAPI.Entities.Questioner questioner)
        {
            try
            {
                await _context.AddAsync(questioner);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<List<DAFwebAPI.Entities.Answer>>  IsQuestionerSubmitted(Guid userId, Guid QuestionerId)
        {

            try
            {
                var user = _context.Users.Find(userId);
                var answers = new List<DAFwebAPI.Entities.Answer>();

                if (user.UserType == UserType.RegionalFederation )
                {

                    var RegionalFedId = _context.RegionalWaterFederations.Where(x => x.UserId == userId).FirstOrDefault().ID;
                    var answer = _context.Answers.Include(x=>x.RegionalWaterFederation).Include(x=>x.Questioner).Include(x=>x.Questions).Where(x=>x.QuestionerId==QuestionerId && x.RegionalWaterFederationId==RegionalFedId).ToList();

                    answers = answer;
                }
                if (user.UserType == UserType.WaterFederation)
                {
                    var WaterUtilityId = _context.waterUtilities.Where(x => x.UserId == userId).FirstOrDefault().ID;
              
                    var answer = _context.Answers.Include(x => x.WaterUtility).Include(x => x.Questioner).Include(x => x.Questions).Where(x => x.QuestionerId == QuestionerId && x.WaterUtilityId == WaterUtilityId).ToList();

                    answers = answer;
                }


               return answers;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


        }
        public async Task Update(DAFwebAPI.Entities.Questioner questioner)
        {
            try
            {

                var questioner1 = _context.Questioners.Find(questioner.ID);

                questioner1.title = questioner.title;
                questioner1.ForWhom = questioner.ForWhom;
                questioner1.SubmittedDate = questioner.SubmittedDate;
                questioner1.Status = questioner.Status;

                _context.Questioners.Update(questioner1);
                await _context.SaveChangesAsync();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }

    }
}
