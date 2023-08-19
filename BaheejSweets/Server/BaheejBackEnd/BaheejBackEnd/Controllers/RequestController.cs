using BaheejBackEnd.Models;
using BaheejBackEnd.MongoDB;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.WebSockets;
using System.Text;

namespace BaheejBackEnd.Controllers
{
    [ApiController]
    [Route("/Requests")]
    public class RequestController: Controller
    {
        private MongoDBWrapper _MongoDBWrapper;
        public RequestController(MongoDBWrapper MongoDBWrapper) 
        {
            _MongoDBWrapper = MongoDBWrapper;
        }
        //Check if /CreateRequest is a route under /{id/}/Requests or amn independant one
        
        public async Task HandleSendRequestClient( HttpContext context) 
        {
            
            if (context.Request.Path=="/CreateRequest")
            {
                if(context.WebSockets.IsWebSocketRequest)
                {
                    var ws= await context.WebSockets.AcceptWebSocketAsync();
                    await Send(context, ws);
                }
                else
                {
                     context.Response.StatusCode = (int) HttpStatusCode.BadRequest;
                }
            }
        }
        private async Task Send(HttpContext context, WebSocket ws)
        {
            byte[] data = new byte[1024*4];
            ArraySegment<byte> dataSeg = new ArraySegment<byte>(data);
            WebSocketReceiveResult res = await ws.ReceiveAsync(dataSeg, CancellationToken.None);
            if (res!=null)
            {
                while (!res.CloseStatus.HasValue)
                {
                    string msg = Encoding.UTF8.GetString(new ArraySegment<byte>(data,0,res.Count));
                    Console.WriteLine($"the client says {msg}");
                    //the below send async sends a response message back to the client
                    await ws.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes("The server Recieved the message"))
                        , res.MessageType, res.EndOfMessage, CancellationToken.None);
                    //here the code below recieves a message back from the client
                    res = await ws.ReceiveAsync(dataSeg,CancellationToken.None);

                }
            }
        }


        
    }
}
