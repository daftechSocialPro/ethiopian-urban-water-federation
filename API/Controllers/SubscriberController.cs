using DAFwebAPI.Dtos;
using DAFwebAPI.Helpers;
using DAFwebAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DAFwebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriberController : ControllerBase

    {
        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;
        public SubscriberController(JwtService jwtService , IUnitOfWork unitOfWork) { 
           _unitofwork= unitOfWork;
            _jwtService = jwtService;
        }   
        [HttpPost]
        public async Task<ActionResult> Post( SubscriberDto subscriberDto)
        {

            try
            {

               

                var subscriber = new DAFwebAPI.Entities.Subscriber
                {
                    ID = Guid.NewGuid(),
                    Email = subscriberDto.Email,
                    createdAt = DateTime.UtcNow,
                    

                };

              
                return Ok(await _unitofwork.subscriberService.Subscribe(subscriber));




            }
            catch
            {
                return Unauthorized();
            }

            

            return NoContent();



        }

        [HttpGet]

        public async Task<List<SubscriberDto>> GetAll()
        {
           return await  _unitofwork.subscriberService.GetAll();

        }
    }
}
