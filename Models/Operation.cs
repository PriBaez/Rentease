using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class Operation
    {
        public Operation()
        {
            RolesOperations = new HashSet<RolesOperation>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<RolesOperation> RolesOperations { get; set; }
    }
}
