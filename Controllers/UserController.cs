using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using SDGAV.Services;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController: Controller
    {
        private readonly sdgav_2Context _context;
        private readonly AuthService _auth;

        public UserController(sdgav_2Context context, AuthService auth)
        {
            _context = context;
            _auth = auth;
        }

        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        [HttpGet("{id}")]
        public User GetUserbyId(int id)
        {
            var user = _context.Users.Find(id);

            if(user == null)
            {
                return new User();
            }

            return user;
        }

        [HttpPost]
        public IActionResult Insert(User user)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                string hash = EncryptService.encryptPassword(md5Hash, user.Pwd);
                user.Pwd = hash;
            }
            
            _context.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult Update(User user, int id)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                string hash = EncryptService.encryptPassword(md5Hash, user.Pwd);
                user.Pwd = hash;
            }
            
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var user = _context.Users.Find(id);

           if(user == null)
           {
            return BadRequest();
           }

            _context.Users.Remove(user);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("login")]
        public IActionResult Login(UserDTO credentials)
        {
            var isValid = _auth.CheckCredentials(credentials);

            if(isValid.Count() == 0)
            {
                return Unauthorized();
            } else {
                return Ok();
            }
            
        }
    }
}