using DAFwebAPI.Dtos;
using DAFwebAPI.Entities;

namespace DAFwebAPI.Services
{
    public interface ISubscriberServices
    {
        public Task<string> Subscribe(Subscriber subscriber);

        public Task<List<SubscriberDto>> GetAll();
    }
}
