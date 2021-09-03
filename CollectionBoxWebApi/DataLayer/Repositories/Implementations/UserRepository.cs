using CollectionBoxWebApi.DataLayer.Authentication;
using CollectionBoxWebApi.DataLayer.GenericRepository;
using CollectionBoxWebApi.DataLayer.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CollectionBoxWebApi.DataLayer.Repositories.Implementations
{
    public class UserRepository : GenericRepository<ApplicationUser>,
                                  IUserRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<ApplicationUser> _table;

        public UserRepository(AppDbContext context) : base(context)
        {
            _context = context;
            _table = _context.Set<ApplicationUser>();
        }

        public void BlockUser(string id)
        {
            var user = _context.Users.Find(id);
            user.UserBlock = true;
            _context.SaveChanges();
        }

        public void UnblockUser(string id)
        {
            var user = _context.Users.Find(id);
            user.UserBlock = false;
            _context.SaveChanges();
        }

        public void DeleteAllUsers()
        {
            _table.RemoveRange(_table);
            _context.SaveChanges();
        }

        public void DeleteUser(string id)
        {
            Delete(id);
        }

        public IEnumerable<ApplicationUser> GetAllUsers()
        {
            return GetAll();
        }

        public ApplicationUser GetUserById(int id)
        {
            throw new System.NotImplementedException();
        }

        public void SetLastLoginTime(ApplicationUser user)
        {
            user.LastLoginTime = DateTime.Now;
            _context.SaveChanges();
        }

        public void UpdateUser(ApplicationUser user)
        {
            throw new System.NotImplementedException();
        }

        public void BlockAllUsers()
        {
            var users = _context.Users.ToList(); // retrieve the entity
            var a = users.Where(t => t.UserBlock = true).ToList(); // amend properties
            _context.SaveChanges(); // commit the changes 
        }

        public void UnblockAllUsers()
        {
            var users = _context.Users.ToList(); // retrieve the entity
            var a = users.Where(t => t.UserBlock = false).ToList(); // amend properties
            _context.SaveChanges(); // commit the changes
        }
    }
}
