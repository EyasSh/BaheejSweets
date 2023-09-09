using BaheejBackEnd.Models;
using MongoDB.Driver;

namespace BaheejBackEnd.MongoDB
{
    //a class that initiates a connection with the mongo client
    public class MongoDBWrapper
    {
        private MongoClient _client;
        IMongoDatabase _database;
        public IMongoCollection<User> Users { get;  private set; }
        public IMongoCollection<Request> Requests { get; private set; }
        public MongoDBWrapper(IConfiguration configuration)
        {
            _client = new MongoClient(configuration["mongoDb:connectionString"]);
            _database = _client.GetDatabase(configuration["mongoDb:databaseName"]);
            Users = _database.GetCollection<User>("users");
            Requests = _database.GetCollection<Request>("requests");
        }

    }
}
