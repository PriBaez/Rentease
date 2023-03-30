using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SDGAV.Models;

namespace SDGAV
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        private readonly SDGAVContext _context;

        public CommentController(SDGAVContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Comment> GetAll()
        {
            return _context.Comments.ToList();
        }

        [HttpGet("{id}")]
        public Comment GetComment(int id)
        {
            var Comment = _context.Comments.FirstOrDefault(x => x.CommentId == id);
            var commentReply = Comment.CommentReplies;
            if(Comment != null)
            {
                return Comment;
            }else
            {
                return new Comment();
            }
            
        }

        [HttpPost]
        public IActionResult Insert(Comment comment)
        {
            _context.Comments.Add(comment);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Comment Comment, int id)
        {
            if(Comment.CommentId != id) { return BadRequest(); }
            
            _context.Entry<Comment>(Comment).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var Comment = _context.Comments.Find(id);

            if(Comment != null)
            {
                _context.Entry<Comment>(Comment).State = EntityState.Modified;
                return Ok();
            } else
            {
                return BadRequest();
            }

            
        }

    }
}