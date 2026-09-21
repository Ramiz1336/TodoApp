// Official LeetCode SQL 50 & Interview Classics Dataset (58 Total Problems)
// All problems contain direct links to LeetCode practice.

export interface SqlProblem {
  id: string;
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  leetcodeUrl: string;
}

export interface SqlCategory {
  id: string;
  categoryNumber: number;
  title: string;
  problems: SqlProblem[];
}

export const leetcodeSqlCategories: SqlCategory[] = [
  {
    id: "sql-cat-1",
    categoryNumber: 1,
    title: "Select",
    problems: [
      {
        id: "sql-1757",
        number: 1757,
        title: "Recyclable and Low Fat Products",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/recyclable-and-low-fat-products/",
      },
      {
        id: "sql-584",
        number: 584,
        title: "Find Customer Referee",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/find-customer-referee/",
      },
      {
        id: "sql-595",
        number: 595,
        title: "Big Countries",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/big-countries/",
      },
      {
        id: "sql-1148",
        number: 1148,
        title: "Article Views I",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/article-views-i/",
      },
      {
        id: "sql-1683",
        number: 1683,
        title: "Invalid Tweets",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/invalid-tweets/",
      },
    ],
  },
  {
    id: "sql-cat-2",
    categoryNumber: 2,
    title: "Basic Joins",
    problems: [
      {
        id: "sql-1378",
        number: 1378,
        title: "Replace Employee ID With The Unique Identifier",
        difficulty: "Easy",
        leetcodeUrl:
          "https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/",
      },
      {
        id: "sql-1068",
        number: 1068,
        title: "Product Sales Analysis I",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/product-sales-analysis-i/",
      },
      {
        id: "sql-1581",
        number: 1581,
        title: "Customer Who Visited but Did Not Make Any Transactions",
        difficulty: "Easy",
        leetcodeUrl:
          "https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/",
      },
      {
        id: "sql-197",
        number: 197,
        title: "Rising Temperature",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/rising-temperature/",
      },
      {
        id: "sql-1661",
        number: 1661,
        title: "Average Time of Process per Machine",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/average-time-of-process-per-machine/",
      },
      {
        id: "sql-577",
        number: 577,
        title: "Employee Bonus",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/employee-bonus/",
      },
      {
        id: "sql-1280",
        number: 1280,
        title: "Students and Examinations",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/students-and-examinations/",
      },
      {
        id: "sql-570",
        number: 570,
        title: "Managers with at Least 5 Direct Reports",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/managers-with-at-least-5-direct-reports/",
      },
      {
        id: "sql-1934",
        number: 1934,
        title: "Confirmation Rate",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/confirmation-rate/",
      },
    ],
  },
  {
    id: "sql-cat-3",
    categoryNumber: 3,
    title: "Basic Aggregate Functions",
    problems: [
      {
        id: "sql-620",
        number: 620,
        title: "Not Boring Movies",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/not-boring-movies/",
      },
      {
        id: "sql-1251",
        number: 1251,
        title: "Average Selling Price",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/average-selling-price/",
      },
      {
        id: "sql-1075",
        number: 1075,
        title: "Project Employees I",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/project-employees-i/",
      },
      {
        id: "sql-1633",
        number: 1633,
        title: "Percentage of Users Attended a Contest",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/percentage-of-users-attended-a-contest/",
      },
      {
        id: "sql-1211",
        number: 1211,
        title: "Queries Quality and Percentage",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/queries-quality-and-percentage/",
      },
      {
        id: "sql-1193",
        number: 1193,
        title: "Monthly Transactions I",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/monthly-transactions-i/",
      },
      {
        id: "sql-1174",
        number: 1174,
        title: "Immediate Food Delivery II",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/immediate-food-delivery-ii/",
      },
      {
        id: "sql-550",
        number: 550,
        title: "Game Play Analysis IV",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/game-play-analysis-iv/",
      },
    ],
  },
  {
    id: "sql-cat-4",
    categoryNumber: 4,
    title: "Sorting and Grouping",
    problems: [
      {
        id: "sql-2356",
        number: 2356,
        title: "Number of Unique Subjects Taught by Each Teacher",
        difficulty: "Easy",
        leetcodeUrl:
          "https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/",
      },
      {
        id: "sql-1141",
        number: 1141,
        title: "User Activity for the Past 30 Days I",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/user-activity-for-the-past-30-days-i/",
      },
      {
        id: "sql-1070",
        number: 1070,
        title: "Product Sales Analysis III",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/product-sales-analysis-iii/",
      },
      {
        id: "sql-596",
        number: 596,
        title: "Classes More Than 5 Students",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/classes-more-than-5-students/",
      },
      {
        id: "sql-1729",
        number: 1729,
        title: "Find Followers Count",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/find-followers-count/",
      },
      {
        id: "sql-619",
        number: 619,
        title: "Biggest Single Number",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/biggest-single-number/",
      },
      {
        id: "sql-1045",
        number: 1045,
        title: "Customers Who Bought All Products",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/customers-who-bought-all-products/",
      },
    ],
  },
  {
    id: "sql-cat-5",
    categoryNumber: 5,
    title: "Advanced Select and Joins",
    problems: [
      {
        id: "sql-1731",
        number: 1731,
        title: "The Number of Employees Which Report to Each Employee",
        difficulty: "Easy",
        leetcodeUrl:
          "https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/",
      },
      {
        id: "sql-1789",
        number: 1789,
        title: "Primary Department for Each Employee",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/primary-department-for-each-employee/",
      },
      {
        id: "sql-610",
        number: 610,
        title: "Triangle Judgement",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/triangle-judgement/",
      },
      {
        id: "sql-180",
        number: 180,
        title: "Consecutive Numbers",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/consecutive-numbers/",
      },
      {
        id: "sql-1164",
        number: 1164,
        title: "Product Price at a Given Date",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/product-price-at-a-given-date/",
      },
      {
        id: "sql-1204",
        number: 1204,
        title: "Last Person to Fit in the Bus",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/last-person-to-fit-in-the-bus/",
      },
      {
        id: "sql-1907",
        number: 1907,
        title: "Count Salary Categories",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/count-salary-categories/",
      },
    ],
  },
  {
    id: "sql-cat-6",
    categoryNumber: 6,
    title: "Subqueries",
    problems: [
      {
        id: "sql-1978",
        number: 1978,
        title: "Employees Whose Manager Left the Company",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/employees-whose-manager-left-the-company/",
      },
      {
        id: "sql-626",
        number: 626,
        title: "Exchange Seats",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/exchange-seats/",
      },
      {
        id: "sql-1341",
        number: 1341,
        title: "Movie Rating",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/movie-rating/",
      },
      {
        id: "sql-1321",
        number: 1321,
        title: "Restaurant Growth",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/restaurant-growth/",
      },
      {
        id: "sql-602",
        number: 602,
        title: "Friend Requests II: Who Has the Most Friends",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/",
      },
      {
        id: "sql-585",
        number: 585,
        title: "Investments in 2016",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/investments-in-2016/",
      },
      {
        id: "sql-185",
        number: 185,
        title: "Department Top Three Salaries",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/department-top-three-salaries/",
      },
    ],
  },
  {
    id: "sql-cat-7",
    categoryNumber: 7,
    title: "Advanced String Functions / Regex / Clause",
    problems: [
      {
        id: "sql-1667",
        number: 1667,
        title: "Fix Names in a Table",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/fix-names-in-a-table/",
      },
      {
        id: "sql-1527",
        number: 1527,
        title: "Patients With a Condition",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/patients-with-a-condition/",
      },
      {
        id: "sql-196",
        number: 196,
        title: "Delete Duplicate Emails",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/delete-duplicate-emails/",
      },
      {
        id: "sql-176",
        number: 176,
        title: "Second Highest Salary",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/second-highest-salary/",
      },
      {
        id: "sql-1484",
        number: 1484,
        title: "Group Sold Products By The Date",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/group-sold-products-by-the-date/",
      },
      {
        id: "sql-1327",
        number: 1327,
        title: "List the Products Ordered in a Period",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/list-the-products-ordered-in-a-period/",
      },
      {
        id: "sql-1517",
        number: 1517,
        title: "Find Users With Valid E-Mails",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/find-users-with-valid-e-mails/",
      },
    ],
  },
  {
    id: "sql-cat-8",
    categoryNumber: 8,
    title: "Interview Classics (Bonus)",
    problems: [
      {
        id: "sql-175",
        number: 175,
        title: "Combine Two Tables",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/combine-two-tables/",
      },
      {
        id: "sql-177",
        number: 177,
        title: "Nth Highest Salary",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/nth-highest-salary/",
      },
      {
        id: "sql-178",
        number: 178,
        title: "Rank Scores",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/rank-scores/",
      },
      {
        id: "sql-181",
        number: 181,
        title: "Employees Earning More Than Their Managers",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/employees-earning-more-than-their-managers/",
      },
      {
        id: "sql-182",
        number: 182,
        title: "Duplicate Emails",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/duplicate-emails/",
      },
      {
        id: "sql-183",
        number: 183,
        title: "Customers Who Never Order",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/customers-who-never-order/",
      },
      {
        id: "sql-184",
        number: 184,
        title: "Department Highest Salary",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/department-highest-salary/",
      },
      {
        id: "sql-262",
        number: 262,
        title: "Trips and Users",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/trips-and-users/",
      },
    ],
  },
];

export const getAllSqlProblems = (): SqlProblem[] => {
  return leetcodeSqlCategories.flatMap((cat) => cat.problems);
};

export interface SqlStats {
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

export const getSqlStats = (
  solvedProblemIds: string[] = [],
  starredProblemIds: string[] = [],
): SqlStats => {
  const solvedSet = new Set(solvedProblemIds);
  const allProblems = getAllSqlProblems();

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
