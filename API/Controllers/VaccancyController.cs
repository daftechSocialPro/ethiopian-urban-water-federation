using DAFwebAPI.Data;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using DAFwebAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace DAFwebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VaccancyController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;


        public VaccancyController(ApplicationDbContext context, IUnitOfWork unitofwork, JwtService jwtService)
        {
            this.context = context;
            _unitofwork = unitofwork;
            _jwtService = jwtService;
        }

        [HttpGet]

        public async Task<ActionResult<List<Vaccancy>>> Get()
        {
            Guid userId = Guid.NewGuid();
            var jwt = Request.Cookies["jwt"];
            if (jwt != null)
            {
                var token = _jwtService.verify(jwt);
                userId = Guid.Parse(token.Issuer);
            }
            else
            {
                 userId = Guid.Empty;
            }
            

            return await _unitofwork.vaccancyRepository.GetAll(userId);
        }

        [HttpPost]


        public async Task<ActionResult> Post([FromForm] Vaccancy vaccancy)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                vaccancy.ID = Guid.NewGuid();
                vaccancy.createdAt = DateTime.UtcNow;
                vaccancy.createdBy = userId;
                vaccancy.UserId = userId;


                await _unitofwork.vaccancyRepository.Create(vaccancy);
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
        public async Task<ActionResult> Update([FromForm] Vaccancy vaccancy)
        {


            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);

                await _unitofwork.vaccancyRepository.Update(vaccancy);



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
