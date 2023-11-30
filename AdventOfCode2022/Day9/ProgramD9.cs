using Utility;
using NUnit.Framework;

namespace Day9
{
    internal class ProgramD9
    {
        static void Main(string[] args)
        {
            var solver = new SolverD9();
            var input = FileReader.GetInputLinesForDay(9);

            var testInput = FileReader.GetTestInputForDay(9);

            var testA = solver.SolveA(testInput);

            Assert.That(testA, Is.EqualTo(21));
            var output = solver.SolveA(input);
            Console.WriteLine($"Part A: {output}");
        }
    }
}