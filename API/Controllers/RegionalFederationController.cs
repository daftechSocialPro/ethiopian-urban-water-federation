using DAFwebAPI.Dtos;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using DAFwebAPI.Services;

using Microsoft.AspNetCore.Mvc;

namespace DAFwebAPI.Controllers
{
    [Route("api/regionalfederation")]
    [ApiController]
    public class RegionalFederationController : ControllerBase
    {

        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        private readonly IMailService _mailService;
        public RegionalFederationController(IUnitOfWork unitOfWork, 
            JwtService jwtService,
            IMailService mailService
            )
        {


            _unitofwork = unitOfWork;
            _jwtService = jwtService;
            _mailService = mailService;
        }
        [HttpGet]

        public async Task<List<RegionalWaterFederation>> GetAll()
        {


            return await _unitofwork.regionalFederationRepository.GetAll();
        }


        [HttpPost]


        public async Task<ActionResult> Post([FromForm] RegionalFederationDto region)
        {




            MailRequest request = new MailRequest
            {
                ToEmail = region.Email,
                Subject = "Credential",
                Body = "<h1>dear :</h1> " + region.Name + "you can log in 'https://localhost:8000' using <h1>username</h1>" + region.Email + " <h1>Password :</h1> " + region.Password

            };
            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);

                var user = new User
                {

                    ID = Guid.NewGuid(),
                    FullName = region.Name,
                    Email = region.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(region.Password),
                    UserType = UserType.RegionalFederation,
                    IsActive = true,
                    createdAt = DateTime.UtcNow,
                    createdBy = userId

                };


               //await _mailService.SendEmailAsync(request);

                RegionalWaterFederation regionalWater = new RegionalWaterFederation();

                regionalWater.Name = region.Name;
                regionalWater.Email = region.Email;
                regionalWater.Phone= region.Phone;
                regionalWater.Description= region.Description;
                regionalWater.RegionId= region.RegionId;
                regionalWater.Photo = region.Photo;
                regionalWater.ID = Guid.NewGuid();
                regionalWater.createdAt = DateTime.UtcNow;
                regionalWater.createdBy = userId;
                regionalWater.UserId = user.ID;

                _unitofwork.userRepository.Create(user);
                await _unitofwork.regionalFederationRepository.Create(regionalWater);
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
        public async Task<ActionResult> Update([FromForm] RegionalWaterFederation region)
        {

            try
            {

                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);


                region.createdBy = userId;


                await _unitofwork.regionalFederationRepository.Update(region);
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
