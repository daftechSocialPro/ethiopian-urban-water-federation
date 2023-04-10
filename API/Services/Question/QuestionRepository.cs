using DAFwebAPI.Data;
using DAFwebAPI.Dtos;
using DAFwebAPI.Entities;
using DAFwebAPI.Migrations;
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


        public async Task<List<QuestionDto>> GetAll(Guid questionerId)
        {

            List<QuestionDto> questioners = await _context.Questions.Where(x => x.QuestionerId == questionerId).Include(x => x.Questioner).Select(
                x=> new QuestionDto
                {
                    ID = x.ID,
                    AnswerType = x.AnswerType,
                    createdAt = x.createdAt,
                    createdBy = x.createdBy,
                    QuestionerId = x.QuestionerId,
                    Question = x.Question,
                    IncludeDashboard = x.IncludeDashboard,
                    IncludeReport = x.IncludeReport,
                    NumberOfChoise = x.NumberOfChoise,
                    NumberOfRows= x.NumberOfRows,
             
                    Choices =x.NumberOfChoise>0? _context.Choices.Where(c => c.QuestionId == x.ID).Select(x=>x.Choice).ToList() : new List<string>()
                }).ToListAsync();

            return questioners;
        }
        public async Task Create(QuestionDto questions)
        {
            try
            {


                Questions questions1 = new Questions
                {
                    ID = questions.ID,
                    AnswerType = questions.AnswerType,
                    createdAt = DateTime.Now,
                    createdBy = questions.createdBy,
                    QuestionerId = questions.QuestionerId,
                    Question = questions.Question,
                    IncludeDashboard = questions.IncludeDashboard,
                    IncludeReport = questions.IncludeReport,
                    NumberOfRows = questions.NumberOfRows,
                    NumberOfChoise = questions.Choices != null ? questions.Choices.Count() : 0
                    

                };

                await _context.Questions.AddAsync(questions1);

                if (questions.Choices != null)
                {
                    foreach (var choice in questions.Choices)
                    {

                        var choice1 = new Choices
                        {
                            ID = Guid.NewGuid(),
                            createdAt = DateTime.Now,
                            createdBy = questions.createdBy,
                            Choice = choice,
                            QuestionId = questions1.ID
                        };

                        await _context.Choices.AddAsync(choice1);




                    }
                }


                await _context.SaveChangesAsync();


                //await _context.SaveChangesAsync();
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
        public async Task Update(QuestionDto questions)
        {
            try
            {


                var questions1 = _context.Questions.Find(questions.ID);
                var oldChoices = _context.Choices.Where(x => x.QuestionId == questions1.ID).ToList();
                _context.RemoveRange(oldChoices);
                _context.SaveChanges();

                questions1.Question = questions.Question;
                questions1.AnswerType = questions.AnswerType;
                questions1.IncludeReport = questions.IncludeReport;
                questions1.IncludeDashboard = questions.IncludeDashboard;
                questions1.QuestionerId = questions.QuestionerId;
                questions1.NumberOfRows = questions.NumberOfRows;
                questions1.NumberOfChoise = questions.Choices != null ? questions.Choices.Count() : 0;
                _context.Questions.Update(questions1);
                await _context.SaveChangesAsync();

                if (questions.Choices != null) { 
                foreach (var choice in questions.Choices)
                {

                    var choice1 = new Choices
                    {
                        ID = Guid.NewGuid(),
                        createdAt = DateTime.Now,
                        createdBy = questions.createdBy,
                        Choice = choice,
                        QuestionId = questions.ID
                    };

                     _context.Choices.Add(choice1);
                     _context.SaveChanges();



                }
            }

               

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }




        }
    }
}
