using DAFwebAPI.Data;
using DAFwebAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services.Question
{
    public class QuestionRepository : IQuestionRepository
    {

        private readonly ApplicationDbContext _context;


        public QuestionRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<DAFwebAPI.Entities.Questions>> GetAll(Guid questionerId)
        {

            List<DAFwebAPI.Entities.Questions> questioners = await _context.Questions.Where(x => x.QuestionerId == questionerId).Include(x => x.Questioner).ToListAsync();

            return questioners;
        }
        public async Task Create(DAFwebAPI.Entities.Questions questions)
        {
            try
            {
                await _context.AddAsync(questions);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task SubmitAnswer(DAFwebAPI.Entities.Answer answer)
        {
            try
            {
                await _context.Answers.AddAsync(answer);
                 await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task Update(DAFwebAPI.Entities.Questions questions)
        {
            try
            {

                var questions1 = _context.Questions.Find(questions.ID);

                questions1.Question = questions.Question;
                questions1.AnswerType = questions.AnswerType;
                questions1.IncludeReport = questions.IncludeReport;
                questions1.IncludeDashboard = questions.IncludeDashboard;
                questions1.QuestionerId = questions.QuestionerId;
                questions1.NumberOfRows = questions.NumberOfRows;


                _context.Questions.Update(questions1);
                await _context.SaveChangesAsync();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }
    }
}
