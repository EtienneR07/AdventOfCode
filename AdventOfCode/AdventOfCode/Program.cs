using System.Reflection;

namespace MyApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "Day1.Input.txt";
            var calories = new List<int>();

            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            using (StreamReader reader = new StreamReader(stream))
            {
                string line;
                var currentTotalCalories = 0;
                while ((line = reader.ReadLine()) != null)
                {
                    if (int.TryParse(line, out int food))
                    {
                        currentTotalCalories += food;
                    }

                    if (string.IsNullOrEmpty(line))
                    {
                        calories.Add(currentTotalCalories);
                        currentTotalCalories = 0;
                    }
                }
            }

            var max = calories.Max();
            var top3 = calories.OrderByDescending(c => c).Take(3).Sum(c => c);

            Console.WriteLine($"Calories of top elf: {max}");
            Console.WriteLine($"Total for top 3: {top3}");
        }
    }
}