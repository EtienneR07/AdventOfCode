using System.Reflection;

namespace MyApp
{
    internal class ProgramD2
    {
        static Dictionary<char, (int ForShape, int ForRound)> BasePoints 
            = new Dictionary<char, (int ForShape, int ForRound)>() { 
            { 'X', (1, 0) },
            { 'Y', (2, 3) },
            { 'Z', (3, 6) }
        };

        static Dictionary<char, (char Win, char Lost)> ResultsPosibilitiesA
            = new Dictionary<char, (char Win, char Lost)>() {
            {'Y', ('A', 'C') },
            {'X', ('C', 'B') },
            {'Z', ('B', 'A') },
        };

        static Dictionary<char, (int Win, int Lost, int Draw)> ResultsPosibilitiesB
            = new Dictionary<char, (int Win, int Lost, int Draw)>() {
            {'A', (2, 3, 1) },
            {'B', (3, 1, 2) },
            {'C', (1, 2, 3) },
        };

        static void Main(string[] args)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "Day2.Input.txt";
            var totalPointsPartA = 0;
            var totalPointsPartB = 0;
            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            using (StreamReader reader = new StreamReader(stream))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    char[] characters = line.ToCharArray();
                    totalPointsPartA += GetPointsPartA(characters[2], characters[0]);
                    totalPointsPartB += GetPointsPartB(characters[2], characters[0]);
                }
            }

            Console.WriteLine($"Points part A: {totalPointsPartA}");
            Console.WriteLine($"Points part B: {totalPointsPartB}");
        }

        public static int GetPointsPartA(char you, char opponent)
        {
            var points = BasePoints[you].ForShape;
            var rules = ResultsPosibilitiesA[you];
            if (rules.Win == opponent)
            {
                return points += 6;
            }
            else if (rules.Lost == opponent)
            {
                return points;
            }

            return points += 3;
        }

        public static int GetPointsPartB(char you, char opponent)
        {
            var points = BasePoints[you].ForRound;
            var choice = ResultsPosibilitiesB[opponent];
            if (points == 0)
            {
                return points += choice.Lost;
            }
            else if (points == 3)
            {
                return points += choice.Draw;
            }

            return points += choice.Win;
        }
    }
}