using System.Reflection;
using Utility;

namespace Day5
{
    internal class ProgramD5
    {
        static void Main(string[] args)
        {
            var lines = FileReader.GetInputLines(5);

            var solver = new SolverD5();

            var outputA = solver.SolveA(lines);
            //var outputB = solver.SolveB(lines);

            Console.WriteLine($"Part A: {outputA}");
            //Console.WriteLine($"Part B: {lines}");
        }
    }
}