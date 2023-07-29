using System.Reflection;

namespace Day8
{
    public class SolverD8
    {
        public List<(int i, int j)> VisibleTrees = new List<(int i, int j)>();

        public int SolveA(IEnumerable<string> lines)
        {
            var numberArray = ToNumberArray(lines.ToList());

            var visible = GetVisible(numberArray);

            InverseLists(numberArray);

            var inversedVisible = GetVisible(numberArray);

            InverseLists(numberArray);

            var rearangedVisible = RearrangeVisible(inversedVisible, numberArray);

            visible.UnionWith(rearangedVisible);

            return visible.Distinct().Count();
        }

        public int SolveB(IEnumerable<string> lines)
        {
            var numberArray = ToNumberArray(lines.ToList());

            return GetBestScenicScore(numberArray);
        }

        private List<List<int>> ToNumberArray(List<string> lines)
        {
            var result = new List<List<int>>();

            foreach (var line in lines)
            {
                var charList = new List<int>();
                foreach (var character in line.ToCharArray())
                {
                    charList.Add(int.Parse(character.ToString()));
                }

                result.Add(charList);
            }

            return result;
        }

        private HashSet<(int, int)> GetVisible(List<List<int>> numberArray)
        {
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

            return visible;
        }

        private void InverseLists(List<List<int>> list)
        {
            list.Reverse();

            foreach (var row in list)
            {
                row.Reverse();
            }
        }

        private HashSet<(int, int)> RearrangeVisible(HashSet<(int Row, int Column)> hashSet, List<List<int>> ogList)
        {
            var visible = new HashSet<(int, int)>();

            var rowCountIndex = ogList.Count - 1;
            var columnCountIndex = ogList[0].Count - 1;

            foreach (var tree in hashSet)
            {
                var row = tree.Row;
                var column = tree.Column;

                visible.Add((rowCountIndex - row, columnCountIndex - column));
            }

            return visible;
        }

        private int GetBestScenicScore(List<List<int>> trees)
        {
            var bestScore = 0;

            var treeArray = trees.Select(a => a.ToArray()).ToArray();

            for (int i = 0; i < treeArray.Count(); i++)
            {
                for (int j = 0; j < treeArray[i].Count(); j++)
                {
                    var currentScore = 0;
                    var leftScore = 0;
                    var rightScore = 0;
                    var topScore = 0;
                    var bottomScore = 0;
                    var current = treeArray[i][j];

                    // check left
                    for (int left = j - 1; left >= 0; left--)
                    {
                        leftScore++;
                        if (treeArray[i][left] >= current)
                        {
                            break;
                        }
                    }

                    // check right
                    for (int right = j + 1; right < treeArray[i].Length; right++)
                    {
                        rightScore++;
                        if (treeArray[i][right] >= current)
                        {
                            break;
                        }
                    }

                    // check up
                    for (int up = i - 1; up >= 0; up--)
                    {
                        topScore++;
                        if (treeArray[up][j] >= current)
                        {
                            break;
                        }
                    }

                    // check bottom
                    for (int bottom = i + 1; bottom < treeArray.Length; bottom++)
                    {
                        bottomScore++;
                        if (treeArray[bottom][j] >= current)
                        {
                            break;
                        }
                    }

                    currentScore = leftScore * rightScore * topScore * bottomScore;

                    if (currentScore > bestScore)
                    {
                        bestScore = currentScore;
                    }
                }
            }

            return bestScore;
        }
    }
}
