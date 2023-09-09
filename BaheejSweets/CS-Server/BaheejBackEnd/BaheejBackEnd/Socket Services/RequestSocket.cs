using MongoDB.Bson;
using System.Collections.Concurrent;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace BaheejBackEnd.Socket_Services
{
    public class RequestSocket:WebSocketBehavior
    {
        private static ConcurrentDictionary<ObjectId, IWebSocketSession> _clients;

        protected override void OnOpen()
        {
            // Extract the userId from the WebSocket URL's query parameters.
            string userIdString = this.Context.QueryString["userId"];

            if (!string.IsNullOrEmpty(userIdString))
            {
                try
                {
                    ObjectId userId = ObjectId.Parse(userIdString);

                    // Add the user's WebSocket session to the dictionary.
                    _clients.TryAdd(userId, this);
                }
                catch (FormatException)
                {
                    // Handle the scenario where the userIdString is not a valid ObjectId.
                    this.Context.WebSocket.Close(CloseStatusCode.InvalidData, "Invalid user ID provided.");
                }
            }
            else
            {
                // Handle the scenario where no userId was provided.
                this.Context.WebSocket.Close(CloseStatusCode.InvalidData, "User ID is required.");
            }
        }
        protected override void OnClose(CloseEventArgs e)
        {
            ObjectId userIdToRemove = _clients.FirstOrDefault(kvp => kvp.Value == this.Context.WebSocket).Key;
            _clients.TryRemove(userIdToRemove, out _);
        }

        public static void SendMessageToUser(ObjectId userId, string message)
        {
            if (_clients.TryGetValue(userId, out IWebSocketSession userWebSocket))
            {
                userWebSocket.Context.WebSocket.Send(message);
            }
        }
    }
}
