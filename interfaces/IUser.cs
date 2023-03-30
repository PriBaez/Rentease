using SDGAV.Models;
using SDGAV.Models.DTO;

namespace SDGAV.interfaces
{
    public interface IUser
    {
        Task<IEnumerable<UserDataDTO>> getUsersInfo();
        Task<UserDataDTO> GetUser(int id);

        Task<bool> Insert(UserDataDTO data);  

        Task<bool> Update(int id, UserDataDTO userData);

        Task<bool> Delete(int id);     
    }
}