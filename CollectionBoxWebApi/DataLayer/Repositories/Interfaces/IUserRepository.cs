using CollectionBoxWebApi.DataLayer.Authentication;
using System.Collections.Generic;

namespace CollectionBoxWebApi.DataLayer.Repositories.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<ApplicationUser> GetAllUsers();
        ApplicationUser GetUserById(int id);
        void UpdateUser(ApplicationUser user);
        void DeleteUser(string id);
        void DeleteAllUsers();
        void SetLastLoginTime(ApplicationUser user);
        void BlockUser(string id);
        void UnblockUser(string id);
        void BlockAllUsers();
        void UnblockAllUsers();
    }
}
