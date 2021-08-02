using System;

namespace WebApi.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Status { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public DateTime RegistrationDate { get; set; }

        public DateTime LastLoginDate { get; set; }
    }
}