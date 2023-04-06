using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesImageController: Controller
    {
        private readonly sdgav_2Context _context;

        public PropertiesImageController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<PropertiesImage> GetPropertiesImages()
        {
            return _context.PropertiesImages.ToList();
        }

        [HttpGet("{id}")]
        public PropertiesImage GetPropertiesImagebyId(int id)
        {
            var propertiesImage = _context.PropertiesImages.Find(id);

            if(propertiesImage == null)
            {
                return new PropertiesImage();
            }

            return propertiesImage;
        }

        [HttpPost]
        public IActionResult Insert(PropertiesImage propertiesImage)
        {
            _context.Add(propertiesImage);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(PropertiesImage propertiesImage, int id)
        {
            _context.Entry(propertiesImage).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var propertiesImage = _context.PropertiesImages.Find(id);

           if(propertiesImage == null)
           {
            return BadRequest();
           }

            _context.PropertiesImages.Remove(propertiesImage);
            _context.SaveChanges();
            return Ok();
        }
    }
}