// Striver's A2Z & Core SDE Sheet Dataset (508 Curated Problems with LeetCode & YouTube Video Solutions)
// All article links removed cleanly per user specification.

export interface DsaProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  leetcodeUrl?: string;
  ytVideo?: string;
}

export interface DsaSubTopic {
  id: string;
  title: string;
  problems: DsaProblem[];
}

export interface DsaStep {
  id: string;
  stepNumber: number;
  title: string;
  subTopics: DsaSubTopic[];
}

export const striverA2ZSteps: DsaStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    title: "Beginner Problems",
    subTopics: [
      {
        id: "sub-2016",
        title: "Logic Building (Patterns)",
        problems: [
          {
            id: "p-1216",
            title: "Easy and Medium",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-1205",
            title: "Hard",
            difficulty: "Hard",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
        ],
      },
      {
        id: "sub-2017",
        title: "Patterns",
        problems: [
          {
            id: "p-401",
            title: "Pattern 1",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-412",
            title: "Pattern 2",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-416",
            title: "Pattern 3",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-417",
            title: "Pattern 4",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-418",
            title: "Pattern 5",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-419",
            title: "Pattern 6",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-420",
            title: "Pattern 7",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-421",
            title: "Pattern 8",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-422",
            title: "Pattern 9",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-402",
            title: "Pattern 10",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-403",
            title: "Pattern 11",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-404",
            title: "Pattern 12",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-405",
            title: "Pattern 13",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-406",
            title: "Pattern 14",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-407",
            title: "Pattern 15",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-408",
            title: "Pattern 16",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-409",
            title: "Pattern 17",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-410",
            title: "Pattern 18",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-411",
            title: "Pattern 19",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-413",
            title: "Pattern 20",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-414",
            title: "Pattern 21",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
          {
            id: "p-415",
            title: "Pattern 22",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=tNm_NNSB3_w&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=3",
          },
        ],
      },
      {
        id: "sub-2018",
        title: "Time Complexity",
        problems: [
          {
            id: "p-1219",
            title: "Theory with examples",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/FPu9Uld7W-E",
          },
        ],
      },
      {
        id: "sub-2019",
        title: "Standard Libraries & Collections",
        problems: [
          {
            id: "p-1218",
            title: "STL",
            difficulty: "Medium",
            ytVideo: "https://www.youtube.com/watch?v=RRVYpIET_RU",
          },
        ],
      },
      {
        id: "sub-2020",
        title: "Concept Basics",
        problems: [
          {
            id: "p-1203",
            title: "Basic Hashing",
            difficulty: "Easy",
            ytVideo: "https://www.youtube.com/watch?v=KEs5UyBJ39g",
          },
        ],
      },
      {
        id: "sub-2021",
        title: "Basic Maths",
        problems: [
          {
            id: "p-367",
            title: "Count all Digits of a Number",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/1xNbjMdbjug",
          },
          {
            id: "p-376",
            title: "Reverse a number",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/reverse-integer/",
            ytVideo: "https://youtu.be/1xNbjMdbjug?t=930",
          },
          {
            id: "p-374",
            title: "Palindrome Number",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/palindrome-number/",
            ytVideo: "https://youtu.be/1xNbjMdbjug?t=1230",
          },
          {
            id: "p-371",
            title: "Factorial of a given number",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=69ZCDFy-OUo&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=3",
          },
          {
            id: "p-366",
            title: "Check if the Number is Armstrong",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/armstrong-number/",
            ytVideo: "https://youtu.be/1xNbjMdbjug?t=1418",
          },
          {
            id: "p-365",
            title: "Check for Prime Number",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/1xNbjMdbjug?t=2381",
          },
          {
            id: "p-372",
            title: "GCD of Two Numbers",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/1xNbjMdbjug?t=2684",
          },
          {
            id: "p-370",
            title: "Divisors of a Number",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/1xNbjMdbjug?t=1580",
          },
        ],
      },
      {
        id: "sub-2022",
        title: "Basic Arrays",
        problems: [
          {
            id: "p-342",
            title: "Reverse an array",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=twuC1F6gLI8&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=4",
          },
        ],
      },
      {
        id: "sub-2023",
        title: "Basic Hashing",
        problems: [
          {
            id: "p-344",
            title: "Highest Occurring Element in an Array",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/frequency-of-the-most-frequent-element/",
          },
        ],
      },
      {
        id: "sub-2024",
        title: "Basic Strings",
        problems: [
          {
            id: "p-394",
            title: "Largest Odd Number in a String",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/largest-odd-number-in-string/",
          },
          {
            id: "p-395",
            title: "Longest Common Prefix",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/longest-common-prefix/",
          },
          {
            id: "p-393",
            title: "Isomorphic Strings",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/isomorphic-strings/",
          },
          {
            id: "p-398",
            title: "Rotate String",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/rotate-string/",
          },
          {
            id: "p-400",
            title: "Valid Anagram",
            difficulty: "Easy",
            leetcodeUrl:
              "https://leetcode.com/problems/valid-anagram/#:~:text=Given%20two%20strings%20s%20and,the%20original%20letters%20exactly%20once.&text=Constraints%3A,.length%20%3C%3D%205%20*%2010",
          },
          {
            id: "p-399",
            title: "Sort Characters by Frequency",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/sort-characters-by-frequency/",
          },
        ],
      },
      {
        id: "sub-2025",
        title: "Basic Recursion",
        problems: [
          {
            id: "p-386",
            title: "Sum of First N Numbers",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=69ZCDFy-OUo&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=3",
          },
          {
            id: "p-378",
            title: "Check if String is Palindrome or Not ",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
            ytVideo:
              "https://www.youtube.com/watch?v=twuC1F6gLI8&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=4",
          },
          {
            id: "p-379",
            title: "Check if the Array is Sorted II",
            difficulty: "Easy",
            leetcodeUrl:
              "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/#:~:text=Input%3A%20nums%20%3D%20%5B2%2C,no%20rotation)%20to%20make%20nums.",
            ytVideo: "https://youtu.be/37E9ckMDdTk?t=17224",
          },
          {
            id: "p-381",
            title: "Fibonacci Number",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/fibonacci-number/",
            ytVideo:
              "https://www.youtube.com/watch?v=kvRjNm4rVBE&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9&index=5",
          },
        ],
      },
      {
        id: "sub-add-10146",
        title: "Core Problem Solving Foundations",
        problems: [
          {
            id: "p-add-10147",
            title: "Running Sum of 1d Array",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/running-sum-of-1d-array/",
          },
          {
            id: "p-add-10148",
            title: "Richest Customer Wealth",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/richest-customer-wealth/",
          },
          {
            id: "p-add-10149",
            title: "Defanging an IP Address",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/defanging-an-ip-address/",
          },
          {
            id: "p-add-10150",
            title: "Jewels and Stones",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/jewels-and-stones/",
          },
          {
            id: "p-add-10151",
            title: "Maximum Number of Words Found in Sentences",
            difficulty: "Easy",
            leetcodeUrl:
              "https://leetcode.com/problems/maximum-number-of-words-found-in-sentences/",
          },
          {
            id: "p-add-10152",
            title: "Kids With the Greatest Number of Candies",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/",
          },
          {
            id: "p-add-10153",
            title: "Number of Good Pairs",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/number-of-good-pairs/",
          },
          {
            id: "p-add-10154",
            title: "Subtract the Product and Sum of Digits of an Integer",
            difficulty: "Easy",
            leetcodeUrl:
              "https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/",
          },
          {
            id: "p-add-10155",
            title: "How Many Numbers Are Smaller Than the Current Number",
            difficulty: "Easy",
            leetcodeUrl:
              "https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/",
          },
          {
            id: "p-add-10156",
            title: "Shuffle the Array",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/shuffle-the-array/",
          },
          {
            id: "p-add-10157",
            title: "Final Value of Variable After Performing Operations",
            difficulty: "Easy",
            leetcodeUrl:
              "https://leetcode.com/problems/final-value-of-variable-after-performing-operations/",
          },
          {
            id: "p-add-10158",
            title: "Convert the Temperature",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/convert-the-temperature/",
          },
          {
            id: "p-add-10159",
            title: "Smallest Even Multiple",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/smallest-even-multiple/",
          },
        ],
      },
    ],
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "Sorting ",
    subTopics: [
      {
        id: "sub-2026",
        title: "Algorithms",
        problems: [
          {
            id: "p-947",
            title: "Selection Sort",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/HGk_ypEuS24?t=167",
          },
          {
            id: "p-943",
            title: "Bubble Sort",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/HGk_ypEuS24?t=1061",
          },
          {
            id: "p-944",
            title: "Insertion Sorting",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/HGk_ypEuS24?t=1900",
          },
          {
            id: "p-945",
            title: "Merge Sorting",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/ogjf7ORKfd8",
          },
          {
            id: "p-946",
            title: "Quick Sorting",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/WIrA4YexLRQ",
          },
        ],
      },
      {
        id: "sub-add-10160",
        title: "Sorting Applications",
        problems: [
          {
            id: "p-add-10161",
            title: "Sort an Array (Merge / Quick Sort)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/sort-an-array/",
          },
          {
            id: "p-add-10162",
            title: "Sort Colors (Dutch National Flag)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
          },
          {
            id: "p-add-10163",
            title: "Largest Number",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/largest-number/",
          },
          {
            id: "p-add-10164",
            title: "Wiggle Sort II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/wiggle-sort-ii/",
          },
          {
            id: "p-add-10165",
            title: "Pancake Sorting",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/pancake-sorting/",
          },
        ],
      },
    ],
  },
  {
    id: "step-3",
    stepNumber: 3,
    title: "Arrays",
    subTopics: [
      {
        id: "sub-2027",
        title: "Fundamentals",
        problems: [
          {
            id: "p-41",
            title: "Linear Search",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/wvcQg43_V8U?t=2465",
          },
          {
            id: "p-38",
            title: "Largest Element ",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/37E9ckMDdTk?t=526",
          },
          {
            id: "p-43",
            title: "Second Largest Element",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/37E9ckMDdTk?t=810",
          },
          {
            id: "p-42",
            title: "Maximum Consecutive Ones",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/max-consecutive-ones/",
            ytVideo: "https://youtu.be/bYWLJb3vCWY?t=1124",
          },
          {
            id: "p-40",
            title: "Left Rotate Array by One",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/rotate-array/",
            ytVideo: "https://youtu.be/wvcQg43_V8U?t=61",
          },
          {
            id: "p-39",
            title: "Left Rotate Array by K Places",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/rotate-array/",
            ytVideo: "https://youtu.be/wvcQg43_V8U?t=485",
          },
        ],
      },
      {
        id: "sub-2028",
        title: "Logic Building",
        problems: [
          {
            id: "p-46",
            title: "Move Zeros to End",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/move-zeroes/",
            ytVideo: "https://youtu.be/wvcQg43_V8U?t=1633",
          },
          {
            id: "p-47",
            title: "Remove duplicates from sorted array",
            difficulty: "Easy",
            leetcodeUrl:
              "https://leetcode.com/problems/remove-duplicates-from-sorted-array/#:~:text=Input%3A%20nums%20%3D%20%5B0%2C,%2C%203%2C%20and%204%20respectively.",
            ytVideo: "https://youtu.be/37E9ckMDdTk?t=1887",
          },
          {
            id: "p-48",
            title: "Union of two sorted arrays",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/wvcQg43_V8U?t=2584",
          },
        ],
      },
      {
        id: "sub-2029",
        title: "FAQs(Medium)",
        problems: [
          {
            id: "p-22",
            title: "Majority Element-I",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/majority-element/",
            ytVideo: "https://youtu.be/nP_ns3uSh80",
          },
          {
            id: "p-30",
            title: "Leaders in an Array",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/cHrH9CQ8pmY",
          },
          {
            id: "p-34",
            title: "Rearrange array elements by sign",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
            ytVideo: "https://youtu.be/h4aBagy4Uok",
          },
          {
            id: "p-33",
            title: "Print the matrix in spiral manner",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/spiral-matrix/",
            ytVideo: "https://youtu.be/3Zv-s9UUrFM",
          },
          {
            id: "p-813",
            title: "Pascal's Triangle I",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/pascals-triangle/",
            ytVideo: "https://youtu.be/bR7mQgwQ_o8",
          },
          {
            id: "p-35",
            title: "Rotate matrix by 90 degrees",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/rotate-image/",
            ytVideo: "https://youtu.be/Z0R2u6gd3GU",
          },
          {
            id: "p-911",
            title: "Set Matrix Zeroes",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/",
            ytVideo: "https://youtu.be/N0MgLvceX7M",
          },
          {
            id: "p-37",
            title: "Two Sum",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/two-sum/",
            ytVideo: "https://youtu.be/UXDSeD9mN-k",
          },
          {
            id: "p-27",
            title: "3 Sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/3sum/",
            ytVideo: "https://youtu.be/DhFh8Kw7ymk",
          },
          {
            id: "p-28",
            title: "4 Sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/4sum/",
            ytVideo: "https://youtu.be/eD95WRfh81c",
          },
          {
            id: "p-36",
            title: "Sort an array of 0's 1's and 2's",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
            ytVideo: "https://youtu.be/tp8JIuCXBaU",
          },
          {
            id: "p-29",
            title: "Kadane's Algorithm",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/AHZpyENo7k4",
          },
          {
            id: "p-31",
            title: "Next Permutation",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/next-permutation/",
            ytVideo: "https://youtu.be/JDOXKqF60RQ",
          },
        ],
      },
      {
        id: "sub-2030",
        title: "FAQs(Hard)",
        problems: [
          {
            id: "p-23",
            title: "Majority Element-II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/majority-element-ii/",
            ytVideo: "https://youtu.be/vwZj1K0e9U8",
          },
          {
            id: "p-21",
            title: "Find the repeating and missing number",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/2D0D8HE6uak",
          },
          {
            id: "p-20",
            title: "Count Inversions",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/AseUmwVNaoY",
          },
          {
            id: "p-26",
            title: "Reverse Pairs",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/reverse-pairs/",
            ytVideo: "https://youtu.be/0e4bZaP3MDI",
          },
          {
            id: "p-24",
            title: "Maximum Product Subarray in an Array",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/",
          },
          {
            id: "p-25",
            title: "Merge two sorted arrays without extra space",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/merge-sorted-array/",
            ytVideo: "https://youtu.be/n7uwj04E0I4",
          },
        ],
      },
      {
        id: "sub-add-10031",
        title: "Interview Favorites on Arrays",
        problems: [
          {
            id: "p-add-10032",
            title: "Container With Most Water",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
          },
          {
            id: "p-add-10033",
            title: "Product of Array Except Self",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
          },
          {
            id: "p-add-10034",
            title: "Insert Delete GetRandom O(1)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/insert-delete-getrandom-o1/",
          },
          {
            id: "p-add-10035",
            title: "Gas Station",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/gas-station/",
          },
          {
            id: "p-add-10036",
            title: "Subarray Sums Divisible by K",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/subarray-sums-divisible-by-k/",
          },
          {
            id: "p-add-10037",
            title: "Continuous Subarray Sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/continuous-subarray-sum/",
          },
          {
            id: "p-add-10038",
            title: "Find All Numbers Disappeared in an Array",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
          },
          {
            id: "p-add-10039",
            title: "First Missing Positive",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/first-missing-positive/",
          },
          {
            id: "p-add-10040",
            title: "Game of Life",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/game-of-life/",
          },
          {
            id: "p-add-10041",
            title: "Spiral Matrix II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/spiral-matrix-ii/",
          },
          {
            id: "p-add-10042",
            title: "Find the Duplicate Number",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/find-the-duplicate-number/",
          },
          {
            id: "p-add-10043",
            title: "Next Greater Element III",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/next-greater-element-iii/",
          },
          {
            id: "p-add-10044",
            title: "3Sum Closest",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/3sum-closest/",
          },
          {
            id: "p-add-10045",
            title: "Summary Ranges",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/summary-ranges/",
          },
          {
            id: "p-add-10046",
            title: "Squares of a Sorted Array",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/squares-of-a-sorted-array/",
          },
          {
            id: "p-add-10047",
            title: "Two Sum II - Input Array Is Sorted",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
          },
        ],
      },
    ],
  },
  {
    id: "step-4",
    stepNumber: 4,
    title: "Hashing",
    subTopics: [
      {
        id: "sub-2032",
        title: "Theory",
        problems: [
          {
            id: "p-1203",
            title: "Basic Hashing",
            difficulty: "Easy",
            ytVideo: "https://www.youtube.com/watch?v=KEs5UyBJ39g",
          },
        ],
      },
      {
        id: "sub-2033",
        title: "FAQs",
        problems: [
          {
            id: "p-563",
            title: "Longest Consecutive Sequence in an Array",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/solution/",
            ytVideo: "https://youtu.be/oO5uLE7EUlM",
          },
          {
            id: "p-564",
            title: "Longest subarray with sum K",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/frf7qxiN2qU",
          },
          {
            id: "p-605",
            title: "Largest Subarray with Sum 0",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=xmguZ6GbatA&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=23",
          },
          {
            id: "p-561",
            title: "Count subarrays with given sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/",
            ytVideo:
              "https://www.youtube.com/watch?v=xvNwoz-ufXA&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&index=32",
          },
          {
            id: "p-562",
            title: "Count subarrays with given xor K",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/eZr-6p0B7ME",
          },
        ],
      },
      {
        id: "sub-add-10126",
        title: "Hashing Application Patterns",
        problems: [
          {
            id: "p-add-10127",
            title: "Group Anagrams",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/group-anagrams/",
          },
          {
            id: "p-add-10128",
            title: "Word Pattern",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/word-pattern/",
          },
          {
            id: "p-add-10129",
            title: "Subarray Sum Equals K",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/",
          },
          {
            id: "p-add-10130",
            title: "Contiguous Array (Equal 0s and 1s)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/contiguous-array/",
          },
        ],
      },
    ],
  },
  {
    id: "step-5",
    stepNumber: 5,
    title: "Binary Search",
    subTopics: [
      {
        id: "sub-2035",
        title: "Fundamentals",
        problems: [
          {
            id: "p-81",
            title: "Search X in sorted array",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/binary-search/",
            ytVideo: "https://youtu.be/MHf6awe89xw",
          },
          {
            id: "p-80",
            title: "Lower Bound ",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/6zhGS79oQ4k",
          },
          {
            id: "p-82",
            title: "Upper Bound",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/6zhGS79oQ4k",
          },
        ],
      },
      {
        id: "sub-2036",
        title: "Logic Building",
        problems: [
          {
            id: "p-89",
            title: "Search insert position",
            difficulty: "Easy",
            leetcodeUrl:
              "https://leetcode.com/problems/search-insert-position/#:~:text=Search%20Insert%20Position%20%2D%20LeetCode&text=Given%20a%20sorted%20array%20of,(log%20n)%20runtime%20complexity.",
            ytVideo: "https://youtu.be/6zhGS79oQ4k",
          },
          {
            id: "p-86",
            title: "Floor and Ceil in Sorted Array",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=6zhGS79oQ4k&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF&index=3",
          },
          {
            id: "p-85",
            title: "First and last occurrence",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
            ytVideo: "https://youtu.be/hjR1IYVx9lY",
          },
          {
            id: "p-87",
            title: "Search in rotated sorted array-I",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
            ytVideo:
              "https://www.youtube.com/watch?v=r3pMQ8-Ad5s&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=64",
          },
          {
            id: "p-88",
            title: "Search in rotated sorted array-II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
            ytVideo: "https://youtu.be/w2G2W8l__pc",
          },
          {
            id: "p-83",
            title: "Find minimum in Rotated Sorted Array",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
            ytVideo: "https://youtu.be/nhEMDKMB44g",
          },
          {
            id: "p-84",
            title: "Find out how many times the array is rotated",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/jtSiWTPLwd0",
          },
          {
            id: "p-90",
            title: "Single element in sorted array",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/single-element-in-a-sorted-array/",
            ytVideo: "https://youtu.be/AZOmHuHadxQ",
          },
        ],
      },
      {
        id: "sub-2037",
        title: "On answers",
        problems: [
          {
            id: "p-92",
            title: "Find square root of a number",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/Bsv3FPUX_BA",
          },
          {
            id: "p-91",
            title: "Find Nth root of a number",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=WjpswYrS2nY&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=62",
          },
          {
            id: "p-93",
            title: "Find the smallest divisor",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
            ytVideo: "https://youtu.be/UvBKTVaG6U8",
          },
          {
            id: "p-94",
            title: "Koko eating bananas",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
            ytVideo: "https://youtu.be/qyfekrNni90",
          },
          {
            id: "p-95",
            title: "Minimum days to make M bouquets",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
            ytVideo: "https://youtu.be/TXAuxeYBTdg",
          },
          {
            id: "p-161",
            title: "Capacity to Ship Packages Within D Days",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
            ytVideo: "https://youtu.be/MG-Ac4TAvTY",
          },
          {
            id: "p-600",
            title: "Kth Missing Positive Number",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/kth-missing-positive-number/#:~:text=Given%20an%20array%20arr%20of,13%2C...%5D.",
            ytVideo: "https://youtu.be/uZ0N_hZpyps",
          },
          {
            id: "p-805",
            title: "Painter's Partition",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=thUd_WJn6wk&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF&index=20",
          },
        ],
      },
      {
        id: "sub-2038",
        title: "FAQs",
        problems: [
          {
            id: "p-73",
            title: "Aggressive Cows",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/R_Mfw4ew-Vo",
          },
          {
            id: "p-74",
            title: "Book Allocation Problem",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=gYmWHvRHu-s&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=69",
          },
          {
            id: "p-75",
            title: "Find peak element",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/find-peak-element/#:~:text=Find%20Peak%20Element%20%2D%20LeetCode&text=A%20peak%20element%20is%20an,to%20any%20of%20the%20peaks.",
            ytVideo: "https://youtu.be/cXxmbemS6XM",
          },
          {
            id: "p-77",
            title: "Median of 2 sorted arrays",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
            ytVideo:
              "https://www.youtube.com/watch?v=NTop3VTjmxk&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=65",
          },
          {
            id: "p-76",
            title: "Kth element of 2 sorted arrays",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=nv7F4PiLUzo&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=66",
          },
          {
            id: "p-78",
            title: "Minimize Max Distance to Gas Station",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/minimize-max-distance-to-gas-station/",
            ytVideo:
              "https://www.youtube.com/watch?v=kMSBvlZ-_HA&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF&index=21",
          },
          {
            id: "p-79",
            title: "Split array - largest sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/split-array-largest-sum/",
            ytVideo:
              "https://www.youtube.com/watch?v=thUd_WJn6wk&list=PLgUwDviBIf0pMFMWuuvDNMAkoQFi-h0ZF&index=20",
          },
        ],
      },
      {
        id: "sub-2039",
        title: "2D Arrays",
        problems: [
          {
            id: "p-66",
            title: "Find row with maximum 1's",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/SCz-1TtYxDI",
          },
          {
            id: "p-69",
            title: "Search in a 2D Matrix",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
            ytVideo: "https://youtu.be/ZYpYur0znng",
          },
          {
            id: "p-68",
            title: "Search in 2D matrix - II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
            ytVideo: "https://youtu.be/9ZbB397jU4k",
          },
          {
            id: "p-65",
            title: "Find Peak Element - II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/find-a-peak-element-ii/",
            ytVideo: "https://youtu.be/nGGp5XBzC4g?si=WCop5C6Azj5gAELH",
          },
          {
            id: "p-67",
            title: "Matrix Median",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/Q9wXgdxJq48?si=ScI_0uzJh7yg8nrX",
          },
        ],
      },
      {
        id: "sub-add-10136",
        title: "Binary Search Edge Cases & 2D Matrices",
        problems: [
          {
            id: "p-add-10137",
            title: "Search a 2D Matrix II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
          },
          {
            id: "p-add-10138",
            title: "Find Peak Element II (2D Peak)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/find-a-peak-element-ii/",
          },
          {
            id: "p-add-10139",
            title: "Median of Two Sorted Arrays",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
          },
          {
            id: "p-add-10140",
            title: "Kth Smallest Element in a Sorted Matrix",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
          },
          {
            id: "p-add-10141",
            title: "Find in Mountain Array",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/find-in-mountain-array/",
          },
        ],
      },
    ],
  },
  {
    id: "step-6",
    stepNumber: 6,
    title: "Recursion",
    subTopics: [
      {
        id: "sub-2041",
        title: "Implementation Problems",
        problems: [
          {
            id: "p-877",
            title: "Pow(x,n)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/powx-n/",
            ytVideo: "https://youtu.be/l0YC3876qxg",
          },
          {
            id: "p-876",
            title: "Generate Parentheses",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/",
          },
          {
            id: "p-878",
            title: "Power Set",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=b7AYbpM5YrE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=67",
          },
        ],
      },
      {
        id: "sub-2043",
        title: "FAQs (Medium)",
        problems: [
          {
            id: "p-864",
            title: "Combination Sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
            ytVideo:
              "https://www.youtube.com/watch?v=OyZFFqQtu98&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=49",
          },
          {
            id: "p-865",
            title: "Combination Sum II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/combination-sum-ii/",
            ytVideo:
              "https://www.youtube.com/watch?v=G1fRTGRxXU8&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=50",
          },
          {
            id: "p-867",
            title: "Subsets I",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=rYkfBRtMJr8&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=52",
          },
          {
            id: "p-868",
            title: "Subsets II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/subsets-ii/",
            ytVideo:
              "https://www.youtube.com/watch?v=RIn3gOkbhQE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=53",
          },
          {
            id: "p-866",
            title: "Combination Sum III",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/combination-sum-iii/",
          },
        ],
      },
      {
        id: "sub-2044",
        title: "Hard",
        problems: [
          {
            id: "p-875",
            title: "Letter Combinations of a Phone Number",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
          },
        ],
      },
      {
        id: "sub-2045",
        title: "FAQs (Hard)",
        problems: [
          {
            id: "p-871",
            title: "Palindrome partitioning",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/_H8V5hJUGd0",
          },
          {
            id: "p-874",
            title: "Word Search",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/word-search/",
          },
          {
            id: "p-870",
            title: "N Queen",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/n-queens/",
            ytVideo:
              "https://www.youtube.com/watch?v=i05Ju7AftcM&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=57",
          },
          {
            id: "p-872",
            title: "Rat in a Maze",
            difficulty: "Hard",
            ytVideo:
              "https://www.youtube.com/watch?v=bLGZhJlt4y0&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=60",
          },
          {
            id: "p-869",
            title: "M Coloring Problem",
            difficulty: "Hard",
            ytVideo:
              "https://www.youtube.com/watch?v=wuVwUK25Rfc&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=59",
          },
          {
            id: "p-873",
            title: "Sudoku Solver",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/sudoku-solver/",
            ytVideo:
              "https://www.youtube.com/watch?v=FWAIf_EVUKE&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=58",
          },
        ],
      },
      {
        id: "sub-add-10131",
        title: "Backtracking Problem Set",
        problems: [
          {
            id: "p-add-10132",
            title: "N-Queens II",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/n-queens-ii/",
          },
          {
            id: "p-add-10133",
            title: "Restore IP Addresses",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/restore-ip-addresses/",
          },
          {
            id: "p-add-10134",
            title: "Permutations II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/permutations-ii/",
          },
          {
            id: "p-add-10135",
            title: "Combinations (n choose k)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/combinations/",
          },
        ],
      },
    ],
  },
  {
    id: "step-7",
    stepNumber: 7,
    title: "Linked-List",
    subTopics: [
      {
        id: "sub-2047",
        title: "Fundamentals (Single LL)",
        problems: [
          {
            id: "p-1237",
            title: "Introduction to Singly LinkedList",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/Nq7ok-OyEpg?si=9PR1o8OPRWil7fRA",
          },
          {
            id: "p-352",
            title: "Deletion of the head of LL",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/delete-node-in-a-linked-list/",
            ytVideo: "https://youtu.be/VaECK03Dz-g?si=CRaBHbOo2bHFbOT5",
          },
          {
            id: "p-356",
            title: "Insertion at the head of Linked List",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/VaECK03Dz-g?si=vHSwdf9jhE05adKM&t=1934",
          },
        ],
      },
      {
        id: "sub-2048",
        title: "Fundamentals (Doubly LL)",
        problems: [
          {
            id: "p-1234",
            title: "Introduction to Doubly LL",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/0eKMU10uEDI?si=uDnoj_C5ghEpNLvP",
          },
          {
            id: "p-361",
            title: "Insert node before head in Doubly Linked List",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/0eKMU10uEDI?si=J5a0pQTosimcO_aA&t=2684",
          },
        ],
      },
      {
        id: "sub-2049",
        title: "Logic Building",
        problems: [
          {
            id: "p-625",
            title: "Add two numbers in Linked List",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
            ytVideo:
              "https://www.youtube.com/watch?v=LBVsXSMOIk4&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=32",
          },
          {
            id: "p-628",
            title: "Segregate odd and even nodes in Linked List",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/odd-even-linked-list/",
            ytVideo: "https://youtu.be/qf6qp7GzD5Q?si=JozAyXUdT8EJMSCQ",
          },
          {
            id: "p-629",
            title: "Sort a Linked List of 0's 1's and 2's",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/gRII7LhdJWc?si=l3qRC7w3NhY7OAqw",
          },
          {
            id: "p-626",
            title: "Remove Nth node from the back of the LL",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
            ytVideo: "https://youtu.be/3kMKYQ2wNIU?si=DtFDnPU7z9HMz_GM",
          },
          {
            id: "p-627",
            title: "Reverse a LL",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
            ytVideo: "https://youtu.be/D2vI2DNJGd8?si=RCaLSx01qR21IBdh",
          },
        ],
      },
      {
        id: "sub-2050",
        title: "FAQs (Medium)",
        problems: [
          {
            id: "p-617",
            title: "Add one to a number represented by LL",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/aXQWhbvT3w0?si=uRgU9S4r5cVmnUy7",
          },
          {
            id: "p-448",
            title: "Find Middle of Linked List",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/middle-of-the-linked-list/",
            ytVideo: "https://youtu.be/7LjQ57RqgEc?si=ir_rRDio38rhamU_",
          },
          {
            id: "p-619",
            title: "Delete the middle node in LL",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/#:~:text=You%20are%20given%20the%20head,than%20or%20equal%20to%20x%20.",
            ytVideo: "https://youtu.be/ePpV-_pfOeI?si=Au9GsZkVO57j6SiN",
          },
          {
            id: "p-618",
            title: "Check if LL is palindrome or not",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/palindrome-linked-list/",
            ytVideo: "https://youtu.be/lRY_G-u_8jk?si=BpM8hRYvXSYyjl-G",
          },
          {
            id: "p-621",
            title: "Find the intersection point of Y LL",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
            ytVideo: "https://youtu.be/0DYoPz2Tpt4?si=L-uJs5yXUxj4VJM2",
          },
          {
            id: "p-620",
            title: "Detect a loop in LL",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
            ytVideo: "https://youtu.be/wiOo4DC5GGA?si=zagt6O6tFXc4_3cx",
          },
          {
            id: "p-622",
            title: "Find the starting point in LL",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle-ii/",
            ytVideo: "https://youtu.be/2Kd0KKmmHFc?si=7UreDPRjRvapeVB0",
          },
          {
            id: "p-623",
            title: "Length of loop in LL",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/I4g1qbkTPus?si=ONktpqewvx57T8pF",
          },
        ],
      },
      {
        id: "sub-2051",
        title: "FAQs (Hard)",
        problems: [
          {
            id: "p-614",
            title: "Reverse LL in group of given size K",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
            ytVideo: "https://youtu.be/lIar1skcQYI?si=_jFghHKX4eaK36a1",
          },
          {
            id: "p-615",
            title: "Rotate a LL",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/rotate-list/description/",
            ytVideo: "https://youtu.be/uT7YI7XbTY8?si=ZaChW3a68c_v54Is",
          },
          {
            id: "p-613",
            title: "Merge two Sorted Lists ",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
            ytVideo:
              "https://www.youtube.com/watch?v=Xb4slcp1U38&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=29",
          },
          {
            id: "p-612",
            title: "Flattening of LL",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/ykelywHJWLg?si=InMg9MmTHzY22NSR",
          },
          {
            id: "p-616",
            title: "Sort LL",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/sort-list/",
            ytVideo: "https://youtu.be/8ocB7a_c-Cc?si=Gv-Y8q8-WyARoV35",
          },
          {
            id: "p-611",
            title: "Clone a LL with random and next pointer",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/",
            ytVideo: "https://youtu.be/q570bKdrnlw?si=epZtpWvtNwuTf23o",
          },
        ],
      },
      {
        id: "sub-2052",
        title: "FAQS (DLL)",
        problems: [
          {
            id: "p-609",
            title: "Delete all occurrences of a key in DLL",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/Mh0NH_SD92k?si=tCYshBRi1upMqSVz",
          },
          {
            id: "p-610",
            title: "Remove duplicates from sorted DLL",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/YJKVTnOJXSY?si=AsZoNUoewetsBjr0",
          },
          {
            id: "p-452",
            title: "Find Pairs with Given Sum in Doubly Linked List",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/YitR4dQsddE?si=iZAC259hdngV_OxC",
          },
        ],
      },
      {
        id: "sub-add-10020",
        title: "Hard & Design Linked List Problems",
        problems: [
          {
            id: "p-add-10021",
            title: "LRU Cache Design",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
          },
          {
            id: "p-add-10022",
            title: "LFU Cache Design",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/lfu-cache/",
          },
          {
            id: "p-add-10023",
            title: "Copy List with Random Pointer",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/",
          },
          {
            id: "p-add-10024",
            title: "Reverse Nodes in k-Group",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
          },
          {
            id: "p-add-10025",
            title: "Flatten a Multilevel Doubly Linked List",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
          },
          {
            id: "p-add-10026",
            title: "Reorder List",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/reorder-list/",
          },
          {
            id: "p-add-10027",
            title: "Swap Nodes in Pairs",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/swap-nodes-in-pairs/",
          },
          {
            id: "p-add-10028",
            title: "Partition List",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/partition-list/",
          },
          {
            id: "p-add-10029",
            title: "Remove Duplicates from Sorted List II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/",
          },
          {
            id: "p-add-10030",
            title: "Merge In Between Linked Lists",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/merge-in-between-linked-lists/",
          },
        ],
      },
    ],
  },
  {
    id: "step-8",
    stepNumber: 8,
    title: "Bit Manipulation",
    subTopics: [
      {
        id: "sub-2054",
        title: "Theory",
        problems: [
          {
            id: "p-1155",
            title: "Introduction to Bits and Tricks",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/qQd-ViW7bfk?si=QtdNaRhHmZb08Mr8",
          },
        ],
      },
      {
        id: "sub-2055",
        title: "Problems",
        problems: [
          {
            id: "p-141",
            title: "Minimum Bit Flips to Convert Number",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/",
            ytVideo: "https://youtu.be/OOdrmcfZXd8?si=rnkRVz1UiVBKWC69",
          },
          {
            id: "p-143",
            title: "Single Number - I",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/single-number/",
            ytVideo: "https://youtu.be/bYWLJb3vCWY?t=1369",
          },
          {
            id: "p-145",
            title: "Single Number - III",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/UA5JnV1J2sI?si=VFBRJyb3boZvx_r1",
          },
          {
            id: "p-140",
            title: "Divide two numbers without multiplication and division",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/divide-two-integers/",
            ytVideo: "https://youtu.be/pBD4B1tzgVc?si=G9c5pEE-RrzeU6sz",
          },
          {
            id: "p-142",
            title: "Power Set Bit Manipulation",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/subsets/",
            ytVideo: "https://youtu.be/LqKaUv1G3_I?si=UXU_T5OsHiokPRvP",
          },
          {
            id: "p-146",
            title: "XOR of numbers in a given range",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/WqGb7159h7Q?si=uGUEbNUUaIN_6Vvr",
          },
        ],
      },
      {
        id: "sub-add-10012",
        title: "Advanced Bit Manipulation",
        problems: [
          {
            id: "p-add-10013",
            title: "Power of Two",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/power-of-two/",
          },
          {
            id: "p-add-10014",
            title: "Counting Bits",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/counting-bits/",
          },
          {
            id: "p-add-10015",
            title: "Reverse Bits",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/reverse-bits/",
          },
          {
            id: "p-add-10016",
            title: "Single Number II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/single-number-ii/",
          },
          {
            id: "p-add-10017",
            title: "Single Number III",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/single-number-iii/",
          },
          {
            id: "p-add-10018",
            title: "Subsets using Bitmasking",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/subsets/",
          },
          {
            id: "p-add-10019",
            title: "Bitwise AND of Numbers Range",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
          },
        ],
      },
    ],
  },
  {
    id: "step-9",
    stepNumber: 9,
    title: "Greedy Algorithms",
    subTopics: [
      {
        id: "sub-2057",
        title: "Easy",
        problems: [
          {
            id: "p-541",
            title: "Assign Cookies",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/assign-cookies/",
            ytVideo: "https://youtu.be/DIX2p7vb9co?si=GofAIDimue-Av0Fi",
          },
          {
            id: "p-543",
            title: "Lemonade Change",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/lemonade-change/",
            ytVideo: "https://youtu.be/n_tmibEhO6Q?si=q1NW8MfPy0QU6fIl",
          },
          {
            id: "p-489",
            title: "Fractional Knapsack",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/1ibsQrnuEEg?si=8R2By3wpHo0zZVHE",
          },
          {
            id: "p-542",
            title: "Jump Game - I",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/jump-game/",
            ytVideo: "https://youtu.be/tZAa_jJ3SwQ?si=voKd7n9VTLDRRNzJ",
          },
        ],
      },
      {
        id: "sub-2058",
        title: "Scheduling and Interval Problems",
        problems: [
          {
            id: "p-551",
            title: "Shortest Job First",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/3-QbX1iDbXs?si=IH8QZUblr01F7UoQ",
          },
          {
            id: "p-547",
            title: "Job sequencing Problem",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/QbwltemZbRg?si=wvcemJ5BLPlTRmkG",
          },
          {
            id: "p-549",
            title: "N meetings in one room",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/mKfhTotEguk?si=2RELeq18mpmIIN3Q",
          },
          {
            id: "p-550",
            title: "Non-overlapping Intervals",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/",
            ytVideo: "https://youtu.be/HDHQ8lAWakY?si=JVtLqboGdpUTOVjf",
          },
          {
            id: "p-546",
            title: "Insert Interval",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/insert-interval/",
            ytVideo: "https://youtu.be/xxRE-46OCC8?si=a7aPuIw16zDx2lAa",
          },
          {
            id: "p-712",
            title: "Merge Intervals",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",
            ytVideo:
              "https://www.youtube.com/watch?v=2JzRBPFYbKE&list=PLgUwDviBIf0rPG3Ictpu74YWBQ1CaBkm2&index=6",
          },
          {
            id: "p-548",
            title: "Minimum number of platforms required for a railway",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/AsGzwR_FWok?si=165acXU_dtqOHuo9",
          },
        ],
      },
      {
        id: "sub-2059",
        title: "Hard",
        problems: [
          {
            id: "p-545",
            title: "Valid Paranthesis Checker",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/valid-parenthesis-string/",
            ytVideo: "https://youtu.be/cHT6sG_hUZI?si=XRHeyh7jOaLaTy3g",
          },
          {
            id: "p-544",
            title: "Candy",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/candy/",
            ytVideo: "https://youtu.be/IIqVFvKE6RY?si=EjmuXZJNLQLUkEd7",
          },
          {
            id: "p-595",
            title: "Jump Game II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/jump-game-ii/",
            ytVideo: "https://youtu.be/7SBVnw7GSTk?si=9uUouBELh9K3m2jZ",
          },
        ],
      },
      {
        id: "sub-add-10142",
        title: "Greedy Interval & Resource Scheduling",
        problems: [
          {
            id: "p-add-10143",
            title: "Minimum Number of Arrows to Burst Balloons",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
          },
          {
            id: "p-add-10144",
            title: "Partition Labels",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/partition-labels/",
          },
          {
            id: "p-add-10145",
            title: "Queue Reconstruction by Height",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/queue-reconstruction-by-height/",
          },
        ],
      },
    ],
  },
  {
    id: "step-10",
    stepNumber: 10,
    title: "Sliding Window / 2 Pointer",
    subTopics: [
      {
        id: "sub-2062",
        title: "Constant Window",
        problems: [
          {
            id: "p-922",
            title: "Maximum Points You Can Obtain from Cards ",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
            ytVideo: "https://youtu.be/pBWCOCS636U?si=-X64rY67noxvOwrG",
          },
        ],
      },
      {
        id: "sub-2063",
        title: "Longest and Smallest Window Problems",
        problems: [
          {
            id: "p-929",
            title: "Longest Substring Without Repeating Characters",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
            ytVideo: "https://youtu.be/-zSxTJkcdAo?si=I2zfR-vlDMg0zU9z",
          },
          {
            id: "p-930",
            title: " Max Consecutive Ones III",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/max-consecutive-ones-iii/",
            ytVideo: "https://youtu.be/3E4JBHSLpYk?si=SoOW64pP6otEKxBw",
          },
          {
            id: "p-926",
            title: " Fruit Into Baskets",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/fruit-into-baskets/description/",
            ytVideo: "https://youtu.be/e3bs0uA1NhQ?si=gR8pO62u-nJeFAXk",
          },
          {
            id: "p-928",
            title: "Longest Substring With At Most K Distinct Characters",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
            ytVideo: "https://youtu.be/teM9ZsVRQyc?si=Kh0_u6aCkkBU3Q33",
          },
          {
            id: "p-927",
            title: "Longest Repeating Character Replacement",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/",
            ytVideo: "https://youtu.be/_eNhaDCr6P0?si=pBWcEjozF5poom0p",
          },
          {
            id: "p-931",
            title: "Minimum Window Substring ",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
            ytVideo: "https://youtu.be/WJaij9ffOIY?si=-xnsWIH84zWU0ICd",
          },
        ],
      },
      {
        id: "sub-2064",
        title: "Counting Subarrays / Substrings Problems",
        problems: [
          {
            id: "p-925",
            title: "Number of Substrings Containing All Three Characters",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
            ytVideo: "https://youtu.be/xtqN4qlgr8s?si=kuaLHVOLXhh5Z2tW",
          },
          {
            id: "p-923",
            title: "Binary Subarrays With Sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/binary-subarrays-with-sum/",
            ytVideo: "https://youtu.be/XnMdNUkX6VM?si=Nyt8EveeLUg8lmty",
          },
          {
            id: "p-924",
            title: "Count number of Nice subarrays",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/count-number-of-nice-subarrays/",
            ytVideo: "https://youtu.be/j_QOv9OT9Og?si=Oq5-5hyFkzVSOZpP",
          },
          {
            id: "p-988",
            title: "Subarrays with K Different Integers",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/subarrays-with-k-different-integers/",
            ytVideo: "https://youtu.be/7wYGbV_LsX4?si=KWa48RgLDCvdNqRb",
          },
        ],
      },
      {
        id: "sub-add-10048",
        title: "Advanced Sliding Window",
        problems: [
          {
            id: "p-add-10049",
            title: "Permutation in String",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/permutation-in-string/",
          },
          {
            id: "p-add-10050",
            title: "Find All Anagrams in a String",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
          },
          {
            id: "p-add-10051",
            title: "Minimum Size Subarray Sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/minimum-size-subarray-sum/",
          },
          {
            id: "p-add-10052",
            title: "Sliding Window Median",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/sliding-window-median/",
          },
        ],
      },
    ],
  },
  {
    id: "step-11",
    stepNumber: 11,
    title: "Stack / Queues",
    subTopics: [
      {
        id: "sub-2066",
        title: "Implementation ",
        problems: [
          {
            id: "p-390",
            title: "Implement Stack using Arrays",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
          },
          {
            id: "p-387",
            title: "Implement Queue using Arrays",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
          },
          {
            id: "p-392",
            title: "Implement Stack using Queue",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/implement-stack-using-queues/",
            ytVideo: "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
          },
          {
            id: "p-389",
            title: "Implement Queue using Stack",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks/",
            ytVideo: "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
          },
          {
            id: "p-391",
            title: "Implement stack using Linkedlist",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
          },
          {
            id: "p-388",
            title: "Implement queue using Linkedlist",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/tqQ5fTamIN4?si=ofLt8Zt1ZvhikZ6w",
          },
          {
            id: "p-966",
            title: "Balanced Paranthesis",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
            ytVideo: "https://youtu.be/xwjS0iZhw4I?si=UoyKpFn4Q3nf5h2R",
          },
        ],
      },
      {
        id: "sub-2067",
        title: "Monotonic Stack",
        problems: [
          {
            id: "p-968",
            title: "Next Greater Element",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/next-greater-element-i/",
            ytVideo: "https://youtu.be/e7XQLtOQM3I?si=QdcHpTtx6gAHsext",
          },
          {
            id: "p-969",
            title: "Next Greater Element - 2",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/next-greater-element-ii/",
            ytVideo: "https://youtu.be/7PrncD7v9YQ?si=UkBc7eVy9HGlBpeW",
          },
          {
            id: "p-967",
            title: "Asteroid Collision",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/asteroid-collision/",
            ytVideo: "https://youtu.be/_eYGqw_VDR4?si=YyxibcHq800RqgIQ",
          },
          {
            id: "p-971",
            title: "Sum of Subarray Minimums",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/sum-of-subarray-minimums/",
            ytVideo: "https://youtu.be/v0e8p9JCgRc?si=XAU7ekECgS5nboRw",
          },
          {
            id: "p-972",
            title: "Sum of Subarray Ranges",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/sum-of-subarray-ranges/",
            ytVideo: "https://youtu.be/gIrMptNPf5M?si=Q_GHuBvzZVs27X_U",
          },
          {
            id: "p-970",
            title: "Remove K Digits",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/remove-k-digits/",
            ytVideo: "https://youtu.be/jmbuRzYPGrg?si=WN387gwQ7aXWkUao",
          },
        ],
      },
      {
        id: "sub-2068",
        title: "FAQs",
        problems: [
          {
            id: "p-958",
            title: "Implement Min Stack",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/min-stack/",
            ytVideo: "https://youtu.be/NdDIaH91P0g?si=4_Jbsq5trFvfSdUY",
          },
          {
            id: "p-963",
            title: "Sliding Window Maximum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/",
            ytVideo: "https://youtu.be/NwBvene4Imo?si=eU1PY-bcQfk5wdog",
          },
          {
            id: "p-965",
            title: "Trapping Rainwater",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
            ytVideo: "https://youtu.be/1_5VuquLbXg?si=NFG6df318_6OtGvg",
          },
          {
            id: "p-959",
            title: "Largest rectangle in a histogram",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
            ytVideo: "https://youtu.be/Bzat9vgD0fs?si=DiBlLejXcr6EJoyB",
          },
          {
            id: "p-962",
            title: "Maximum Rectangles",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/maximal-rectangle/",
            ytVideo: "https://youtu.be/tOylVCugy9k",
          },
          {
            id: "p-964",
            title: "Stock span problem",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/online-stock-span/",
            ytVideo: "https://youtu.be/eay-zoSRkVc?si=deNNe5i38BOAntha",
          },
          {
            id: "p-957",
            title: "Celebrity Problem",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/accounts/login/?next=/problems/find-the-celebrity/",
            ytVideo: "https://youtu.be/cEadsbTeze4?si=olXYfOs7l-SEn2zl",
          },
          {
            id: "p-960",
            title: "LFU Cache",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/lfu-cache/",
            ytVideo:
              "https://www.youtube.com/watch?v=0PSB9y8ehbk&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=79",
          },
        ],
      },
      {
        id: "sub-add-10053",
        title: "Monotonic Stack & Queue Problems",
        problems: [
          {
            id: "p-add-10054",
            title: "Largest Rectangle in Histogram",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
          },
          {
            id: "p-add-10055",
            title: "Maximal Rectangle",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/maximal-rectangle/",
          },
          {
            id: "p-add-10056",
            title: "Online Stock Span",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/online-stock-span/",
          },
          {
            id: "p-add-10057",
            title: "Daily Temperatures",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
          },
          {
            id: "p-add-10058",
            title: "Basic Calculator",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/basic-calculator/",
          },
          {
            id: "p-add-10059",
            title: "Basic Calculator II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/basic-calculator-ii/",
          },
          {
            id: "p-add-10060",
            title: "Evaluate Reverse Polish Notation",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
          },
          {
            id: "p-add-10061",
            title: "132 Pattern",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/132-pattern/",
          },
          {
            id: "p-add-10062",
            title: "Remove Duplicate Letters",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/remove-duplicate-letters/",
          },
        ],
      },
    ],
  },
  {
    id: "step-12",
    stepNumber: 12,
    title: "Binary Trees",
    subTopics: [
      {
        id: "sub-2070",
        title: "Theory/Traversals",
        problems: [
          {
            id: "p-1154",
            title: "Introduction ",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/_ANrF3FJm7I",
          },
          {
            id: "p-133",
            title: "Inorder Traversal",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            ytVideo: "https://youtu.be/lxTGsVXjwvM",
          },
          {
            id: "p-137",
            title: "Preorder Traversal",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-preorder-traversal/",
            ytVideo: "https://youtu.be/RlUu72JrOCQ",
          },
          {
            id: "p-135",
            title: "Postorder Traversal",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-postorder-traversal/",
            ytVideo: "https://youtu.be/2YBhNLodD8Q",
          },
          {
            id: "p-134",
            title: "Level Order Traversal",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
            ytVideo: "https://youtu.be/EoAsWbO7sqg",
          },
          {
            id: "p-136",
            title: "Pre, Post, Inorder in one traversal",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/ySp2epYvgTE",
          },
        ],
      },
      {
        id: "sub-2071",
        title: "Medium Problems",
        problems: [
          {
            id: "p-131",
            title: "Maximum Depth in BT",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
            ytVideo: "https://youtu.be/eD3tmO66aBA",
          },
          {
            id: "p-129",
            title: "Check if two trees are identical or not",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/same-tree/",
            ytVideo: "https://youtu.be/BhuvF_-PWS0",
          },
          {
            id: "p-127",
            title: "Check for balanced binary tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/balanced-binary-tree/",
            ytVideo: "https://youtu.be/Yt50Jfbd8Po",
          },
          {
            id: "p-130",
            title: "Diameter of Binary Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/",
            ytVideo: "https://youtu.be/Rezetez59Nk",
          },
          {
            id: "p-132",
            title: "Maximum path sum ",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
            ytVideo: "https://youtu.be/WszrfSwMz58",
          },
          {
            id: "p-128",
            title: "Check for symmetrical BTs",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/symmetric-tree/",
            ytVideo: "https://www.youtube.com/watch?v=nKggNAiEpBE",
          },
          {
            id: "p-185",
            title: "Children Sum Property in Binary Tree",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/fnmisPM6cVo",
          },
        ],
      },
      {
        id: "sub-2072",
        title: "FAQs",
        problems: [
          {
            id: "p-126",
            title: "Zig Zag or Spiral Traversal",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
            ytVideo: "https://youtu.be/3OXWEdlIGl4",
          },
          {
            id: "p-116",
            title: "Boundary Traversal",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/boundary-of-binary-tree/",
            ytVideo: "https://youtu.be/0ca1nvR0be4",
          },
          {
            id: "p-125",
            title: "Vertical Order Traversal",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
            ytVideo: "https://youtu.be/q_a6lpbKJdw",
          },
          {
            id: "p-124",
            title: "Top View of BT",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/Et9OCDNvJ78",
          },
          {
            id: "p-115",
            title: "Bottom view of BT",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/0FtVY6I4pB8",
          },
          {
            id: "p-123",
            title: "Right/Left View of BT",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/",
            ytVideo: "https://youtu.be/KV4mRzTjlAk",
          },
          {
            id: "p-122",
            title: "Print root to leaf path in BT",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/fmflMqVOC7k",
          },
          {
            id: "p-118",
            title: "LCA in BT",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
            ytVideo: "https://youtu.be/_-QHfMDde90",
          },
          {
            id: "p-119",
            title: "Maximum Width of BT",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/maximum-width-of-binary-tree/",
            ytVideo: "https://youtu.be/ZbybYvcVLks",
          },
          {
            id: "p-121",
            title: "Print all nodes at a distance of K in BT",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
            ytVideo: "https://youtu.be/i9ORlEy6EsI",
          },
          {
            id: "p-120",
            title: "Minimum time taken to burn the BT from a given Node",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/2r5wLmQfD6g",
          },
          {
            id: "p-117",
            title: "Count total nodes in a complete BT",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/count-complete-tree-nodes/",
            ytVideo: "https://youtu.be/u-yWemKGWO0",
          },
          {
            id: "p-486",
            title: "Flatten Binary Tree to Linked List",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
            ytVideo: "https://youtu.be/sWf7k1x9XR4",
          },
        ],
      },
      {
        id: "sub-2073",
        title: "Construction Problems",
        problems: [
          {
            id: "p-111",
            title: "Requirements needed to construct a unique BT",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/9GMECGQgWrQ",
          },
          {
            id: "p-110",
            title: "Construct a BT from Preorder and Inorder",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
            ytVideo: "https://youtu.be/aZNaLrVebKQ",
          },
          {
            id: "p-109",
            title: "Construct a BT from Postorder and Inorder",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
            ytVideo: "https://youtu.be/LgLRTaEMRVc",
          },
          {
            id: "p-112",
            title: "Serialize and De-serialize BT",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
            ytVideo: "https://youtu.be/-YbXySKJsX8",
          },
        ],
      },
      {
        id: "sub-2074",
        title: "Traversal in Constant Space",
        problems: [
          {
            id: "p-139",
            title: "Morris Inorder Traversal ",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            ytVideo: "https://youtu.be/80Zug6D1_r4",
          },
          {
            id: "p-138",
            title: "Morris Preorder Traversal ",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
            ytVideo: "https://youtu.be/80Zug6D1_r4",
          },
        ],
      },
      {
        id: "sub-add-10063",
        title: "Binary Tree Path & Construction",
        problems: [
          {
            id: "p-add-10064",
            title: "Construct Binary Tree from Inorder and Postorder Traversal",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
          },
          {
            id: "p-add-10065",
            title: "Path Sum II (Find all root-to-leaf paths)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/path-sum-ii/",
          },
          {
            id: "p-add-10066",
            title: "Path Sum III",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/path-sum-iii/",
          },
          {
            id: "p-add-10067",
            title: "Populating Next Right Pointers in Each Node",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/",
          },
          {
            id: "p-add-10068",
            title: "All Nodes Distance K in Binary Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
          },
          {
            id: "p-add-10069",
            title: "Binary Tree Cameras",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/binary-tree-cameras/",
          },
          {
            id: "p-add-10070",
            title: "House Robber III (Tree DP)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/house-robber-iii/",
          },
          {
            id: "p-add-10071",
            title: "Step-By-Step Directions From a Binary Tree Node to Another",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/",
          },
          {
            id: "p-add-10072",
            title: "Serialize and Deserialize Binary Tree",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
          },
          {
            id: "p-add-10073",
            title: "Invert Binary Tree",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
          },
        ],
      },
    ],
  },
  {
    id: "step-13",
    stepNumber: 13,
    title: "Binary Search Trees",
    subTopics: [
      {
        id: "sub-2076",
        title: "Theory and Basics",
        problems: [
          {
            id: "p-1153",
            title: "Introduction to BST",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/p7-9UvDQZ3w",
          },
          {
            id: "p-108",
            title: "Search in BST",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
            ytVideo: "https://youtu.be/KcNt6v_56cc",
          },
          {
            id: "p-107",
            title: "Floor and Ceil in a BST",
            difficulty: "Easy",
            ytVideo:
              "https://www.youtube.com/watch?v=xm_W1ub-K-w&list=PLgUwDviBIf0q8Hkd7bK2Bpryj2xVJk8Vk&index=43",
          },
        ],
      },
      {
        id: "sub-2077",
        title: "Medium",
        problems: [
          {
            id: "p-104",
            title: "Insert a given node in BST",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
            ytVideo: "https://youtu.be/FiFiNvM29ps",
          },
          {
            id: "p-102",
            title: "Delete a node in BST",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/delete-node-in-a-bst/",
            ytVideo: "https://youtu.be/kouxiP_H5WE",
          },
          {
            id: "p-105",
            title: "Kth Smallest and Largest element in BST",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
            ytVideo: "https://youtu.be/9TJYWh0adfk",
          },
          {
            id: "p-100",
            title: "Check if a tree is a BST or not",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
            ytVideo: "https://youtu.be/f-sj7I5oXEI",
          },
          {
            id: "p-106",
            title: "LCA in BST",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
            ytVideo: "https://youtu.be/cX_kPV_foZc",
          },
          {
            id: "p-101",
            title: "Construct a BST from a preorder traversal",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
            ytVideo: "https://youtu.be/UmJT3j26t1I",
          },
          {
            id: "p-103",
            title: "Inorder successor and predecessor in BST",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/inorder-successor-in-bst/",
            ytVideo: "https://youtu.be/SXKAD2svfmI",
          },
        ],
      },
      {
        id: "sub-2078",
        title: "FAQs",
        problems: [
          {
            id: "p-96",
            title: "BST iterator",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/binary-search-tree-iterator/",
            ytVideo: "https://youtu.be/D2jMcmxU4bs",
          },
          {
            id: "p-99",
            title: "Two sum in BST",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
            ytVideo: "https://youtu.be/ssL3sHwPeb4",
          },
          {
            id: "p-97",
            title: "Correct BST with two nodes swapped",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/recover-binary-search-tree/",
            ytVideo: "https://youtu.be/ZWGW7FminDM",
          },
          {
            id: "p-98",
            title: "Largest BST in Binary Tree",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/",
            ytVideo: "https://youtu.be/X0oXMdtUDwo",
          },
        ],
      },
      {
        id: "sub-add-10074",
        title: "BST Transformations & Verification",
        problems: [
          {
            id: "p-add-10075",
            title: "Recover Binary Search Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/recover-binary-search-tree/",
          },
          {
            id: "p-add-10076",
            title: "Convert Sorted Array to Binary Search Tree",
            difficulty: "Easy",
            leetcodeUrl:
              "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
          },
          {
            id: "p-add-10077",
            title: "Convert Sorted List to Binary Search Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/",
          },
          {
            id: "p-add-10078",
            title: "Trim a Binary Search Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/trim-a-binary-search-tree/",
          },
          {
            id: "p-add-10079",
            title: "All Elements in Two Binary Search Trees",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/all-elements-in-two-binary-search-trees/",
          },
          {
            id: "p-add-10080",
            title: "Balance a Binary Search Tree",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/balance-a-binary-search-tree/",
          },
        ],
      },
    ],
  },
  {
    id: "step-14",
    stepNumber: 14,
    title: "Heaps",
    subTopics: [
      {
        id: "sub-2081",
        title: "FAQs",
        problems: [
          {
            id: "p-567",
            title: "Kth largest element in a stream of running integers",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/kth-largest-element-in-a-stream/#:~:text=Implement%20KthLargest%20class%3A,largest%20element%20in%20the%20stream.",
          },
        ],
      },
      {
        id: "sub-add-10000",
        title: "Standard Heap Problems",
        problems: [
          {
            id: "p-add-10001",
            title: "Kth Largest Element in an Array",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
          },
          {
            id: "p-add-10002",
            title: "Top K Frequent Elements",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
          },
          {
            id: "p-add-10003",
            title: "K Closest Points to Origin",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/k-closest-points-to-origin/",
          },
          {
            id: "p-add-10004",
            title: "Find Median from Data Stream",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/",
          },
          {
            id: "p-add-10005",
            title: "Merge K Sorted Lists",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
          },
          {
            id: "p-add-10006",
            title: "Task Scheduler",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/task-scheduler/",
          },
          {
            id: "p-add-10007",
            title: "Reorganize String",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/reorganize-string/",
          },
          {
            id: "p-add-10008",
            title: "Hand of Straights",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/hand-of-straights/",
          },
          {
            id: "p-add-10009",
            title: "Design Twitter",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/design-twitter/",
          },
          {
            id: "p-add-10010",
            title: "Minimum Cost to Connect Sticks",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/",
          },
          {
            id: "p-add-10011",
            title: "Maximum Subsequence Score",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/maximum-subsequence-score/",
          },
        ],
      },
    ],
  },
  {
    id: "step-15",
    stepNumber: 15,
    title: "Graphs",
    subTopics: [
      {
        id: "sub-2083",
        title: "Theory and traversals",
        problems: [
          {
            id: "p-1222",
            title: "Introduction to Graph",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/3oI-34aPMWM",
          },
          {
            id: "p-529",
            title: "Traversal Techniques",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/Qzf1a--rhp8",
          },
        ],
      },
      {
        id: "sub-2084",
        title: "Traversal Problems",
        problems: [
          {
            id: "p-535",
            title: "Number of provinces",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/number-of-provinces/#:~:text=A%20province%20is%20a%20group,the%20total%20number%20of%20provinces.",
            ytVideo: "https://youtu.be/ACzkVtewUYA",
          },
          {
            id: "p-534",
            title: "Number of islands",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
            ytVideo:
              "https://www.youtube.com/watch?v=muncqlKJrH0&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=8",
          },
          {
            id: "p-531",
            title: "Flood fill algorithm",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/flood-fill/",
          },
          {
            id: "p-533",
            title: "Number of enclaves",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/number-of-enclaves/",
            ytVideo: "https://youtu.be/rxKcepXQgU4",
          },
          {
            id: "p-536",
            title: "Rotten Oranges",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/",
            ytVideo: "https://www.youtube.com/watch?v=yf3oUhkvqA0",
          },
          {
            id: "p-530",
            title: "Distance of nearest cell having one",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/01-matrix/",
            ytVideo: "https://youtu.be/edXdVwkYHF8",
          },
          {
            id: "p-537",
            title: "Surrounded Regions",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/surrounded-regions/",
            ytVideo: "https://youtu.be/BtdgAys4yMk",
          },
        ],
      },
      {
        id: "sub-2085",
        title: "Cycles ",
        problems: [
          {
            id: "p-501",
            title: "Detect a cycle in an undirected graph",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
            ytVideo: "https://youtu.be/zQ3zgFypzX4",
          },
          {
            id: "p-499",
            title: "Bipartite graph",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/is-graph-bipartite/",
            ytVideo: "https://youtu.be/KG5YFfR0j8A",
          },
          {
            id: "p-502",
            title: "Topological sort or Kahn's algorithm",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/5lZ0iJMrUMk",
          },
          {
            id: "p-500",
            title: "Detect a cycle in a directed graph",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
            ytVideo:
              "https://www.youtube.com/watch?v=uzVUw90ZFIg&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw&index=12",
          },
        ],
      },
      {
        id: "sub-2086",
        title: "Hard Problems",
        problems: [
          {
            id: "p-506",
            title: "Find eventual safe states",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/find-eventual-safe-states/",
            ytVideo: "https://youtu.be/2gtg3VsDGyc",
          },
          {
            id: "p-504",
            title: "Course Schedule I",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
            ytVideo: "https://youtu.be/WAOfKpxYHR8",
          },
          {
            id: "p-505",
            title: "Course Schedule II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii/",
            ytVideo: "https://youtu.be/WAOfKpxYHR8",
          },
          {
            id: "p-503",
            title: "Alien Dictionary",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/solution/",
            ytVideo: "https://youtu.be/U3N_je7tWAs",
          },
          {
            id: "p-507",
            title: "Shortest path in DAG",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=ZUFQfFaU-8U&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=27",
          },
          {
            id: "p-508",
            title: "Shortest path in undirected graph with unit weights",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=C4gxoTaI71U&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=28",
          },
          {
            id: "p-509",
            title: "Word ladder I",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/word-ladder/",
            ytVideo: "https://youtu.be/tRPda0rcf8E",
          },
          {
            id: "p-510",
            title: "Word ladder II",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/word-ladder-ii/",
            ytVideo: "https://youtu.be/AD4SFl7tu7I?si=EpcJQTWm2YeURvEG",
          },
        ],
      },
      {
        id: "sub-2087",
        title: "Shortest Path Algorithms",
        problems: [
          {
            id: "p-520",
            title: "Dijkstra's algorithm",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=rp1SMw7HSO8&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=35",
          },
          {
            id: "p-527",
            title: "Shortest Distance in a Binary Maze",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
            ytVideo:
              "https://www.youtube.com/watch?v=U5Mw4eyUmw4&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=36",
          },
          {
            id: "p-525",
            title: "Path with minimum effort",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/path-with-minimum-effort/",
            ytVideo: "https://youtu.be/0ytpZyiZFhA",
          },
          {
            id: "p-519",
            title: "Cheapest flight within K stops",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
            ytVideo: "https://youtu.be/9XybHVqTHcQ",
          },
          {
            id: "p-523",
            title: "Minimum multiplications to reach end",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=_BvEJ3VIDWw&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=39",
          },
          {
            id: "p-524",
            title: "Number of ways to arrive at destination",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/",
            ytVideo: "https://youtu.be/_-0mx0SmYxA",
          },
          {
            id: "p-518",
            title: "Bellman ford algorithm",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/0vVofAhAYjc",
          },
          {
            id: "p-522",
            title: "Floyd warshall algorithm",
            difficulty: "Hard",
            ytVideo:
              "https://www.youtube.com/watch?v=YbY8cVwWAvw&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn&index=42",
          },
          {
            id: "p-521",
            title: "Find the city with the smallest number of neighbors",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
            ytVideo: "https://youtu.be/9XybHVqTHcQ",
          },
        ],
      },
      {
        id: "sub-2088",
        title: "Minimum Spanning Tree",
        problems: [
          {
            id: "p-1221",
            title: "MST theory",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/ZSPjZuZWCME",
          },
          {
            id: "p-516",
            title: "Disjoint Set ",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/aBxjDBC4M1U",
          },
          {
            id: "p-517",
            title: "Find the MST weight",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/mJcZjjKzeqk",
          },
        ],
      },
      {
        id: "sub-2089",
        title: "Hard Problems II",
        problems: [
          {
            id: "p-515",
            title: "Number of operations to make network connected",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
            ytVideo: "https://youtu.be/FYrl7iz9_ZU",
          },
          {
            id: "p-511",
            title: "Accounts merge",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/accounts-merge/",
            ytVideo: "https://youtu.be/FMwpt_aQOGw",
          },
          {
            id: "p-514",
            title: "Number of islands II",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/number-of-islands-ii/",
            ytVideo: "https://youtu.be/Rn6B-Q4SNyA",
          },
          {
            id: "p-512",
            title: "Making a large island",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/making-a-large-island/",
            ytVideo: "https://youtu.be/lgiz0Oup6gM",
          },
          {
            id: "p-513",
            title: "Most stones removed with same row or column",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/",
            ytVideo: "https://youtu.be/OwMNX8SPavM",
          },
        ],
      },
      {
        id: "sub-2090",
        title: "Additional Algorithms",
        problems: [
          {
            id: "p-498",
            title: "Kosaraju's algorithm",
            difficulty: "Hard",
            leetcodeUrl:
              "https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/discuss/766485/kosaraju-algorithm-on",
            ytVideo:
              "https://www.youtube.com/watch?v=V8qIqJxCioo&list=PLgUwDviBIf0rGEWe64KWas0Nryn7SCRWw&index=27",
          },
          {
            id: "p-497",
            title: "Bridges in graph",
            difficulty: "Hard",
            leetcodeUrl:
              "https://leetcode.com/problems/critical-connections-in-a-network/discuss/382385/find-bridges-in-a-graph",
            ytVideo: "https://youtu.be/qrAub5z8FeA",
          },
          {
            id: "p-496",
            title: "Articulation point in graph",
            difficulty: "Hard",
            ytVideo: "https://youtu.be/j1QDfU21iZk",
          },
        ],
      },
      {
        id: "sub-add-10081",
        title: "Advanced Graph Algorithms & MST",
        problems: [
          {
            id: "p-add-10082",
            title: "Reconstruct Itinerary (Eulerian Path)",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/reconstruct-itinerary/",
          },
          {
            id: "p-add-10083",
            title: "Min Cost to Connect All Points (Prim / Kruskal)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
          },
          {
            id: "p-add-10084",
            title: "Cheapest Flights Within K Stops",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
          },
          {
            id: "p-add-10085",
            title: "Network Delay Time",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
          },
          {
            id: "p-add-10086",
            title: "Swim in Rising Water (Dijkstra / Binary Search)",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/swim-in-rising-water/",
          },
          {
            id: "p-add-10087",
            title: "Path with Maximum Probability",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/path-with-maximum-probability/",
          },
          {
            id: "p-add-10088",
            title: "Redundant Connection (Union-Find)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/redundant-connection/",
          },
          {
            id: "p-add-10089",
            title: "Critical Connections in a Network (Bridges in Graph)",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/critical-connections-in-a-network/",
          },
          {
            id: "p-add-10090",
            title: "Strongly Connected Components (Kosaraju)",
            difficulty: "Hard",
            leetcodeUrl:
              "https://leetcode.com/problems/maximum-number-of-darts-inside-of-a-circular-dartboard/",
          },
          {
            id: "p-add-10091",
            title: "Alien Dictionary (Topological Sort)",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/",
          },
          {
            id: "p-add-10092",
            title: "Is Graph Bipartite?",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/is-graph-bipartite/",
          },
        ],
      },
    ],
  },
  {
    id: "step-16",
    stepNumber: 16,
    title: "Dynamic Programming",
    subTopics: [
      {
        id: "sub-2092",
        title: "Introduction",
        problems: [
          {
            id: "p-1195",
            title: "Introduction to DP",
            difficulty: "Easy",
            ytVideo: "https://youtu.be/tyB0ztf0DNY",
          },
        ],
      },
      {
        id: "sub-2093",
        title: "1D DP",
        problems: [
          {
            id: "p-287",
            title: "Climbing stairs",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
            ytVideo: "https://youtu.be/mLfjzJsN8us",
          },
          {
            id: "p-288",
            title: "Frog Jump",
            difficulty: "Medium",
            ytVideo: "https://www.youtube.com/watch?v=EgG3jsGoPvQ",
          },
          {
            id: "p-289",
            title: "Frog jump with K distances",
            difficulty: "Medium",
            ytVideo: "https://www.youtube.com/watch?v=Kmh3rhyEtB8",
          },
          {
            id: "p-291",
            title: "Maximum sum of non adjacent elements",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/house-robber/",
            ytVideo: "https://www.youtube.com/watch?v=GrMBfJNk_NY",
          },
          {
            id: "p-290",
            title: "House robber",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/",
            ytVideo: "https://www.youtube.com/watch?v=3WaxQMELSkw",
          },
        ],
      },
      {
        id: "sub-2094",
        title: "2D DP",
        problems: [
          {
            id: "p-292",
            title: "Ninja's training",
            difficulty: "Medium",
            ytVideo: "https://www.youtube.com/watch?v=AE39gJYuRog",
          },
        ],
      },
      {
        id: "sub-2095",
        title: "DP on grids",
        problems: [
          {
            id: "p-297",
            title: "Grid unique paths",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/unique-paths/",
            ytVideo: "https://www.youtube.com/watch?v=sdE0A2Oxofw",
          },
          {
            id: "p-300",
            title: "Unique paths II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/unique-paths-ii/",
            ytVideo: "https://www.youtube.com/watch?v=TmhpgXScLyY",
          },
          {
            id: "p-298",
            title: "Minimum Falling Path Sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/minimum-path-sum/",
            ytVideo: "https://youtu.be/_rgTlyky1uQ",
          },
          {
            id: "p-299",
            title: "Triangle",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/triangle/",
            ytVideo: "https://www.youtube.com/watch?v=SrP-PiLSYC0",
          },
        ],
      },
      {
        id: "sub-2096",
        title: "DP on stocks",
        problems: [
          {
            id: "p-301",
            title: "Best time to buy and sell stock",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
            ytVideo: "https://youtu.be/excAOvwF_Wk",
          },
          {
            id: "p-302",
            title: "Best time to buy and sell stock II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
            ytVideo: "https://youtu.be/nGJmxkUJQGs",
          },
          {
            id: "p-303",
            title: "Best time to buy and sell stock III",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/",
            ytVideo: "https://youtu.be/-uQGzhYj8BQ",
          },
          {
            id: "p-304",
            title: "Best time to buy and sell stock IV",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
            ytVideo: "https://youtu.be/IV1dHbk5CDc",
          },
          {
            id: "p-305",
            title: "Best time to buy and sell stock with transaction fees",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
            ytVideo: "https://youtu.be/k4eK-vEmnKg",
          },
        ],
      },
      {
        id: "sub-2097",
        title: "DP on subsequences",
        problems: [
          {
            id: "p-323",
            title: "Subset sum equals to target",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=rYkfBRtMJr8&list=PLgUwDviBIf0p4ozDR_kJJkONnb1wdx2Ma&index=52",
          },
          {
            id: "p-321",
            title: "Partition equal subset sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
            ytVideo: "https://www.youtube.com/watch?v=7win3dcgo3k",
          },
          {
            id: "p-320",
            title: "Partition a set into two subsets with minimum absolute sum difference",
            difficulty: "Hard",
            leetcodeUrl:
              "https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/",
            ytVideo: "https://www.youtube.com/watch?v=GS_OqZb2CWc",
          },
          {
            id: "p-318",
            title: "Count subsets with sum K",
            difficulty: "Medium",
            ytVideo: "https://www.youtube.com/watch?v=ZHyb-A2Mte4",
          },
          {
            id: "p-317",
            title: "Count partitions with given difference",
            difficulty: "Medium",
            ytVideo: "https://www.youtube.com/watch?v=zoilQD1kYSg",
          },
          {
            id: "p-315",
            title: "0 and 1 Knapsack",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/GqOmJHQZivw",
          },
          {
            id: "p-319",
            title: "Minimum coins",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/coin-change/",
            ytVideo: "https://www.youtube.com/watch?v=myPeWb3Y68A",
          },
          {
            id: "p-324",
            title: "Target sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/target-sum/",
            ytVideo: "https://www.youtube.com/watch?v=b3GD8263-PQ",
          },
          {
            id: "p-316",
            title: "Coin change II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/coin-change-2/",
            ytVideo: "https://www.youtube.com/watch?v=HgyouUi11zk",
          },
          {
            id: "p-325",
            title: "Unbounded knapsack",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/OgvOZ6OrJoY",
          },
          {
            id: "p-322",
            title: "Rod cutting problem",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/mO8XpGoJwuo",
          },
        ],
      },
      {
        id: "sub-2098",
        title: "LIS",
        problems: [
          {
            id: "p-636",
            title: "Longest Increasing Subsequence",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/on2hvxBXJH4",
          },
          {
            id: "p-851",
            title: "Print Longest Increasing Subsequence",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/IFfYfonAFGc",
          },
          {
            id: "p-603",
            title: "Largest Divisible Subset",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/largest-divisible-subset/",
            ytVideo: "https://youtu.be/gDuZwBW9VvM",
          },
          {
            id: "p-640",
            title: "Longest String Chain",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/longest-string-chain/",
            ytVideo: "https://youtu.be/YY8iBaYcc4g",
          },
          {
            id: "p-633",
            title: "Longest Bitonic Subsequence",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/y4vN0WNdrlg",
          },
          {
            id: "p-780",
            title: "Number of Longest Increasing Subsequences",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
            ytVideo: "https://youtu.be/cKVl1TFdNXg",
          },
        ],
      },
      {
        id: "sub-2099",
        title: "DP on strings",
        problems: [
          {
            id: "p-308",
            title: "Longest common subsequence",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/-zI4mrF2Pb4",
          },
          {
            id: "p-309",
            title: "Longest common substring",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/_wP9mWNPL5w",
          },
          {
            id: "p-310",
            title: "Longest palindromic subsequence",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-subsequence/",
            ytVideo: "https://youtu.be/6i_T5kkfv4A",
          },
          {
            id: "p-312",
            title: "Minimum insertions to make string palindrome",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
            ytVideo: "https://www.youtube.com/watch?v=xPBLEj41rFU",
          },
          {
            id: "p-311",
            title: "Minimum insertions or deletions to convert string A to B",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/delete-operation-for-two-strings/",
            ytVideo: "https://www.youtube.com/watch?v=yMnH0jrir0Q",
          },
          {
            id: "p-313",
            title: "Shortest common supersequence",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/shortest-common-supersequence/",
            ytVideo: "https://youtu.be/xElxAuBcvsU",
          },
          {
            id: "p-306",
            title: "Distinct subsequences",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/distinct-subsequences/",
            ytVideo: "https://youtu.be/nVG7eTiD2bY",
          },
          {
            id: "p-307",
            title: "Edit distance",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
            ytVideo: "https://youtu.be/fJaKO8FbDdo",
          },
          {
            id: "p-314",
            title: "Wildcard matching",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/wildcard-matching/",
            ytVideo: "https://youtu.be/ZmlQ3vgAOMo",
          },
        ],
      },
      {
        id: "sub-2100",
        title: "MCM DP",
        problems: [
          {
            id: "p-327",
            title: "Matrix chain multiplication",
            difficulty: "Hard",
            ytVideo: "https://youtu.be/vRVfmbCFW7Y",
          },
          {
            id: "p-326",
            title: "Burst balloons",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/burst-balloons/",
            ytVideo: "https://youtu.be/Yz4LlDSlkns",
          },
          {
            id: "p-329",
            title: "Palindrome partitioning II ",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning-ii/",
            ytVideo: "https://youtu.be/_H8V5hJUGd0",
          },
          {
            id: "p-810",
            title: "Partition Array for Maximum Sum",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/partition-array-for-maximum-sum/",
            ytVideo: "https://youtu.be/PhWWJmaKfMc",
          },
          {
            id: "p-328",
            title: "Minimum cost to cut the stick",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
            ytVideo: "https://youtu.be/xwomavsC86c",
          },
          {
            id: "p-276",
            title: "Different Ways to Evaluate a Boolean Expression",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/parsing-a-boolean-expression/",
            ytVideo: "https://youtu.be/MM7fXopgyjw",
          },
        ],
      },
      {
        id: "sub-add-10093",
        title: "Classic DP Patterns",
        problems: [
          {
            id: "p-add-10094",
            title: "Interleaving String",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/interleaving-string/",
          },
          {
            id: "p-add-10095",
            title: "Burst Balloons (Partition DP)",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/burst-balloons/",
          },
          {
            id: "p-add-10096",
            title: "Longest Palindromic Substring",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
          },
          {
            id: "p-add-10097",
            title: "Palindromic Substrings",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/palindromic-substrings/",
          },
          {
            id: "p-add-10098",
            title: "Decode Ways",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/decode-ways/",
          },
          {
            id: "p-add-10099",
            title: "Word Break",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/word-break/",
          },
          {
            id: "p-add-10100",
            title: "Maximum Length of Repeated Subarray",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/maximum-length-of-repeated-subarray/",
          },
          {
            id: "p-add-10101",
            title: "Maximal Square",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/maximal-square/",
          },
          {
            id: "p-add-10102",
            title: "Minimum Cost to Cut a Stick",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
          },
        ],
      },
    ],
  },
  {
    id: "step-17",
    stepNumber: 17,
    title: "Tries",
    subTopics: [
      {
        id: "sub-2102",
        title: "Theory",
        problems: [
          {
            id: "p-1028",
            title: "Trie Implementation and Operations",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
            ytVideo:
              "https://www.youtube.com/watch?v=dBGUmUQhjaM&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp",
          },
        ],
      },
      {
        id: "sub-2103",
        title: "Problems",
        problems: [
          {
            id: "p-1023",
            title: "Longest Word with All Prefixes",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=AWnBa91lThI&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=3",
          },
          {
            id: "p-1026",
            title: "Number of distinct substrings in a string",
            difficulty: "Medium",
            ytVideo:
              "https://www.youtube.com/watch?v=RV0QeTyHZxo&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=4",
          },
          {
            id: "p-1024",
            title: "Maximum XOR of two numbers in an array",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
            ytVideo:
              "https://www.youtube.com/watch?v=EIhAwfHubE8&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=6",
          },
          {
            id: "p-1025",
            title: "Maximum Xor with an element from an array",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
            ytVideo:
              "https://www.youtube.com/watch?v=Q8LhG9Pi5KM&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp&index=7",
          },
        ],
      },
      {
        id: "sub-add-10103",
        title: "Trie Applications",
        problems: [
          {
            id: "p-add-10104",
            title: "Implement Trie (Prefix Tree)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
          },
          {
            id: "p-add-10105",
            title: "Design Add and Search Words Data Structure",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
          },
          {
            id: "p-add-10106",
            title: "Word Search II",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/word-search-ii/",
          },
          {
            id: "p-add-10107",
            title: "Replace Words",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/replace-words/",
          },
          {
            id: "p-add-10108",
            title: "Maximum XOR With an Element From Array",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
          },
        ],
      },
    ],
  },
  {
    id: "step-18",
    stepNumber: 18,
    title: "Strings (Advanced Algo)",
    subTopics: [
      {
        id: "sub-2104",
        title: "Medium Problems",
        problems: [
          {
            id: "p-984",
            title: "Reverse every word in a string",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/reverse-words-in-a-string/",
          },
          {
            id: "p-983",
            title: "Minimum number of bracket reversals to make an expression balanced",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/",
          },
          {
            id: "p-982",
            title: "Count and say",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/count-and-say/",
          },
        ],
      },
      {
        id: "sub-2105",
        title: "Advanced Problems (Less asked)",
        problems: [
          {
            id: "p-979",
            title: "Rabin Karp Algorithm",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/repeated-string-match/discuss/416144/Rabin-Karp-algorithm-C%2B%2B-implementation",
          },
          {
            id: "p-977",
            title: "KMP Algorithm or LPS array",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/implement-strstr/",
          },
          {
            id: "p-978",
            title: "Longest happy prefix",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/longest-happy-prefix/",
          },
        ],
      },
      {
        id: "sub-add-10109",
        title: "Pattern Matching & String Algorithms",
        problems: [
          {
            id: "p-add-10110",
            title: "Shortest Palindrome",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/shortest-palindrome/",
          },
          {
            id: "p-add-10111",
            title: "Repeated String Match (Rabin-Karp)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/repeated-string-match/",
          },
          {
            id: "p-add-10112",
            title: "Longest Happy Prefix (KMP Prefix Table)",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/longest-happy-prefix/",
          },
          {
            id: "p-add-10113",
            title: "Minimum Deletions to Make Character Frequencies Unique",
            difficulty: "Medium",
            leetcodeUrl:
              "https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/",
          },
          {
            id: "p-add-10114",
            title: "Longest Valid Parentheses",
            difficulty: "Hard",
            leetcodeUrl: "https://leetcode.com/problems/longest-valid-parentheses/",
          },
          {
            id: "p-add-10115",
            title: "Minimum Add to Make Parentheses Valid",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/",
          },
          {
            id: "p-add-10116",
            title: "Valid Palindrome II",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/valid-palindrome-ii/",
          },
        ],
      },
    ],
  },
  {
    id: "step-19",
    stepNumber: 19,
    title: "Maths",
    subTopics: [
      {
        id: "sub-2107",
        title: "Sieve of Eratosthenes",
        problems: [
          {
            id: "p-652",
            title: "Prime factorisation of a Number",
            difficulty: "Medium",
            ytVideo: "https://youtu.be/LT7XhVdeRyg?si=6HkjQokJRPTFai21",
          },
          {
            id: "p-651",
            title: "Count primes in range L to R",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/count-primes/",
            ytVideo: "https://youtu.be/g5Fuxn_AvSk?si=fv6Q-Po7wrMW0a5n",
          },
        ],
      },
      {
        id: "sub-add-10117",
        title: "Core Mathematical Algorithms",
        problems: [
          {
            id: "p-add-10118",
            title: "Pow(x, n)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/powx-n/",
          },
          {
            id: "p-add-10119",
            title: "Count Primes (Sieve of Eratosthenes)",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/count-primes/",
          },
          {
            id: "p-add-10120",
            title: "Ugly Number II",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/ugly-number-ii/",
          },
          {
            id: "p-add-10121",
            title: "Happy Number",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/happy-number/",
          },
          {
            id: "p-add-10122",
            title: "Factorial Trailing Zeroes",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/factorial-trailing-zeroes/",
          },
          {
            id: "p-add-10123",
            title: "Integer to Roman",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/integer-to-roman/",
          },
          {
            id: "p-add-10124",
            title: "Roman to Integer",
            difficulty: "Easy",
            leetcodeUrl: "https://leetcode.com/problems/roman-to-integer/",
          },
          {
            id: "p-add-10125",
            title: "Multiply Strings",
            difficulty: "Medium",
            leetcodeUrl: "https://leetcode.com/problems/multiply-strings/",
          },
        ],
      },
    ],
  },
];

