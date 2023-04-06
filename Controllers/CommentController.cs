using SDGAV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace SDGAV.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController: Controller
    {
        private readonly sdgav_2Context _context;

        public CommentController(sdgav_2Context context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Comment> GetComments()
        {
            return _context.Comments.ToList();
        }

        [HttpGet("{id}")]
        public Comment GetCommentbyId(int id)
        {
            var comment = _context.Comments.Find(id);

            if(comment == null)
            {
                return new Comment();
            }

            return comment;
        }

        [HttpPost]
        public IActionResult Insert(Comment comment)
        {

            _context.Add(comment);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Comment comment, int id)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
           var comment = _context.Comments.Find(id);

           if(comment == null)
           {
            return BadRequest();
           }

            _context.Comments.Remove(comment);
            _context.SaveChanges();
            return Ok();
        }
    }
}