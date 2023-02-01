using DAFwebAPI.Data;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using DAFwebAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DAFwebAPI.Controllers
{
    [Route("api/forum")]
    [ApiController]
    public class ForumController : ControllerBase
    {

        private readonly ApplicationDbContext context;

        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;



        public ForumController(ApplicationDbContext context, IUnitOfWork unitofwork, JwtService jwtService)
        {
            this.context = context;
            _unitofwork = unitofwork;
            _jwtService = jwtService;

        }
        [HttpGet]
        public async Task<ActionResult<List<Forum>>> Get()
        {

            return await _unitofwork.forumRepository.getAll();

        }


        [HttpPost]
        public async Task<ActionResult> Post([FromForm] Forum Forum)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);
                var user = _unitofwork.userRepository.GetById(userId);

                Forum.ID = Guid.NewGuid();
               

                Forum.createdAt = DateTime.UtcNow;



                Forum.createdBy = userId;
                Forum.WaterFederationId = userId;




                await _unitofwork.forumRepository.Create(Forum);
                await _unitofwork.SaveChanges();




            }
            catch
            {


                return Unauthorized();
            }

            return NoContent();



        }

        [HttpPut]

        public async Task<ActionResult> Update([FromForm] Forum Forum)
        {


            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);

                await _unitofwork.forumRepository.Update(Forum);



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
