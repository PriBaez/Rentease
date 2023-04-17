using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class UsersRating
    {
        public int RatingFrom { get; set; }
        public int RatingTo { get; set; }
        public int Score { get; set; }
        public string Comment { get; set; } = null!;
        public int Id { get; set; }

        public virtual User? RatingFromNavigation { get; set; } = null!;
        public virtual User? RatingToNavigation { get; set; } = null!;
    }
}
