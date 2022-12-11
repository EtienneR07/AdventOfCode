using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using Utility;

namespace Day5
{
    public class SolverD5
    {
        public string SolveA(IEnumerable<string> inputLines)
        {
            var stacks = GetStacks(inputLines.Take(8), 9);

            foreach (string line in inputLines.Skip(10))
            {
                Regex rgx = new Regex("[^0-9]"); ;
                var str = rgx.Replace(line, " ");

                var elements = Regex.Replace(str, @"\s+", " ").Substring(1).Split(' ');
                var nbOfElements = int.Parse(elements[0]);

                var from = stacks.Skip(int.Parse(elements[1]) - 1).First();
                var to = stacks.Skip(int.Parse(elements[2]) - 1).First();

                for (int i = 0; i < nbOfElements; i++)
                {
                    var toMove = from.Pop();
                    to.Push(toMove);
                }
            }
            
            return new string(stacks.Select(s => s.Peek()).ToArray());
        }

        public string SolveB(IEnumerable<string> inputLines)
        {
            throw new NotImplementedException();
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
    }
}
