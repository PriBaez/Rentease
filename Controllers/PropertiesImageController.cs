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
        [Consumes("multipart/form-data")]
        public IActionResult Insert([FromForm] PropertiesImageDTO propertiesImage)
        {
            if (propertiesImage.Image.Length > 0)
            {
                 byte [] imgByteArray;
                //converting the image(file) to byte array
                using (MemoryStream mStream = new())
                {
                    propertiesImage.Image.CopyTo(mStream);
                    imgByteArray = mStream.ToArray();

                    
                }

                PropertiesImage img = new PropertiesImage(){
                        PropertyId = Convert.ToInt32(propertiesImage.PropertyId),
                        Image = imgByteArray,
                        UploadAt = Convert.ToDateTime(propertiesImage.UploadAt)
                    };

                _context.Add(img);
                _context.SaveChanges();
                
                return Ok();
            
            } else {
                return BadRequest();
            }
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

        [HttpGet("post/{id}")]

        public List<PropertiesImage> GetImagesFromOneProperty(int id) 
        {
            var imageDTO = new PropertiesImageDTO();
            var rawImage = _context.PropertiesImages.Where(photo => photo.PropertyId == id);
          
           
            return rawImage.ToList();
        }
    }
}