using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SDGAV.Models;

namespace SDGAV
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ModuleController: Controller
    {
        private readonly SDGAVContext _context;

        public ModuleController(SDGAVContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Module> GetAll()
        {
            return _context.Modules.ToList();
        }

        [HttpGet("{id}")]
        public Module GetModule(int id)
        {
            var Module = _context.Modules.Find(id);

            if(Module != null)
            {
                return Module;
            }else
            {
                return new Module();
            }
            
        }

        [HttpPost]
        public IActionResult Insert(Module Module)
        {
            _context.Modules.Add(Module);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Module module, int id)
        {
            if(module.Id != id) { return BadRequest(); }
            
            _context.Entry<Module>(module).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var Module = _context.Modules.Find(id);

            if(Module != null)
            {
                _context.Entry<Module>(Module).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok();
            } else
            {
                return BadRequest();
            }

            
        }

    }
}