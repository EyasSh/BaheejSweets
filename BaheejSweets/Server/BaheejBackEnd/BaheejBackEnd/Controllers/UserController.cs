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
    
    public class UserController : Controller
    {
        private MongoDBWrapper _MongoDBWrapper;

        public UserController(MongoDBWrapper MongoDBWrapper)
        {
            _MongoDBWrapper = MongoDBWrapper;
        }
        [Route("Login")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateUser([Bind("_Id,_Name,_PhoneNumber,")] User user)
        {
                if (user == null)
                {
                    return  BadRequest(string.Empty);
                }
                var filter =Builders<User>.Filter.Where(x=>x._PhoneNumber == user._PhoneNumber);
                var cursor = await _MongoDBWrapper.Users.FindAsync(filter);
                
                var resUser= cursor.ToList();
                if (resUser.Contains(user))
                {
                     return Ok(user);
                }
                 else
                 {
                     
                    
                    await _MongoDBWrapper.Users.InsertOneAsync(user);
                    
                    return Ok(user);

                 }

        }



    }
}
