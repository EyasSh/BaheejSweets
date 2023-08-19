using System.Net.WebSockets;
using System.Text;

namespace Mock
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("app is up");
            ClientWebSocket client = new ClientWebSocket();
            Uri url = new Uri("ws://localhost:44321/Requests/CreateRequest");
            CancellationTokenSource cTs = new CancellationTokenSource();
            cTs.CancelAfter(TimeSpan.FromSeconds(120));
            try
            {
                await client.ConnectAsync(url, cTs.Token);
                var n = 0;
                while (client.State is WebSocketState.Open)
                {
                    Console.WriteLine("Enter Message");
                    string s = Console.ReadLine();
                    if (!string.IsNullOrEmpty(s))
                    {
                        ArraySegment<byte> buffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(s));
                       await client.SendAsync(buffer, WebSocketMessageType.Text, true,cTs.Token);
                        var res = new byte[1024];
                        var offset = 0;
                        var pktsz = 1024;
                        while (true)
                        {
                            ArraySegment<byte> responsebyte = new ArraySegment<byte>(res, offset, pktsz);
                            WebSocketReceiveResult response = await client.ReceiveAsync(responsebyte, cTs.Token);
                            var resmessage = Encoding.UTF8.GetString(res,offset,response.Count);
                            if (response.EndOfMessage)
                            {
                                break;
                            }

                        }
                    }

                }
            }
            catch
            {
                throw new WebSocketException();
            }
            Console.ReadLine();

        }
    }
    
}
