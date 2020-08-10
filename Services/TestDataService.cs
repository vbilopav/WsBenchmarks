using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WsBenchmarks.Services
{
    public static class TestDataService
    {
        public const int MaxItems = 100000;

        public static IList<Data> TestData { get; }

        static TestDataService()
        {
            TestData = new List<Data>();
            for (var i = 1; i < MaxItems; i++)
            {
                TestData.Add(new Data
                {
                    Id = i,
                    Name = GenerateName(15, 15, i + 2),
                    Email = $"{GenerateName(5, 5, i + 3)}@{GenerateName(7, 7, i + 4)}.{GenerateName(2, 2, i + 5)}"
                });
            }
        }

        public static void Init() {}

        private static string GenerateName(int min, int max, int seed)
        {
            var rnd = new Random(DateTime.Now.Millisecond * seed);
            string[] consonants = { "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "l", "n", "p", "q", "r", "s", "sh", "zh", "t", "v", "w", "x" };
            string[] vowels = { "a", "e", "i", "o", "u", "ae", "y" };
            var Name = "";
            Name += consonants[rnd.Next(consonants.Length)];
            Name += vowels[rnd.Next(vowels.Length)];
            int b = 2;
            var len = rnd.Next(min, max);
            while (b < len)
            {
                Name += consonants[rnd.Next(consonants.Length)];
                b++;
                Name += vowels[rnd.Next(vowels.Length)];
                b++;
            }

            return Name;
        }
    }
}
