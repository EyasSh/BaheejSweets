using BaheejBackEnd.MongoDB;
using Microsoft.AspNetCore.Mvc;
using BCrypt;
using BaheejBackEnd.Models;
using Microsoft.AspNetCore.Http.Features;
using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.AspNetCore.Authorization;

namespace BaheejBackEnd.Controllers
{
    [Route("User")]
    public class UserController : Controller
    {
        private MongoDBWrapper _MongoDBWrapper;

        public UserController(MongoDBWrapper MongoDBWrapper)
        {
            _MongoDBWrapper = MongoDBWrapper;
        }
        [Route("Signup")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateUser([Bind("_Id,_Name,_PhoneNumber,")] User user)
        {
                if (user == null)
                {
                    return  BadRequest(string.Empty);
                }
                var filter =Builders<User>.Filter.Where(x=>x._Id == user._Id);
                var cursor = await _MongoDBWrapper.Users.FindAsync(filter);
                
                var resUser= cursor.ToList();
                if (resUser.Count!=0)
                {
                    return BadRequest("User already exists");
                }
                 else
                 {
                     
                    user._PhoneNumber = BCrypt.Net.BCrypt.HashPassword(user._PhoneNumber);
                    await _MongoDBWrapper.Users.InsertOneAsync(user);
                    
                    return Ok(user);

                 }

        }



    }
}
