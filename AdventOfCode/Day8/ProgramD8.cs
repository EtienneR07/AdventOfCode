using NUnit.Framework;
using Utility;

namespace Day8
{
    internal class ProgramD8
    {
        static void Main(string[] args)
        {
            var solver = new SolverD8();
            var input = FileReader.GetTestInputForDay(8);

            var testInput = FileReader.GetTestInputForDay(8);
            var test = solver.SolveA(testInput);
            Assert.That(test, Is.EqualTo(21));

            var output = solver.SolveA(input);

            Console.WriteLine($"Part A: {output}");
        }
    }
}