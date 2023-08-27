using BaheejBackEnd.Models;
using BaheejBackEnd.MongoDB;
using BaheejBackEnd.Socket_Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.WebSockets;
using System.Text;
using WebSocketSharp.Server;

namespace BaheejBackEnd.Controllers
{
    [ApiController]
    [Route("/Request")]
    public class RequestController: Controller
    {
        private MongoDBWrapper _MongoDBWrapper;
        private WebSocketServer _wssv;
        public RequestController(MongoDBWrapper MongoDBWrapper,WebSocketServer wssv) 
        {
            _MongoDBWrapper = MongoDBWrapper;
            _wssv = wssv;
            
        }
        [HttpPost]
        public IActionResult SweetsRequest(Request request)
        {
            if (request == null)
            {
                return BadRequest();
            }
            //save request to db
            string message = $"Hey {request._ClientName}! your order of {request._ProductName} is being prepared";
            RequestSocket.SendMessageToUser(message, request._ClientId);
            return Ok(message);
        }

        
        
        


        
    }
}
