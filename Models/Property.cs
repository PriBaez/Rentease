using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class Property
    {
        public Property()
        {
            Comments = new HashSet<Comment>();
            PropertyImages = new HashSet<PropertyImage>();
            UserSaves = new HashSet<UserSafe>();
        }

        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public int SalespersonId { get; set; }
        public string Titulo { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public double ExpectedPrice { get; set; }
        public int Bedrooms { get; set; }
        public double AreaTotal { get; set; }
        public bool Garden { get; set; }
        public bool Garage { get; set; }

        public virtual User Salesperson { get; set; } = null!;
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<PropertyImage> PropertyImages { get; set; }
        public virtual ICollection<UserSafe> UserSaves { get; set; }
    }
}
