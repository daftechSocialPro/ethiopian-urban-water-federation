using DAFwebAPI.Data;
using DAFwebAPI.Entities;
using DAFwebAPI.Helpers;
using DAFwebAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DAFwebAPI.Controllers
{
    [Route("api/contact")]
    [ApiController]
    public class ContactController : ControllerBase
    {

        private readonly ApplicationDbContext context;

        private readonly IUnitOfWork _unitofwork;
        private readonly JwtService _jwtService;



        public ContactController(ApplicationDbContext context, IUnitOfWork unitofwork, JwtService jwtService)
        {
            this.context = context;
            _unitofwork = unitofwork;
            _jwtService = jwtService;

        }
        [HttpGet]
        public async Task<ActionResult<List<Contact>>> Get()
        {

            return await _unitofwork.contactRepository.getAll();

        }


        [HttpPost]
        public async Task<ActionResult> Post([FromForm] Contact contact)
        {

            try
            {

                

                contact.ID = Guid.NewGuid();

                contact.createdAt = DateTime.UtcNow;

                await _unitofwork.contactRepository.Create(contact);
                await _unitofwork.SaveChanges();
            }
            catch
            {
                return Unauthorized();
            }

            return NoContent();



        }
    }
}