/** Flattens all 508 problems across all modules */
export const getAllDsaProblems = (): DsaProblem[] => {
  return striverA2ZSteps.flatMap((step) => step.subTopics.flatMap((sub) => sub.problems));
};

export interface DsaStats {
  total: number;
  solved: number;
  easyTotal: number;
  easySolved: number;
  medTotal: number;
  medSolved: number;
  hardTotal: number;
  hardSolved: number;
  starredCount: number;
  percentage: number;
}

export const getDsaStats = (
  solvedProblemIds: string[] = [],
  starredProblemIds: string[] = [],
): DsaStats => {
  const solvedSet = new Set(solvedProblemIds);
  const allProblems = getAllDsaProblems();

  let easyTotal = 0;
  let easySolved = 0;
  let medTotal = 0;
  let medSolved = 0;
  let hardTotal = 0;
  let hardSolved = 0;

  for (const prob of allProblems) {
    const isSolved = solvedSet.has(prob.id);
    if (prob.difficulty === "Easy") {
      easyTotal++;
      if (isSolved) easySolved++;
    } else if (prob.difficulty === "Medium") {
      medTotal++;
      if (isSolved) medSolved++;
    } else if (prob.difficulty === "Hard") {
      hardTotal++;
      if (isSolved) hardSolved++;
    }
  }

  const total = allProblems.length;
  const solved = allProblems.filter((p) => solvedSet.has(p.id)).length;
  const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

  return {
    total,
    solved,
    easyTotal,
    easySolved,
    medTotal,
    medSolved,
    hardTotal,
    hardSolved,
    starredCount: starredProblemIds.filter((id) => allProblems.some((p) => p.id === id)).length,
    percentage,
  };
};
