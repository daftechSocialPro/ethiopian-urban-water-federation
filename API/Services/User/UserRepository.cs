using DAFwebAPI.Entities;
using DAFwebAPI.Data;
using DAFwebAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services
{



    public class UserRepository : IUserRepository
    {

        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context)
        {

            _context = context;
        }

        public User Create(User user)
        {


            _context.Users.Add(user);
            _context.SaveChanges();

            return user;

        }

        public User GetByEmail(string email)
        {


            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User GetById(Guid id)
        {

            return _context.Users.Find(id);
        }

   


    }

  
}