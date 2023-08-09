

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BaheejBackEnd.Models
{
    public class Request
    {
        //a class simulating a cake/ sweet requests
        // Create an Object better suited for an item with an image and everything
        [BsonId]
        public ObjectId _ProductId { get; init; }
        public string _ProductName { get; set; }
        public string _ProductImageRoute { get; init; }
        public string _ClientId { get; init; }
        public string _ClientName { get; init; }
       
        //TO DO:
        // put an Object for the product image itself here

        
        

        
    }
}
