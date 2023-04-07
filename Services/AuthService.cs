using System.Security.Cryptography;
using SDGAV.Models;

namespace SDGAV.Services
{
    public class AuthService 
    {
        private readonly sdgav_2Context _context;

        public AuthService(sdgav_2Context context)
        {
            _context = context;
        }

        public IQueryable<User> CheckCredentials(UserDTO credential)
        {
            string PwdHash;
            using (MD5 md5Hash = MD5.Create())
            {
                string hash = EncryptService.encryptPassword(md5Hash, credential.Pwd);
                PwdHash = hash;
            }

            var userFound = _context.Users.Where(u => u.Email == credential.Email && u.Pwd == PwdHash);

            return userFound;
        }
        
    }
}