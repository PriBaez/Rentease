using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class Offer
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        public int UserId { get; set; }
        public double Quantity { get; set; }
        public bool Status { get; set; }
        public bool IsAccepted { get; set; }

        public virtual Property? Property { get; set; } = null!;
        public virtual User? User { get; set; } = null!;
    }
}
