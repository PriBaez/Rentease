using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class Attribute
    {
        public Attribute()
        {
            PropertiesAttributes = new HashSet<PropertiesAttribute>();
        }

        public int Id { get; set; }
        public string Description { get; set; } = null!;
        public bool Status { get; set; }

        public virtual ICollection<PropertiesAttribute> PropertiesAttributes { get; set; }
    }
}
