

namespace BaheejBackEnd.Models
{
    public class Request
    {
        //a class simulating a cake/ sweet requests
        public string _ProductId { get; init; }

        public string _ClientId { get; init; }
        public string _ClientName { get; init; }
        public string _ProductName {  get; set; }
        public string _ProductImageRoute { get; init; }
        //TO DO:
        // put an Object for the product image itself here

        //Constructor
        public Request(string id, string clientId, string clientName,string productName, string imageRoute) 
        {
             _ClientId = clientId;
            _ClientName = clientName;
            _ProductId = id;
            _ProductName = productName;
            _ProductImageRoute = imageRoute;
        }

        
    }
}
