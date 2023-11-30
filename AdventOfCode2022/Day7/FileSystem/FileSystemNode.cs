using System.Drawing;

namespace Day7.FileSystem
{
    public class FileSystemNode
    {
        public FileSystemNode(string name, int size, bool isFile, FileSystemNode parent)
        {
            Name = name;
            Size = size;
            Parent = parent;
            Children = new List<FileSystemNode>();
            IsFile = isFile;
        }
        public string Name { get; set; }

        public int Size { get; set; }

        public bool IsFile { get; set; }

        public List<FileSystemNode> Children { get; set; } = new List<FileSystemNode>();

        public FileSystemNode Parent { get; private set; }

        public void AddChild(string name, int size, bool isFile)
        {
            if (Children.Select(c => c.Name).Contains(name) || IsFile) return;
            if (isFile)
            {
                Size += size;
                Parent?.AddSize(size);
            }

            Children.Add(new FileSystemNode(name, size, isFile, this));
        }

        public void AddSize(int size) 
        {
            Size += size;
            if (Parent != null)
            {
                Parent.AddSize(size);
            }
        }

        public bool HasChild(string name)
        {
            return Children.Select(c => c.Name).Contains(name);
        }

        public FileSystemNode GetChild(string name)
        {
            foreach(FileSystemNode child in Children)
            {
                if (child.Name == name)
                {
                    return child;
                }
            }

            return null;
        }

        public IEnumerable<FileSystemNode> Flatten()
        {
            return new[] { this }.Concat(Children.SelectMany(x => x.Flatten()));
        }
    }
}
