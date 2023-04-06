using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using SDGAV.Services;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersFavoriteController: Controller
    {
        private readonly sdgav_2Context _context;

        public UsersFavoriteController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<UsersFavorite> GetUsersFavorites()
        {
            return _context.UsersFavorites.ToList();
        }

        [HttpGet("{id}")]
        public UsersFavorite GetUsersFavoritebyId(int id)
        {
            var usersFavorite = _context.UsersFavorites.Find(id);

            if(usersFavorite == null)
            {
                return new UsersFavorite();
            }

            return usersFavorite;
        }

        [HttpPost]
        public IActionResult Insert(UsersFavorite usersFavorite)
        {

            _context.Add(usersFavorite);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(UsersFavorite usersFavorite, int id)
        {
            _context.Entry(usersFavorite).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var usersFavorite = _context.UsersFavorites.Find(id);

           if(usersFavorite == null)
           {
            return BadRequest();
           }

            _context.UsersFavorites.Remove(usersFavorite);
            _context.SaveChanges();
            return Ok();
        }
    }
}