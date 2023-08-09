using MongoDB.Bson;
using System.Collections.Concurrent;
using System.Net.Sockets;
using System.Net.WebSockets;

namespace BaheejBackEnd.WebSocketManager
{
    public class WebSocketManager
    {
        private readonly ConcurrentDictionary<ObjectId, WebSocket> _websockets = new ConcurrentDictionary<ObjectId, WebSocket>();

        public async Task HandleConnectionAsync(HttpContext context, ObjectId userId)
        {
            if(context.WebSockets.IsWebSocketRequest)
            {
                WebSocket ws = await context.WebSockets.AcceptWebSocketAsync();
            }
        }
    }
}
