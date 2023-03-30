using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SDGAV.Models;

namespace SDGAV
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperacioneController: Controller
    {
        private readonly SDGAVContext _context;

        public OperacioneController(SDGAVContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Operacione> GetAll()
        {
            return _context.Operaciones.ToList();
        }

        [HttpGet("{id}")]
        public Operacione GetOperacione(int id)
        {
            var Operacione = _context.Operaciones.Find(id);

            if(Operacione != null)
            {
                return Operacione;
            }else
            {
                return new Operacione();
            }
            
        }

        [HttpPost]
        public IActionResult Insert(Operacione Operacione)
        {
            _context.Operaciones.Add(Operacione);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Operacione Operacione, int id)
        {
            if(Operacione.Id != id) { return BadRequest(); }
            
            _context.Entry<Operacione>(Operacione).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var Operacione = _context.Operaciones.Find(id);

            if(Operacione != null)
            {
                _context.Entry<Operacione>(Operacione).State = EntityState.Modified;
                return Ok();
            } else
            {
                return BadRequest();
            }

            
        }

    }
}