﻿using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class PropertiesAttribute
    {
        public int PropertyId { get; set; }
        public int IdAttribute { get; set; }
        public double Quantity { get; set; }
        public int Id { get; set; }

        public virtual Attribute? IdAttributeNavigation { get; set; } = null!;
        public virtual Property? Property { get; set; } = null!;
    }
}
