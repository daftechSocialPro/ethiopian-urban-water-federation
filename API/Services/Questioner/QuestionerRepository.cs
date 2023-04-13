using DAFwebAPI.Data;
using DAFwebAPI.Dtos;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using DAFwebAPI.Migrations;
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


        public List<GetAnswersDto>  IsQuestionerSubmitted(Guid userId, Guid QuestionerId)
        {

            try
            {
                var user = _context.Users.Find(userId);

                List<GetAnswersDto> result = new List<GetAnswersDto>();
                if (user.UserType == UserType.RegionalFederation )
                {

                    var RegionalFedId = _context.RegionalWaterFederations.Where(x => x.UserId == userId).FirstOrDefault().ID;
                    var query = from us in _context.RegionalWaterFederations.Where(x=>x.ID== RegionalFedId)
                                join an in _context.Answers on us.ID equals an.RegionalWaterFederationId
                                join question in _context.Questions on an.QuestionsId equals question.ID
                                where question.QuestionerId == QuestionerId
                                select new { RegionalWaterFederation = us, Answer = an, Question = question };

                    var groupedQuery = (query.AsEnumerable()
                                            .GroupBy(x => x.RegionalWaterFederation)
                                            .Select(g => new GetAnswersDto
                                            {
                                                Name = g.Key.Name,
                                                Answers = g.Select(x => new QuestionAnswerDto
                                                {
                                                    QuestionId = x.Question.ID,
                                                    Question = x.Question.Question,
                                                    AnswerId = x.Answer.ID,
                                                    Answer = x.Answer.Answers
                                                }).ToList()
                                            })).ToList();

             
                    return groupedQuery;
                }
                if (user.UserType == UserType.WaterUtility)
                {

                    var waterutilId = _context.waterUtilities.Where(x => x.UserId == userId).FirstOrDefault().ID;
                    var query = from us in _context.waterUtilities.Where(x=>x.ID== waterutilId)
                                join an in _context.Answers on us.ID equals an.WaterUtilityId
                                join question in _context.Questions on an.QuestionsId equals question.ID
                                where question.QuestionerId == QuestionerId
                                select new { RegionalWaterFederation = us, Answer = an, Question = question };

                    var groupedQuery = (query.AsEnumerable()
                                            .GroupBy(x => x.RegionalWaterFederation)
                                            .Select(g => new GetAnswersDto
                                            {
                                                Name = g.Key.Name,
                                                Answers = g.Select(x => new QuestionAnswerDto
                                                {
                                                    QuestionId = x.Question.ID,
                                                    Question = x.Question.Question,
                                                    AnswerId = x.Answer.ID,
                                                    Answer = x.Answer.Answers
                                                }).ToList()
                                            })).ToList();

                    return groupedQuery;
                }
                if (user.UserType == UserType.WaterFederation)
                {

                    var questioneeer = _context.Questioners.Find(QuestionerId);

                    if (questioneeer != null && questioneeer.ForWhom == UserType.RegionalFederation)
                    {

                        var query = from us in _context.RegionalWaterFederations
                                    join an in _context.Answers on us.ID equals an.RegionalWaterFederationId
                                    join question in _context.Questions on an.QuestionsId equals question.ID
                                    where question.QuestionerId == QuestionerId
                                    select new { RegionalWaterFederation = us, Answer = an, Question = question };

                        var groupedQuery = (query.AsEnumerable()
                                                .GroupBy(x => x.RegionalWaterFederation)
                                                .Select(g => new GetAnswersDto
                                                {
                                                    Name = g.Key.Name,
                                                    Answers = g.Select(x => new QuestionAnswerDto
                                                    {
                                                        QuestionId = x.Question.ID,
                                                        Question = x.Question.Question,
                                                        AnswerId = x.Answer.ID,
                                                        Answer = x.Answer.Answers
                                                    }).ToList()
                                                })).ToList();

                        return groupedQuery;
                    }
                    if (questioneeer != null && questioneeer.ForWhom == UserType.WaterUtility)
                    {

                        var query = from us in _context.waterUtilities
                                    join an in _context.Answers on us.ID equals an.WaterUtilityId
                                    join question in _context.Questions on an.QuestionsId equals question.ID
                                    where question.QuestionerId == QuestionerId
                                    select new { RegionalWaterFederation = us, Answer = an, Question = question };

                        var groupedQuery = (query.AsEnumerable()
                                                .GroupBy(x => x.RegionalWaterFederation)
                                                .Select(g => new GetAnswersDto
                                                {
                                                    Name = g.Key.Name,
                                                    Answers = g.Select(x => new QuestionAnswerDto
                                                    {
                                                        QuestionId = x.Question.ID,
                                                        Question = x.Question.Question,
                                                        AnswerId = x.Answer.ID,
                                                        Answer = x.Answer.Answers
                                                    }).ToList()
                                                })).ToList();

                        return groupedQuery;

                    }




                }



                return result;
              
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
