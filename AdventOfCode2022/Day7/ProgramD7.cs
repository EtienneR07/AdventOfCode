using NUnit.Framework;
using Utility;

namespace Day7
{
    internal class ProgramD7
    {
        static void Main(string[] args)
        {
            var solver = new SolverD7();

            var testInput = FileReader.GetTestInputForDay(7);
            var test = solver.SolveA(testInput);
            Assert.That(test, Is.EqualTo(95437));

            var lines = FileReader.GetInputLinesForDay(7);

            var outputA = solver.SolveA(lines);
            var outputB = solver.SolveB(lines);

            Console.WriteLine($"Part A: {outputA}");
            Console.WriteLine($"Part B: {outputB}");
        }
    }
}