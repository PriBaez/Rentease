using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
            Offers = new HashSet<Offer>();
            OffersAccepteds = new HashSet<OffersAccepted>();
            Properties = new HashSet<Property>();
            UsersFavorites = new HashSet<UsersFavorite>();
            UsersRatingRatingFromNavigations = new HashSet<UsersRating>();
            UsersRatingRatingToNavigations = new HashSet<UsersRating>();
            UsersSaves = new HashSet<UsersSafe>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Pwd { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public int Role { get; set; }

        public virtual Role? RoleNavigation { get; set; } = null!;
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Offer> Offers { get; set; }
        public virtual ICollection<OffersAccepted> OffersAccepteds { get; set; }
        public virtual ICollection<Property> Properties { get; set; }
        public virtual ICollection<UsersFavorite> UsersFavorites { get; set; }
        public virtual ICollection<UsersRating> UsersRatingRatingFromNavigations { get; set; }
        public virtual ICollection<UsersRating> UsersRatingRatingToNavigations { get; set; }
        public virtual ICollection<UsersSafe> UsersSaves { get; set; }
    }
}
