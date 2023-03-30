using Microsoft.EntityFrameworkCore;
using SDGAV.Models;
using SDGAV.Models.DTO;
using SDGAV.interfaces;

namespace SDGAV.Services
{
    public class UserServices : IUser
    {
        private readonly SDGAVContext _context;

        public UserServices(SDGAVContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserDataDTO>> getUsersInfo()
        {
            var rawUsers = await _context.Users.ToListAsync();

            var Users = from u in rawUsers
                        select new UserDataDTO()
                        {
                            Id = u.Id,
                            Nombre = u.Nombre,
                            Username = u.Username,
                            Email = u.Email,
                            Phone = u.Phone,
                            Rol = u.Rol
                        };

            return Users;
        }

        public async Task<UserDataDTO> GetUser(int id)
        {
            var rawUser = await _context.Users.FindAsync(id);

            var user = await _context.Users.Select(u =>
            new UserDataDTO()
            {
                Id = u.Id,
                Nombre = u.Nombre,
                Username = u.Username,
                Email = u.Email,
                Phone = u.Phone,
                Rol = u.Rol
            }).SingleOrDefaultAsync(u => u.Id == id);
            if(user is null)
            {
                return new UserDataDTO();
            }
            return user;

        }


        public async Task<bool> Insert(UserDataDTO data)
        {
            try
            {
                var inserting = await _context.AddAsync(data);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public async Task<bool> Update(int id, UserDataDTO userData)
        {
            try
            {
                _context.Entry(userData).State = EntityState.Modified;
                _context.SaveChanges();
                return true;
            }
            catch (HttpRequestException e)
            {      
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}