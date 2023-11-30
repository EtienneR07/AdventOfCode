using System.Reflection;

namespace Day9
{
    public class SolverD9
    {
        public List<(int i, int j)> VisitedByTail = new List<(int i, int j)>();

        public int SolveA(IEnumerable<string> lines)
        {
            VisitedByTail.Add((0, 0));

            foreach(var line in lines)
            {
                var charArray = line.ToCharArray();

                var direction = charArray[0];
                var count = int.Parse(charArray[1].ToString());

                if (direction == 'R')
                {

                }
            }

            return VisitedByTail.Count;
        }

        public int SolveB(IEnumerable<string> lines)
        {
            return 0;
        }
    }
}
