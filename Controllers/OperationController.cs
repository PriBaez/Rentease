using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OperationController: Controller
    {
        private readonly sdgav_2Context _context;

        public OperationController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Operation> GetOperations()
        {
            return _context.Operations.ToList();
        }

        [HttpGet("{id}")]
        public Operation GetOperationbyId(int id)
        {
            var Operation = _context.Operations.Find(id);

            if(Operation == null)
            {
                return new Operation();
            }

            return Operation;
        }

        [HttpPost]
        public IActionResult Insert(Operation operation)
        {

            _context.Add(operation);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Operation operation, int id)
        {
            _context.Entry(operation).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var operation = _context.Operations.Find(id);

           if(operation == null)
           {
            return BadRequest();
           }

            _context.Operations.Remove(operation);
            _context.SaveChanges();
            return Ok();
        }
    }
}