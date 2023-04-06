using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SDGAV.Models
{
    public partial class PropertiesAttribute
    {
        [Key]
        public int Id { get; set; }
        public int PropertyId { get; set; }
        public int IdAttribute { get; set; }
        public double Quantity { get; set; }

        public virtual Attribute? IdAttributeNavigation { get; set; } = null!;
        public virtual Property? Property { get; set; } = null!;
    }
}
