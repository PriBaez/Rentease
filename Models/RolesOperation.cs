using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class RolesOperation
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public int OperationId { get; set; }

        public virtual Operation? Operation { get; set; } = null!;
        public virtual Role? Role { get; set; } = null!;
    }
}
