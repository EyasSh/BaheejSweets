using BaheejBackEnd.Models;
using BaheejBackEnd.MongoDB;
using Microsoft.AspNetCore.Mvc;


namespace BaheejBackEnd.Controllers
{
    [ApiController]
    [Route("[Requests]")]
    public class RequestController: Controller
    {
        private MongoDBWrapper _MongoDBWrapper;
        public RequestController(MongoDBWrapper MongoDBWrapper) 
        {
            _MongoDBWrapper = MongoDBWrapper;
        }  


        
    }
}
