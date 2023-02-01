using DAFwebAPI.Dtos;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using DAFwebAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DAFwebAPI.Controllers
{
    [Route("api/waterutility")]
    [ApiController]
    public class WaterUtilityController : ControllerBase
    {


        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        private readonly IMailService _mailService;
        public WaterUtilityController(IUnitOfWork unitOfWork, JwtService jwtService,
            IMailService mailService)
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;
            _mailService = mailService;


        }
        [HttpGet]

        public async Task<List<WaterUtility>> GetAll()
        {


            return await _unitofwork.waterUtilityRepository.GetAll();
        }

        [HttpGet("GetByRegional")]

        public async Task<List<WaterUtility>> GetAll(Guid regionalId)
        {


            return await _unitofwork.waterUtilityRepository.GetAll();
        }


        [HttpPost]


        public async Task<ActionResult> Post([FromForm] WaterUtilityDto waterUtility)
        {
            MailRequest request = new MailRequest
            {
                ToEmail = waterUtility.Email,
                Subject = "Credential",
                Body = "<h1>dear :</h1> " + waterUtility.Name + "you can log in 'https://localhost:8000' using <h1>username</h1>" + waterUtility.Email + " <h1>Password :</h1> " + waterUtility.Password

            };
            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);

                var user = new User
                {

                    ID = Guid.NewGuid(),
                    FullName = waterUtility.Name,
                    Email = waterUtility.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(waterUtility.Password),
                    UserType = UserType.WaterUtility,
                    IsActive = true,
                    createdAt = DateTime.UtcNow,
                    createdBy = userId

                };


                  //await _mailService.SendEmailAsync(request);

                WaterUtility regionalWater = new WaterUtility();

                regionalWater.Name = waterUtility.Name;
                regionalWater.Email = waterUtility.Email;
                regionalWater.Phone = waterUtility.Phone;
                regionalWater.Description = waterUtility.Description;
                regionalWater.RegionalWaterFederationId = waterUtility.regionalWaterFederationId;
                regionalWater.Photo = waterUtility.Photo;
                regionalWater.ID = Guid.NewGuid();
                regionalWater.createdAt = DateTime.UtcNow;
                regionalWater.createdBy = userId;
                regionalWater.UserId = user.ID;

                _unitofwork.userRepository.Create(user);

                await _unitofwork.waterUtilityRepository.Create(regionalWater);
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
        public async Task<ActionResult> Update([FromForm] WaterUtility waterUtility)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                waterUtility.createdBy = userId;


                await _unitofwork.waterUtilityRepository.Update(waterUtility);
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
