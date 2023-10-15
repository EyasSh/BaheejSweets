namespace Example_Project
{
    class Program
    {
       unsafe static void Main(string[] args)
        {

            myFunc del = Lambda;
            Console.WriteLine(HelloName("Eyas", del));
            int a = 5;
            int* p = &a;
            Console.WriteLine(p->ToString());

        }
        public static string Lambda(string str)
        {
            return str;
        }
        public delegate string myFunc(string str);

        //Summary:
        //  lamParam:A string representing the name to say hello to
        //  del: an instance of a delegate that takes lamparam and returns it
        public static string HelloName(string lamParam,myFunc del)
        {
            return $"Hello {del(lamParam)}";
        }
    }
}
