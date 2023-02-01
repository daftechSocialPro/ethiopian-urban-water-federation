using DAFwebAPI.Data;
using DAFwebAPI.Dtos;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using DAFwebAPI.Migrations;
using DAFwebAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace DAFwebAPI.Controllers
{
    [Route("api/question")]
    [ApiController]
    public class QuestionController : ControllerBase
    {


        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        private readonly ApplicationDbContext _context;
        public QuestionController(IUnitOfWork unitOfWork, JwtService jwtService,ApplicationDbContext context)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;
            _context = context;


        }
        [HttpGet]

        public async Task<List<Questions>> GetAll(Guid questionerId)
        {


            return await _unitofwork.questionRepository.GetAll(questionerId);
        }
        [HttpPost("submitanswer")]
        public async Task<ActionResult> SubmitAnswer( string answers)
        {

            try
            {
                

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                JArray jsonArray = JArray.Parse(answers);
                var Answers = jsonArray.ToObject<List<AnswerDto>>();


                foreach ( var item in Answers )
                {

                    var Answer = new Answer
                    {
                        ID=Guid.NewGuid(),
                        createdAt=DateTime.UtcNow,
                        createdBy =userId,
                        QuestionerId = item.QuestionerId,
                        QuestionsId= item.QuestionId,
                        Answers= item.Answers  
                        
                        

                    };


                    var user = _unitofwork.userRepository.GetById(userId);

                    if (user.UserType == UserType.RegionalFederation)
                    {
                        var RegionalFedId =  _context.RegionalWaterFederations.Where(x => x.UserId== userId).FirstOrDefault().ID;
                        Answer.RegionalWaterFederationId = RegionalFedId;
                    }

                    if (user.UserType == UserType.WaterUtility)
                    {
                        var WaterUtilityId =   _context.waterUtilities.Where(x => x.UserId == userId).FirstOrDefault().ID;
                        Answer.WaterUtilityId = WaterUtilityId;
                    }

                    await _unitofwork.questionRepository.SubmitAnswer(Answer);

                }



                //questions.ID = Guid.NewGuid();
                //questions.createdAt = DateTime.UtcNow;
                //questions.createdBy = userId;


                //await _unitofwork.questionRepository.SubmitAnswer(questions);
                //await _unitofwork.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }


        [HttpPost]


        public async Task<ActionResult> Post([FromForm] Questions questions)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                questions.ID = Guid.NewGuid();
                questions.createdAt = DateTime.UtcNow;
                questions.createdBy = userId;


                await _unitofwork.questionRepository.Create(questions);
                await _unitofwork.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }

        [HttpPut]
        public async Task<ActionResult> Update([FromForm] Questions questions)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                questions.createdBy = userId;


                await _unitofwork.questionRepository.Update(questions);
                //await _unitofwork.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();





        }

    }
}
