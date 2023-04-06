using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SDGAV.Models
{
    public partial class UsersRating
    {
        [Key]
        public int Id { get; set; }
        public int RatingFrom { get; set; }
        public int RatingTo { get; set; }
        public int Score { get; set; }
        public string Comment { get; set; } = null!;

        public virtual User? RatingFromNavigation { get; set; } = null!;
        public virtual User? RatingToNavigation { get; set; } = null!;
    }
}
