using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OffersAcceptedController: Controller
    {
        private readonly sdgav_2Context _context;

        public OffersAcceptedController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<OffersAccepted> GetOffersAccepteds()
        {
            return _context.OffersAccepteds.ToList();
        }

        [HttpGet("{id}")]
        public OffersAccepted GetOffersAcceptedbyId(int id)
        {
            var OffersAccepted = _context.OffersAccepteds.Find(id);

            if(OffersAccepted == null)
            {
                return new OffersAccepted();
            }

            return OffersAccepted;
        }

        [HttpPost]
        public IActionResult Insert(OffersAccepted OffersAccepted)
        {

            _context.Add(OffersAccepted);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(OffersAccepted OffersAccepted, int id)
        {
            _context.Entry(OffersAccepted).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var OffersAccepted = _context.OffersAccepteds.Find(id);

           if(OffersAccepted == null)
           {
            return BadRequest();
           }

            _context.OffersAccepteds.Remove(OffersAccepted);
            _context.SaveChanges();
            return Ok();
        }
    }
}