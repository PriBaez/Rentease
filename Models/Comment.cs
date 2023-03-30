using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class Comment
    {
        public Comment()
        {
            CommentReplies = new HashSet<CommentReply>();
        }

        public int CommentId { get; set; }
        public int PropertyId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Comment1 { get; set; } = null!;

        public virtual Property Property { get; set; } = null!;
        public virtual ICollection<CommentReply> CommentReplies { get; set; }
    }
}
