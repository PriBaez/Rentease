using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OfferController: Controller
    {
        private readonly sdgav_2Context _context;

        public OfferController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Models.Offer> GetOffers()
        {
            return _context.Offers.ToList();
        }

        [HttpGet("{id}")]
        public Models.Offer GetOfferbyId(int id)
        {
            var offer = _context.Offers.Find(id);

            if(offer == null)
            {
                return new Models.Offer();
            }

            return offer;
        }

        [HttpPost]
        public IActionResult Insert(Models.Offer Offer)
        {

            _context.Add(Offer);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Models.Offer offer, int id)
        {
            _context.Entry(offer).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var offer = _context.Offers.Find(id);

           if(offer == null)
           {
            return BadRequest();
           }

            _context.Offers.Remove(offer);
            _context.SaveChanges();
            return Ok();
        }
    }
}