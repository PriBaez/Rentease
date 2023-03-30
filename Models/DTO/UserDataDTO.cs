namespace SDGAV.Models.DTO
{
    public class UserDataDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public int Rol { get; set; }
    }
}