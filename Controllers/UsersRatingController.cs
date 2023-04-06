using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersRatingController: Controller
    {
        private readonly sdgav_2Context _context;

        public UsersRatingController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<UsersRating> GetUsersRatings()
        {
            return _context.UsersRatings.ToList();
        }

        [HttpGet("{id}")]
        public UsersRating GetUsersRatingbyId(int id)
        {
            var usersRating = _context.UsersRatings.Find(id);

            if(usersRating == null)
            {
                return new UsersRating();
            }

            return usersRating;
        }

        [HttpPost]
        public IActionResult Insert(UsersRating usersRating)
        {

            _context.Add(usersRating);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(UsersRating usersRating, int id)
        {
            _context.Entry(usersRating).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var usersRating = _context.UsersRatings.Find(id);

           if(usersRating == null)
           {
            return BadRequest();
           }

            _context.UsersRatings.Remove(usersRating);
            _context.SaveChanges();
            return Ok();
        }
    }
}