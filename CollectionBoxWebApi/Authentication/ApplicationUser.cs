using Microsoft.AspNetCore.Identity;
using System;

namespace CollectionBoxWebApi.DataLayer.Authentication
{
    public class ApplicationUser : IdentityUser
    { 
        //new public int Id { get; set; }
        public DateTime LastLoginTime { get; set; }

        public DateTime RegistrationDate { get; set; }

        public bool UserBlock { get; set; }
    }
}
