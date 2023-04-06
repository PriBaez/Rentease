using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController: Controller
    {
        private readonly sdgav_2Context _context;

        public RoleController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Role> GetRoles()
        {
            var raw_roles = _context.Roles.Include(x => x.Users).ToList();
            return  raw_roles;
        }

        [HttpGet("{id}")]
        public Role GetRolebyId(int id)
        {
            var Role = _context.Roles.Find(id);

            if(Role == null)
            {
                return new Role();
            }

            return Role;
        }

        [HttpPost]
        public IActionResult Insert(Role role)
        {

            _context.Add(role);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Role role, int id)
        {
            _context.Entry(role).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var role = _context.Roles.Find(id);

           if(role == null)
           {
            return BadRequest();
           }

            _context.Roles.Remove(role);
            _context.SaveChanges();
            return Ok();
        }
    }
}