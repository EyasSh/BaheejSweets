namespace BaheejBackEnd.Models
{
    public class User
    {
        public string _Id { get; init; }
        public string _Name { get; set; }

        public string _PhoneNumber { get; set; }

        public User(string id, string name, string phoneNumber)
        {
            _Id = id;
            _Name = name;
            _PhoneNumber = phoneNumber;
        }
    }
}
