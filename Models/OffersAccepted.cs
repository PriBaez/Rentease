using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class OffersAccepted
    {
        public int Id { get; set; }
        public int SellerId { get; set; }
        public int RenterId { get; set; }
        public int Quantity { get; set; }
        public DateTime AcceptedAt { get; set; }

        public virtual User Seller { get; set; } = null!;
    }
}
