using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class UsersSafe
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PropertyId { get; set; }
        public DateTime CreateAt { get; set; }

        public virtual Property? Property { get; set; } = null!;
        public virtual User? User { get; set; } = null!;
    }
}
