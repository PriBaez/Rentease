using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController: Controller
    {
        private readonly sdgav_2Context _context;

        public PropertyController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Property> GetProperties()
        {
            return _context.Properties.Include(x => x.Seller).ToList();
        }

        [HttpGet("{id}")]
        public Property GetPropertybyId(int id)
        {
            var property = _context.Properties.Find(id);

            if(property == null)
            {
                return new Property();
            }

            return property;
        }

        [HttpPost]
        public IActionResult Insert(Property property)
        {

            _context.Add(property);
            _context.SaveChanges();
            return Ok(property.Id);
        }

        [HttpPut("{id}")]
        public IActionResult Update(Property property, int id)
        {
            _context.Entry(property).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var property = _context.Properties.Find(id);

           if(property == null)
           {
            return BadRequest();
           }

            _context.Properties.Remove(property);
            _context.SaveChanges();
            return Ok();
        }
    }
}