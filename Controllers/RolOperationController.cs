using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SDGAV.Models;

namespace SDGAV
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolOperationController: Controller
    {
        private readonly SDGAVContext _context;

        public RolOperationController(SDGAVContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<RolOperation> GetAll()
        {
            return _context.RolOperations.ToList();
        }

        [HttpGet("{id}")]
        public RolOperation GetRolOperation(int id)
        {
            var rolOperation = _context.RolOperations.Find(id);

            if(rolOperation != null)
            {
                return rolOperation;
            }else
            {
                return new RolOperation();
            }
            
        }

        [HttpPost]
        public IActionResult Insert(RolOperation rolOperation)
        {
            _context.RolOperations.Add(rolOperation);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(RolOperation rolOperation, int id)
        {
            if(rolOperation.Id != id) { return BadRequest(); }
            
            _context.Entry<RolOperation>(rolOperation).State = EntityState.Modified;
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var rolOperation = _context.RolOperations.Find(id);

            if(rolOperation != null)
            {
                _context.RolOperations.Remove(rolOperation);
                return Ok();
            } else
            {
                return BadRequest();
            }

            
        }

    }
}