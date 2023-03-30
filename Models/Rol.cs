using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class Rol
    {
        public Rol()
        {
            RolOperations = new HashSet<RolOperation>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<RolOperation> RolOperations { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
