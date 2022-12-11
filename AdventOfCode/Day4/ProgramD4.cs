using System.Reflection;

namespace Day4
{
    internal class ProgramD4
    {
        static void Main(string[] args)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "Day4.Input.txt";
            var totalA = 0;
            var totalB = 0;

            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            using (StreamReader reader = new StreamReader(stream))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    totalA += SolveA(line);
                    totalB += SolveB(line);
                }
            }

            Console.WriteLine($"Number of pairs A: {totalA}");
            Console.WriteLine($"Number of pairs B: {totalB}");
        }

        public static int SolveA(string line)
        {
            var elves = line.Split(',');
            var elf1LowerBound = int.Parse(elves[0].Split('-')[0]);
            var elf1UpperBound = int.Parse(elves[0].Split('-')[1]);

            var elf2LowerBound = int.Parse(elves[1].Split('-')[0]);
            var elf2UpperBound = int.Parse(elves[1].Split('-')[1]);

            if (elf1LowerBound >= elf2LowerBound && elf1UpperBound <= elf2UpperBound
                || elf2LowerBound >= elf1LowerBound && elf2UpperBound <= elf1UpperBound)
            {
                return 1;
            }

            return 0;
        }

        public static int SolveB(string line)
        {
            var elves = line.Split(',');
            var elf1LowerBound = int.Parse(elves[0].Split('-')[0]);
            var elf1UpperBound = int.Parse(elves[0].Split('-')[1]);

            var elf2LowerBound = int.Parse(elves[1].Split('-')[0]);
            var elf2UpperBound = int.Parse(elves[1].Split('-')[1]);

            if (elf1UpperBound >= elf2LowerBound && elf1LowerBound <= elf2UpperBound)
            {
                return 1;
            }

            return 0;
        }
    }
}