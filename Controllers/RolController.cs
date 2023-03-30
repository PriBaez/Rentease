using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SDGAV.Models;

namespace SDGAV
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController: Controller
    {
        private readonly SDGAVContext _context;

        public RolController(SDGAVContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Rol> GetAll()
        {
            return _context.Rols.ToList();
        }

        [HttpGet("{id}")]
        public Rol GetRol(int id)
        {
            var rol = _context.Rols.Find(id);

            if(rol != null)
            {
                return rol;
            }else
            {
                return new Rol();
            }
            
        }

        [HttpPost]
        public IActionResult Insert(Rol rol)
        {
            _context.Rols.Add(rol);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Rol rol, int id)
        {
            if(rol.Id != id) { return BadRequest(); }
            
            _context.Entry<Rol>(rol).State = EntityState.Modified;
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var rol = _context.Rols.Find(id);

            if(rol != null)
            {
                _context.Rols.Remove(rol);
                return Ok();
            } else
            {
                return BadRequest();
            }

            
        }

    }
}