

namespace BaheejBackEnd.Models
{
    public class Request
    {
        //a class simulating a cake/ sweet requests
        public string _ProductId { get; init; }
        public string _ProductName {  get; set; }
        public string _ProductImageRoute { get; init; }
        //TO DO:
        // put an Object for the product image itself here

        //Constructor
        public Request(string id, string name, string imageRoute) 
        {
            _ProductId = id;
            _ProductName = name;
            _ProductImageRoute = imageRoute;
        }

        
    }
}
