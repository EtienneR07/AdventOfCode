using System.Reflection;

namespace Day5
{
    internal class ProgramD5
    {
        static void Main(string[] args)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "Day5.Input.txt";
            var crate = 0;
            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            using (StreamReader reader = new StreamReader(stream))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    var spaces = line.Count(char.IsWhiteSpace);
                    Console.WriteLine(spaces);
                }
            }

            Console.WriteLine($"Number of pairs A: {crate}");
        }
    }
}