using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttributeController: Controller
    {
        private readonly sdgav_2Context _context;

        public AttributeController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Models.Attribute> GetAttributes()
        {
            return _context.Attributes.ToList();
        }

        [HttpGet("{id}")]
        public Models.Attribute GetAttributebyId(int id)
        {
            var attribute = _context.Attributes.Find(id);

            if(attribute == null)
            {
                return new Models.Attribute();
            }

            return attribute;
        }

        [HttpPost]
        public IActionResult Insert(Models.Attribute attribute)
        {

            _context.Add(attribute);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Models.Attribute attribute, int id)
        {
            _context.Entry(attribute).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var attribute = _context.Attributes.Find(id);

           if(attribute == null)
           {
            return BadRequest();
           }

            _context.Attributes.Remove(attribute);
            _context.SaveChanges();
            return Ok();
        }
    }
}