using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SDGAV.Models;

namespace SDGAV
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRatingController: Controller
    {
        private readonly SDGAVContext _context;

        public UserRatingController(SDGAVContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<UserRating> GetAllRatings()
        {
            return _context.UserRatings.ToList();
        }

        [HttpGet("{id}")]
        public UserRating GetRatingsPerUser(int id)
        {
            var UserRating = _context.UserRatings.Find(id);

            if(UserRating != null)
            {
                return UserRating;
            }else
            {
                return new UserRating();
            }
            
        }

        [HttpPost]
        public IActionResult Insert(UserRating UserRating)
        {
            _context.UserRatings.Add(UserRating);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(UserRating UserRating, int id)
        {
            if(UserRating.RatingFrom != id) { return BadRequest(); }
            
            _context.Entry<UserRating>(UserRating).State = EntityState.Modified;
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var UserRating = _context.UserRatings.Find(id);

            if(UserRating != null)
            {
                _context.UserRatings.Remove(UserRating);
                return Ok();
            } else
            {
                return BadRequest();
            }

            
        }

    }
}