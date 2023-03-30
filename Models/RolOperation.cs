using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class RolOperation
    {
        public int Id { get; set; }
        public int Rol { get; set; }
        public int Operacion { get; set; }

        public virtual Operacione OperacionNavigation { get; set; } = null!;
        public virtual Rol RolNavigation { get; set; } = null!;
    }
}
