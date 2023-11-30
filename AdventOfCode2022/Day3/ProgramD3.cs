using System.Reflection;

namespace MyApp
{
    internal class ProgramD3
    {
        static void Main(string[] args)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "Day3.Input.txt";
            var totalA = 0;
            var totalB = 0;

            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            using (StreamReader reader = new StreamReader(stream))
            {
                List<string> lines = new List<string>();
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    totalA += SolveA(line);                   
                    lines.Add(line);
                    if (lines.Count == 3)
                    {
                        totalB += SolveB(lines);
                        lines.Clear();
                    }
                }
            }

            Console.WriteLine($"Points part A: {totalA}");
            Console.WriteLine($"Points part B: {totalB}");
        }

        public static int SolveA(string line)
        {
            var rucksack = line.ToCharArray();
            var firstCompartment = rucksack.Take(rucksack.Length / 2).ToArray();
            var secondCompartment = rucksack.Skip(rucksack.Length / 2).ToArray();
            var commonItem = firstCompartment
                .Intersect(secondCompartment)
                .FirstOrDefault();

            return getPointsForChar(commonItem);
        }

        public static int SolveB(List<string> lines)
        {
            char[] first = lines[0].ToCharArray();
            char[] second = lines[1].ToCharArray();
            char[] third = lines[2].ToCharArray();

            var commonItem = first
                .Intersect(second)
                .Intersect(third)
                .FirstOrDefault();

            return getPointsForChar(commonItem);
        }

        public static int getPointsForChar(char? item)
        {
            if (item == null) return 0;
            if (char.IsUpper(item.Value))
            {
                return (int)item - 38;
            }
            else return (int)item - 96;
        }
    }
}
