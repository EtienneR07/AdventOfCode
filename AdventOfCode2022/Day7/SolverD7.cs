using Day7.FileSystem;

namespace Day7
{
    public class SolverD7
    {
        public int RequiredUnusedSpace = 30000000;
        public int TotalSpace = 70000000;

        public int SolveA(IEnumerable<string> inputLines)
        {
            var flatTree = GetFlatTree(inputLines);

            return flatTree
                .Where(f => f.Size <= 100000 && !f.IsFile)
                .Sum(f => f.Size);
        }

        public IEnumerable<FileSystemNode> GetFlatTree(IEnumerable<string> inputLines)
        {
            var fileSystem = new FileSystemNode("root", 0, false, null);
            var currentNode = fileSystem;
            foreach (string line in inputLines)
            {
                if (line == "$ ls") continue;
                if (line == "$ cd /") continue;

                if (line == "$ cd ..")
                {
                    currentNode = currentNode.Parent;
                    continue;
                };

                if (line.StartsWith("$ cd"))
                {
                    var name = line.Substring(4).Trim();
                    TryAddFolder(currentNode, name);
                    currentNode = currentNode.GetChild(name);
                    continue;
                };

                if (line.StartsWith("dir"))
                {
                    var name = line.Substring(4).Trim();
                    TryAddFolder(currentNode, name);
                    continue;
                }

                var info = GetSizeAndName(line);
                if (!currentNode.HasChild(info.Name))
                {
                    currentNode.AddChild(info.Name, info.Size, true);
                }
            }

            return fileSystem.Flatten();
        }

        public void TryAddFolder(FileSystemNode currentNode, string name)
        {
            if (!currentNode.HasChild(name))
            {
                currentNode.AddChild(name, 0, false);
            }
        }

        public int SolveB(IEnumerable<string> inputLines)
        {
            var flatTree = GetFlatTree(inputLines);

            var totalUsedSpace = flatTree.Max(x => x.Size);

            var currentlyAvailable = TotalSpace - totalUsedSpace;
            var toFree = RequiredUnusedSpace - currentlyAvailable;

            return flatTree
                .OrderBy(n => n.Size)
                .Where(n => n.Size >= toFree)
                .Select(n => n.Size)
                .FirstOrDefault();
        }

        public (int Size, string Name) GetSizeAndName(string line)
        {
            var info = line.Split(' ');
            return (int.Parse(info[0]), info[1]);
        }
    }
}
