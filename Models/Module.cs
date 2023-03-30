using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class Module
    {
        public Module()
        {
            Operaciones = new HashSet<Operacione>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<Operacione> Operaciones { get; set; }
    }
}
