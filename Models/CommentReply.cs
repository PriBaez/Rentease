using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class CommentReply
    {
        public int ReplyId { get; set; }
        public int ParentCommentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Comment { get; set; } = null!;

        public virtual Comment ParentComment { get; set; } = null!;
    }
}
