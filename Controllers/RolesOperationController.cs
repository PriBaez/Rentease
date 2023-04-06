using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesOperationController: Controller
    {
        private readonly sdgav_2Context _context;

        public RolesOperationController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<RolesOperation> GetRolesOperations()
        {
            return _context.RolesOperations.ToList();
        }

        [HttpGet("{id}")]
        public RolesOperation GetRolesOperationbyId(int id)
        {
            var rolesOperation = _context.RolesOperations.Find(id);

            if(rolesOperation == null)
            {
                return new RolesOperation();
            }

            return rolesOperation;
        }

        [HttpPost]
        public IActionResult Insert(RolesOperation rolesOperation)
        {

            _context.Add(rolesOperation);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(RolesOperation rolesOperation, int id)
        {
            _context.Entry(rolesOperation).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var rolesOperation = _context.RolesOperations.Find(id);

           if(rolesOperation == null)
           {
            return BadRequest();
           }

            _context.RolesOperations.Remove(rolesOperation);
            _context.SaveChanges();
            return Ok();
        }
    }
}