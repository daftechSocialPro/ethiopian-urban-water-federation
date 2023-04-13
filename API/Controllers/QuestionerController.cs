using DAFwebAPI.Dtos;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using DAFwebAPI.Migrations;
using DAFwebAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DAFwebAPI.Controllers
{
    [Route("api/questioner")]
    [ApiController]
    public class QuestionerController : ControllerBase
    {

        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public QuestionerController(IUnitOfWork unitOfWork, JwtService jwtService)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;


        }
        [HttpGet]

        public async Task<List<Questioner>> GetAll()
        {


            return await _unitofwork.questionerRepostitory.GetAll();
        }

        [HttpGet("snswers")]

        public  List<GetAnswersDto> GetAnswers(Guid questionerId)
        {


            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.verify(jwt);
            Guid userId = Guid.Parse(token.Issuer);






            return  _unitofwork.questionerRepostitory.IsQuestionerSubmitted(userId, questionerId);
        }



        [HttpGet("GetByUserId")]
        public async Task<List<Questioner>> GetByUserId(Guid userId)
        {


            return await _unitofwork.questionerRepostitory.GetByUserId(userId);
        }


        [HttpPost]


        public async Task<ActionResult> Post([FromForm] Questioner questioner)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                questioner.ID = Guid.NewGuid();
                questioner.createdAt = DateTime.UtcNow;
                questioner.createdBy = userId;


                await _unitofwork.questionerRepostitory.Create(questioner);
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
        public async Task<ActionResult> Update([FromForm] Questioner questioner)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                questioner.createdBy = userId;


                await _unitofwork.questionerRepostitory.Update(questioner);
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
