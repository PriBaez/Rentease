using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

namespace SDGAV.Models
{
    public partial class PropertiesImage
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        
        [ModelBinder(BinderType = typeof(ByteArrayModelBinder))]
        public byte[] Image { get; set; } = null!;
        public DateTime UploadAt { get; set; }

        public virtual Property? Property { get; set; } = null!;
    }
}
