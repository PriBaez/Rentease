using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class Operacione
    {
        public Operacione()
        {
            RolOperations = new HashSet<RolOperation>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public int Idmodulo { get; set; }

        public virtual Module IdmoduloNavigation { get; set; } = null!;
        public virtual ICollection<RolOperation> RolOperations { get; set; }
    }
}
