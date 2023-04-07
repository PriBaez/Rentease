using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

namespace SDGAV.Models
{
    public partial class PropertiesImageDTO
    {
        public string Id { get; set; } = null!;
        public string PropertyId { get; set; } = null!;
        public IFormFile Image { get; set; } = null!;
        public string UploadAt { get; set; }  = null!;

        public virtual Property? Property { get; set; } = null!;
    }
}
