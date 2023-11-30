using System.Text.RegularExpressions;

namespace Day5
{
    public class SolverD5
    {
        public static List<Stack<char>> Stacks = new List<Stack<char>>();

        public string SolveA(IEnumerable<string> inputLines)
        {
            Stacks = GetStacks(inputLines.Take(8), 9);

            foreach (string line in inputLines.Skip(10))
            {
                var instructions = GetInstructions(line);
                for (int i = 0; i < instructions.NbOfElements; i++)
                {
                    var toMove = instructions.From.Pop();
                    instructions.To.Push(toMove);
                }
            }
            
            return new string(Stacks.Select(s => s.Peek()).ToArray());
        }

        public string SolveB(IEnumerable<string> inputLines)
        {
            Stacks = GetStacks(inputLines.Take(8), 9);

            foreach (string line in inputLines.Skip(10))
            {
                var instructions = GetInstructions(line);

                var listOfMoves = new List<char>();
                for (int i = 0; i < instructions.NbOfElements; i++)
                {
                    listOfMoves.Add(instructions.From.Pop());
                }
                listOfMoves.Reverse();
                foreach (char move in listOfMoves)
                {
                    instructions.To.Push(move);
                }
            }

            return new string(Stacks.Select(s => s.Peek()).ToArray());
        }

        public List<Stack<char>> GetStacks(IEnumerable<string> lines, int length)
        {
            var result = new List<Stack<char>>();
            for (int i = 0; i < length; i++)
            {
                result.Add(new Stack<char>());
            }

            var crateSetup = lines.Reverse().ToList();
            foreach (string crateLine in crateSetup)
            {
                var line = crateLine.ToCharArray();
                var firstCharacter = line.Skip(1).First();
                for (int i = 0; i < result.Count; i++)
                {
                    var toAdd = line.Skip(1).Skip(i * 4).First();
                    if (i == 0 && !char.IsWhiteSpace(firstCharacter))
                    {
                        result[i].Push(firstCharacter);
                    }
                    else if (!char.IsWhiteSpace(toAdd))
                    {
                        result[i].Push(toAdd);
                    }
                }
            }

            return result;
        }

        public (int NbOfElements, Stack<char> From, Stack<char> To) GetInstructions(string line)
        {
            Regex rgx = new Regex("[^0-9]"); ;
            var str = rgx.Replace(line, " ");

            var elements = Regex.Replace(str, @"\s+", " ").Substring(1).Split(' ');
            var nbOfElements = int.Parse(elements[0]);

            var from = Stacks.Skip(int.Parse(elements[1]) - 1).FirstOrDefault() ?? new Stack<char>();
            var to = Stacks.Skip(int.Parse(elements[2]) - 1).FirstOrDefault() ?? new Stack<char>();

            return (nbOfElements, from, to);
        }
    }
}
