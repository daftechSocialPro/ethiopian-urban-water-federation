using DAFwebAPI.Data;
using DAFwebAPI.Dtos;
using DAFwebAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services
{
    public class SubscriberService:ISubscriberServices
    {
        private readonly ApplicationDbContext _context;

        public SubscriberService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<string> Subscribe(Subscriber subscriber)
        {
            try
            {
              _context.Subscribers.Add(subscriber);
                _context.SaveChanges();
                return "Successfully Subscribed";

            }catch(Exception ex)
            {
                throw (ex);
                return ex.Message;
            }
        }

        public async Task<List<SubscriberDto>> GetAll()
        {
            return await _context.Subscribers.Select(x => new SubscriberDto
            {
                Email = x.Email,
                Id = x.ID
            }).ToListAsync();
        }
    }
}
