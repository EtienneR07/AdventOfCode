namespace Utility
{
    public static class FileReader
    {
        public static List<string> GetInputLinesForDay(int day)
        {
            return File.ReadLines($@"C:\Users\etien\Documents\PersonalProjects\AdventOfCode2022\AdventOfCode\Utility\Files\InputD{day}.txt").ToList();
        }

        public static List<string> GetTestInputForDay(int day)
        {
            return File.ReadLines($@"C:\Users\etien\Documents\PersonalProjects\AdventOfCode2022\AdventOfCode\Utility\Files\TestD{day}.txt").ToList();
        }
    }
}