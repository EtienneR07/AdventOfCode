using NUnit.Framework;
using Utility;

namespace Day8
{
    internal class ProgramD8
    {
        static void Main(string[] args)
        {
            var solver = new SolverD8();
            var input = FileReader.GetInputLinesForDay(8);

            var testInput = FileReader.GetTestInputForDay(8);
            var testA = solver.SolveA(testInput);
            var testB = solver.SolveB(testInput);

            Assert.That(testA, Is.EqualTo(21));
            Assert.That(testB, Is.EqualTo(8));

            var output = solver.SolveA(input);
            var outputB = solver.SolveB(input);

            Console.WriteLine($"Part A: {output}");
            Console.WriteLine($"Part B: {outputB}");
        }
    }
}