using DAFwebAPI.Data;
using DAFwebAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DAFwebAPI.Services.Contact
{
    public class ContactRepository : IContactRepository
    {

        private readonly ApplicationDbContext _context;


        public ContactRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<DAFwebAPI.Entities.Contact>> getAll()
        {

            List<DAFwebAPI.Entities.Contact> contacts = await _context.Contacts.ToListAsync();

            return contacts;
        }
        public async Task Create(DAFwebAPI.Entities.Contact contact)
        {
            try
            {
                await _context.AddAsync(contact);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


    }
}
