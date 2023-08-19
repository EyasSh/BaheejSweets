using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BaheejBackEnd.Models
{
    public class User
    {
        [BsonId]
        public ObjectId _Id { get; init; }
        public string _Name { get; set; }

        public string _PhoneNumber { get; set; }

        
    }
}
