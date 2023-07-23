using System.Reflection;

namespace Day8
{
    public class SolverD8
    {
        public List<(int i, int j)> VisibleTrees = new List<(int i, int j)>();

        public int SolveA(IEnumerable<string> lines)
        {
            var numberArray = ToNumberArray(lines.ToList());

            var visible = new HashSet<(int, int)>();

            var lastHighestTopBottom = new Dictionary<int, int>();
            foreach (var (row, i) in numberArray.Select((row, i) => (row, i)))
            {
                var lastHighestRightLeft = 0;          
                foreach (var (tree, j) in row.Select((tree, i) => (tree, i)))
                {
                    lastHighestTopBottom.TryAdd(j, 0);

                    if (tree > lastHighestRightLeft)
                    {
                        visible.Add((i, j));
                        lastHighestRightLeft = tree;
                    }

                    if (tree > lastHighestTopBottom[j])
                    {
                        visible.Add((i, j));
                        lastHighestTopBottom[j] = tree;
                    }
                }
            }

        

            return visible.Distinct().Count();
        }

        public List<List<int>> ToNumberArray(List<string> lines)
        {
            var result = new List<List<int>>();

            foreach (var line in lines)
            {
                var charList = new List<int>();
                foreach (var character in line.ToCharArray())
                {
                    charList.Add((int)character);
                }

                result.Add(charList);
            }

            return result;
        }
    }
}
