using System.Reflection;

namespace Day6
{
    internal class ProgramD6
    {
        public static Stack<char> CharactersStack = new Stack<char>();
        static void Main(string[] args)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "Day6.Input.txt";
            var markerA = 0;
            var markerB = 0;

            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            using (StreamReader reader = new StreamReader(stream))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    var characters = line.ToCharArray();
                    foreach (char character in characters)
                    {
                        CharactersStack.Push(character);
                        if (IsMarkerReached(4) && markerA == 0)
                        {
                            markerA = CharactersStack.Count;
                        }

                        if (IsMarkerReached(14))
                        {
                            markerB = CharactersStack.Count;
                            break;
                        }
                    }
                }

                Console.WriteLine($"Marker A: {markerA}");
                Console.WriteLine($"Marker B: {markerB}");
            }
        }

        public static bool IsMarkerReached(int countBeforeMarker)
        {
            if (CharactersStack.Count >= countBeforeMarker)
            {
                if (CharactersStack.Take(countBeforeMarker)
                    .Distinct()
                    .ToList()
                    .Count == countBeforeMarker)
                {
                    return true;
                }
            }

            return false;
        }
    }
}