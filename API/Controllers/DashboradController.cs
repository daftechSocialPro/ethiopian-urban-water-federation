using DAFwebAPI.Dtos;
using DAFwebAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DAFwebAPI.Controllers
{
    [Route("api/dashborad")]
    [ApiController]
    public class DashboradController : ControllerBase
    {

       
            private readonly IUnitOfWork _unitOfWork;
            public DashboradController(IUnitOfWork unitOfWork)
            {

                _unitOfWork = unitOfWork;


            }
            [HttpGet]

            public DashboardDto GetAll()
            {


                return _unitOfWork.dashboradRepository.GetAll();
            }

        }
    
}
