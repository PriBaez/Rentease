using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class TypeOfExchange
    {
        public TypeOfExchange()
        {
            Properties = new HashSet<Property>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<Property> Properties { get; set; }
    }
}
