using System;
using System.Collections.Generic;

namespace SDGAV.Models
{
    public partial class User
    {
        public User()
        {
            Properties = new HashSet<Property>();
            UserSaves = new HashSet<UserSafe>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public int Rol { get; set; }
        public byte[] PasswordSalt { get; set; } = null!;
        public byte[] PasswordHash { get; set; } = null!;
        public string Username { get; set; } = null!;

        public virtual Rol RolNavigation { get; set; } = null!;
        public virtual ICollection<Property> Properties { get; set; }
        public virtual ICollection<UserSafe> UserSaves { get; set; }
    }
}
