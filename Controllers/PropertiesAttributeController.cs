using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesAttributeController: Controller
    {
        private readonly sdgav_2Context _context;

        public PropertiesAttributeController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Models.PropertiesAttribute> GetPropertiesAttributes()
        {
            return _context.PropertiesAttributes.ToList();
        }

        [HttpGet("{id}")]
        public Models.PropertiesAttribute GetPropertiesAttributebyId(int id)
        {
            var Propertiesattribute = _context.PropertiesAttributes.Find(id);

            if(Propertiesattribute == null)
            {
                return new Models.PropertiesAttribute();
            }

            return Propertiesattribute;
        }

        [HttpPost]
        public IActionResult Insert(Models.PropertiesAttribute Propertiesattribute)
        {
            _context.Add(Propertiesattribute);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Models.PropertiesAttribute Propertiesattribute, int id)
        {
            _context.Entry(Propertiesattribute).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var Propertiesattribute = _context.PropertiesAttributes.Find(id);

           if(Propertiesattribute == null)
           {
            return BadRequest();
           }

            _context.PropertiesAttributes.Remove(Propertiesattribute);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("perProperty/{propertyId}")]
        public IEnumerable<PropertiesAttribute> GetAttributePerProperty(int propertyId)
        {
          
           return  _context.PropertiesAttributes.Where(x => x.PropertyId == propertyId);
        }
    }
}