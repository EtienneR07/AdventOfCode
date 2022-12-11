namespace Utility
{
    public static class FileReader
    {
        public static List<string> GetInputLines(int day)
        {
            return File.ReadLines($@"C:\Users\etien\Documents\PersonalProjects\AdventOfCode2022\AdventOfCode\Utility\Files\InputD{day}.txt").ToList();
        }
    }
}