using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using DAFwebAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DAFwebAPI.Controllers
{
    [Route("api/research")]
    [ApiController]
    public class ResearchController : ControllerBase
    {


        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public ResearchController(IUnitOfWork unitOfWork, JwtService jwtService)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;


        }
        [HttpGet]

        public async Task<List<Research>> GetAll()
        {


            return await _unitofwork.reasearchRepository.GetAll();
        }


        [HttpPost]


        public async Task<ActionResult> Post([FromForm] Research research)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                research.ID = Guid.NewGuid();
                research.createdAt = DateTime.UtcNow;
                research.createdBy = userId;


                await _unitofwork.reasearchRepository.Create(research);
                
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Unauthorized();
            }

            return NoContent();



        }

        [HttpPut]
        public async Task<ActionResult> Update([FromForm] Research research)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                research.createdBy = userId;

                await _unitofwork.reasearchRepository.Update(research);
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
