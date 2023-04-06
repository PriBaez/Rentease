using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class Role
    {
        public Role()
        {
            RolesOperations = new HashSet<RolesOperation>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public virtual ICollection<RolesOperation> RolesOperations { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
