using Microsoft.AspNetCore.Identity;
using System;

namespace CollectionBoxWebApi.DataLayer.Authentication
{
    public class ApplicationUser : IdentityUser
    { 
        public DateTime LastLoginTime { get; set; }

        public DateTime RegistrationDate { get; set; }

        public bool UserBlock { get; set; }
    }
}
