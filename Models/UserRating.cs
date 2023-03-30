using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class UserRating
    {
        public int RatingFrom { get; set; }
        public int RatingTo { get; set; }
        public int Score { get; set; }
        public virtual User RatingFromNavigation { get; set; } = null!;
        public virtual User RatingToNavigation { get; set; } = null!;
    }
}
