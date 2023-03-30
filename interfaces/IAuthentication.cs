using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace SDGAV.interfaces
{
    public interface IAuthentication
    {
        string CreateToken(UserLoginDTO user);

        void CreatewPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);

        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);

    }
}