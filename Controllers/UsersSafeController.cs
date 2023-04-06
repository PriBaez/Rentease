using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersSafeController: Controller
    {
        private readonly sdgav_2Context _context;

        public UsersSafeController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<UsersSafe> GetUsersSafes()
        {
            return _context.UsersSaves.ToList();
        }

        [HttpGet("{id}")]
        public UsersSafe GetUsersSafebyId(int id)
        {
            var usersSafe = _context.UsersSaves.Find(id);

            if(usersSafe == null)
            {
                return new UsersSafe();
            }

            return usersSafe;
        }

        [HttpPost]
        public IActionResult Insert(UsersSafe usersSafe)
        {

            _context.Add(usersSafe);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(UsersSafe usersSafe, int id)
        {
            _context.Entry(usersSafe).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var usersSafe = _context.UsersSaves.Find(id);

           if(usersSafe == null)
           {
            return BadRequest();
           }

            _context.UsersSaves.Remove(usersSafe);
            _context.SaveChanges();
            return Ok();
        }
    }
}