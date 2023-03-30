using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class PropertyImage
    {
        public int IdImage { get; set; }
        public int PropertyId { get; set; }
        public byte[] Image { get; set; } = null!;
        public DateTime UploadAt { get; set; }

        public virtual Property Property { get; set; } = null!;
    }
}
