using CollectionBoxWebApi.DataLayer.Authentication;
using CollectionBoxWebApi.DataLayer.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CollectionBoxWebApi.Controllers
{
    [Route("api/[controller]")]
    //[Authorize(Roles = "User")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;

        public UserController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IEnumerable<ApplicationUser> GetAll()
        {
            return _repository.GetAllUsers();
        }

        [HttpPut]
        [Route("BlockAllUsers")]
        public IActionResult BlockAll()
        {
            try
            {
                _repository.BlockAllUsers();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException);
            }

            return Ok();
        }

        [HttpPut]
        [Route("UnblockAllUsers")]
        public IActionResult UnblockAll()
        {
            try
            {
                _repository.UnblockAllUsers();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException);
            }

            return Ok();
        }

        [HttpPost("{id}")]
        //[Route("Block")]
        public IActionResult Block(string id)
        {
            try
            {
                _repository.BlockUser(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException);
            }
            
            return Ok(new Response { Status = "Success", Message = "User blocked!" });
        }

        [HttpPut("{id}")]
        //[Route("Unblock")]
        public IActionResult Unblock(string id)
        {
            try
            {
                _repository.UnblockUser(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException);
            }

            return Ok(new Response { Status = "Success", Message = "User unblocked!" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                _repository.DeleteUser(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException);
            }

            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteAll()
        {
            try
            {
                _repository.DeleteAllUsers();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException);
            }

            return Ok();
        }
    }
}
