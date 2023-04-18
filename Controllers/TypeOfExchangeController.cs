using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TypeOfExchangeController: Controller
    {
        private readonly sdgav_2Context _context;

        public TypeOfExchangeController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Models.TypeOfExchange> GetTypeOfExchanges()
        {
            return _context.TypeOfExchanges.ToList();
        }

        [HttpGet("{id}")]
        public Models.TypeOfExchange GetTypeOfExchangebyId(int id)
        {
            var typeOfExchange = _context.TypeOfExchanges.Find(id);

            if(typeOfExchange == null)
            {
                return new Models.TypeOfExchange();
            }

            return typeOfExchange;
        }

        [HttpPost]
        public IActionResult Insert(Models.TypeOfExchange typeOfExchange)
        {

            _context.Add(typeOfExchange);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Models.TypeOfExchange typeOfExchange, int id)
        {
            _context.Entry(typeOfExchange).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var typeOfExchange = _context.TypeOfExchanges.Find(id);

           if(typeOfExchange == null)
           {
            return BadRequest();
           }

            _context.TypeOfExchanges.Remove(typeOfExchange);
            _context.SaveChanges();
            return Ok();
        }
    }
}