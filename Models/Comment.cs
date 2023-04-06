using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class Comment
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        public int UserId { get; set; }
        public int RelatedComment { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Comment1 { get; set; } = null!;
        public int Score { get; set; }

        public virtual Property? Property { get; set; } = null!;
        public virtual User? User { get; set; } = null!;
    }
}
