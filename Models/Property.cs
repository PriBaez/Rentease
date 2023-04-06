using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class Property
    {
        public Property()
        {
            Comments = new HashSet<Comment>();
            PropertiesAttributes = new HashSet<PropertiesAttribute>();
            PropertiesImages = new HashSet<PropertiesImage>();
            UsersFavorites = new HashSet<UsersFavorite>();
            UsersSaves = new HashSet<UsersSafe>();
        }

        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public int SellerId { get; set; }
        public string Titulo { get; set; } = null!;
        public double Price { get; set; }
        public double AreaTotal { get; set; }

        public virtual User? Seller { get; set; } = null!;
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<PropertiesAttribute> PropertiesAttributes { get; set; }
        public virtual ICollection<PropertiesImage> PropertiesImages { get; set; }
        public virtual ICollection<UsersFavorite> UsersFavorites { get; set; }
        public virtual ICollection<UsersSafe> UsersSaves { get; set; }
    }
}
