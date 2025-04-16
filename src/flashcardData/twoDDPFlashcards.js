export const twoDDPFlashcards = [
  {
    id: 1,
    title: "Unique Paths",
    question: "Find the number of unique paths from top-left to bottom-right of an m×n grid, moving only right or down.",
    hint: "Think about how many ways you can reach each cell in the grid.",
    oneLiner: "Build bottom-up by storing path counts from the bottom row to the top.",
    simpleExplanation: "You can move right or down in a grid.\nEach cell holds total paths from there.\nStart at the bottom and fill the top!",
    mnemonics: [
      "\"Start with rightmost path as 1s\" → row = [1] * n",
      "\"Move bottom-up\" → newRow[j] = newRow[j+1] + row[j]",
      "\"Top-left holds the answer\" → return row[0]"
    ],
    code: `def uniquePaths(self, m: int, n: int) -> int:
    row = [1] * n

    for i in range(m - 1):
        newRow = [1] * n
        for j in range(n - 2, -1, -1):
            newRow[j] = newRow[j + 1] + row[j]
        row = newRow
    return row[0]`,
    timeComplexity: "O(m×n) - we process each cell once",
    spaceComplexity: "O(n) - we only store two rows at a time"
  },
  {
    id: 2,
    title: "Longest Common Subsequence",
    question: "Find the length of the longest subsequence common to two strings.",
    hint: "Use a 2D table to track matching characters between the strings.",
    oneLiner: "Compare characters bottom-up and store best matches.",
    simpleExplanation: "Look for common letters in two words.\nIf letters match, grow your chain.\nRemember best paths from the future!",
    mnemonics: [
      "\"Match adds 1\" → curr[j] = 1 + prev[j + 1]",
      "\"Else take max\" → curr[j] = max(curr[j + 1], prev[j])",
      "\"Swap rows\" → prev, curr = curr, prev"
    ],
    code: `def longestCommonSubsequence(self, text1: str, text2: str) -> int:
    if len(text1) < len(text2):
        text1, text2 = text2, text1
        
    prev = [0] * (len(text2) + 1)
    curr = [0] * (len(text2) + 1)

    for i in range(len(text1) - 1, -1, -1):
        for j in range(len(text2) - 1, -1, -1):
            if text1[i] == text2[j]:
                curr[j] = 1 + prev[j + 1]
            else:
                curr[j] = max(curr[j + 1], prev[j])
        prev, curr = curr, prev

    return prev[0]`,
    timeComplexity: "O(m×n) - where m,n are the lengths of the strings",
    spaceComplexity: "O(min(m,n)) - we only store two rows"
  },
  {
    id: 3,
    title: "Best Time to Buy/Sell Stock III",
    question: "Find the maximum profit from at most two transactions (buy one and sell one share).",
    hint: "Track the best profit for different states: after first buy, first sell, second buy, and second sell.",
    oneLiner: "Track two transactions using rolling DP updates from right to left.",
    simpleExplanation: "You can buy and sell twice.\nTrack your best profits in reverse.\nKeep updating what to buy/sell!",
    mnemonics: [
      "\"Buy max profit\" → dp_buy = max(dp1_sell - price, dp1_buy)",
      "\"Sell max profit\" → dp_sell = max(dp2_buy + price, dp1_sell)",
      "\"Shift state\" → dp2_buy = dp1_buy"
    ],
    code: `def maxProfit(self, prices: List[int]) -> int:
    n = len(prices)
    dp1_buy, dp1_sell = 0, 0  
    dp2_buy = 0

    for i in range(n - 1, -1, -1):
        dp_buy = max(dp1_sell - prices[i], dp1_buy)
        dp_sell = max(dp2_buy + prices[i], dp1_sell)
        dp2_buy = dp1_buy
        dp1_buy, dp1_sell = dp_buy, dp_sell

    return dp1_buy`,
    timeComplexity: "O(n) - one pass through the prices array",
    spaceComplexity: "O(1) - using constant extra space"
  },
  {
    id: 4,
    title: "Coin Change II",
    question: "Find the number of combinations that make up an amount using an array of coins.",
    hint: "Use a bottom-up approach, considering each coin one at a time.",
    oneLiner: "Use DP to count all combinations to reach an amount.",
    simpleExplanation: "You can use each coin as many times.\nTry every way to make the target.\nCount how many combos reach it!",
    mnemonics: [
      "\"Init base case\" → dp[0] = 1",
      "\"Use each coin\" → nextDP[a] += nextDP[a - coin]",
      "\"Swap arrays\" → dp = nextDP"
    ],
    code: `def change(self, amount: int, coins: List[int]) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1
    for i in range(len(coins) - 1, -1, -1):
        nextDP = [0] * (amount + 1)
        nextDP[0] = 1

        for a in range(1, amount + 1):
            nextDP[a] = dp[a]
            if a - coins[i] >= 0:
                nextDP[a] += nextDP[a - coins[i]]
        dp = nextDP
    return dp[amount]`,
    timeComplexity: "O(amount × n) - where n is the number of coins",
    spaceComplexity: "O(amount) - for the DP arrays"
  },
  {
    id: 5,
    title: "Target Sum",
    question: "Find ways to assign + and - to each number in an array to reach a target sum.",
    hint: "Instead of using a 2D array, use maps to track all possible sums at each step.",
    oneLiner: "DP maps every possible sum from ± choices of nums.",
    simpleExplanation: "Each number can be + or –.\nTry both for every total.\nCount all paths to your goal!",
    mnemonics: [
      "\"Try both signs\" → next_dp[total ± num] += count",
      "\"Loop through totals\" → for total, count in dp.items():",
      "\"Final result\" → return dp[target]"
    ],
    code: `def findTargetSumWays(self, nums: List[int], target: int) -> int:
    dp = defaultdict(int)
    dp[0] = 1

    for num in nums:
        next_dp = defaultdict(int)
        for total, count in dp.items():
            next_dp[total + num] += count
            next_dp[total - num] += count
        dp = next_dp
        
    return dp[target]`,
    timeComplexity: "O(n×sum) - where sum is the sum of all numbers",
    spaceComplexity: "O(sum) - for the dictionary"
  },
  {
    id: 6,
    title: "Interleaving String",
    question: "Determine if s3 is an interleaving of s1 and s2 (preserving order of characters).",
    hint: "Use DP to track whether we can form s3 up to a certain point using s1 and s2.",
    oneLiner: "Use 1D DP to check if s3 can be formed by interleaving s1 and s2.",
    simpleExplanation: "Mix two strings to make the third.\nCheck every possible merge.\nDon't lose track of match order!",
    mnemonics: [
      "\"Check char match\" → if s1[i] == s3[i+j] and dp[j]",
      "\"Also try s2\" → if s2[j] == s3[i+j] and nextDp",
      "\"Update DP\" → dp[j] = res"
    ],
    code: `def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
    m, n = len(s1), len(s2)
    if m + n != len(s3):
        return False
    if n < m:
        s1, s2 = s2, s1
        m, n = n, m
    
    dp = [False for _ in range(n + 1)]
    dp[n] = True
    for i in range(m, -1, -1):
        nextDp = True
        for j in range(n - 1, -1, -1):
            res = False
            if i < m and s1[i] == s3[i + j] and dp[j]:
                res = True
            if j < n and s2[j] == s3[i + j] and nextDp:
                res = True
            dp[j] = res
            nextDp = dp[j]
    return dp[0]`,
    timeComplexity: "O(m×n) - where m,n are the lengths of s1 and s2",
    spaceComplexity: "O(min(m,n)) - for the DP array"
  },
  {
    id: 7,
    title: "Longest Increasing Path in Matrix",
    question: "Find the length of the longest increasing path in a matrix.",
    hint: "Use memoization to avoid recalculating the same cell multiple times.",
    oneLiner: "DFS + memoization to get the longest increasing path from each cell.",
    simpleExplanation: "Climb from one number to bigger ones.\nRemember best steps from each point.\nReturn the longest trail!",
    mnemonics: [
      "\"Cache results\" → if (r, c) in dp: return dp[(r, c)]",
      "\"Try all 4 dirs\" → dfs(r ± 1, c), dfs(r, c ± 1)",
      "\"Max of all paths\" → return max(dp.values())"
    ],
    code: `def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
    ROWS, COLS = len(matrix), len(matrix[0])
    dp = {}  # (r, c) -> LIP

    def dfs(r, c, prevVal):
        if (r < 0 or r == ROWS or c < 0 or 
            c == COLS or matrix[r][c] <= prevVal
        ):
            return 0
        if (r, c) in dp:
            return dp[(r, c)]

        res = 1
        res = max(res, 1 + dfs(r + 1, c, matrix[r][c]))
        res = max(res, 1 + dfs(r - 1, c, matrix[r][c]))
        res = max(res, 1 + dfs(r, c + 1, matrix[r][c]))
        res = max(res, 1 + dfs(r, c - 1, matrix[r][c]))
        dp[(r, c)] = res
        return res

    for r in range(ROWS):
        for c in range(COLS):
            dfs(r, c, -1)
    return max(dp.values())`,
    timeComplexity: "O(m×n) - each cell is processed once",
    spaceComplexity: "O(m×n) - for the cache"
  },
  {
    id: 8,
    title: "Distinct Subsequences",
    question: "Count the number of distinct subsequences of s that equal t.",
    hint: "Use DP to track the number of ways to form t[0...j] using s[0...i].",
    oneLiner: "Use DP to count all ways s can form t as a subsequence.",
    simpleExplanation: "You can skip letters in s to form t.\nEvery match gives a new way.\nAdd the number of paths together!",
    mnemonics: [
      "\"Base case\" → dp[n] = 1",
      "\"Match char\" → if s[i] == t[j]: res += prev",
      "\"Update dp\" → dp[j] = res"
    ],
    code: `def numDistinct(self, s: str, t: str) -> int:
    m, n = len(s), len(t)
    dp = [0] * (n + 1)

    dp[n] = 1
    for i in range(m - 1, -1, -1):
        prev = 1
        for j in range(n - 1, -1, -1):
            res = dp[j]
            if s[i] == t[j]:
                res += prev

            prev = dp[j]
            dp[j] = res 
            
    return dp[0]`,
    timeComplexity: "O(m×n) - where m,n are the lengths of s and t",
    spaceComplexity: "O(n) - for the DP array"
  },
  {
    id: 9,
    title: "Edit Distance",
    question: "Find the minimum number of operations to convert one string to another.",
    hint: "Use DP to track the minimum operations needed for each prefix of both strings.",
    oneLiner: "Bottom-up DP tracks minimum ops to convert one string to another.",
    simpleExplanation: "To match two words, you can insert, delete, or replace.\nTake the fewest steps possible.\nTry from the end back to the start.",
    mnemonics: [
      "\"Match? Skip\" → if word1[i] == word2[j]: dp[j] = nextDp",
      "\"Else try all\" → dp[j] = 1 + min(dp[j], dp[j + 1], nextDp)",
      "\"Track next\" → nextDp = temp"
    ],
    code: `def minDistance(self, word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    if m < n:
        m, n = n, m
        word1, word2 = word2, word1
    
    dp = [n - i for i in range(n + 1)]

    for i in range(m - 1, -1, -1):
        nextDp = dp[n]
        dp[n] = m - i
        for j in range(n - 1, -1, -1):
            temp = dp[j]
            if word1[i] == word2[j]:
                dp[j] = nextDp
            else:
                dp[j] = 1 + min(dp[j], dp[j + 1], nextDp)
            nextDp = temp
    return dp[0]`,
    timeComplexity: "O(m×n) - where m,n are the lengths of the strings",
    spaceComplexity: "O(min(m,n)) - for the DP array"
  },
  {
    id: 10,
    title: "Burst Balloons",
    question: "Find the maximum coins you can collect by bursting balloons.",
    hint: "Use DP to consider the last balloon to burst in each range.",
    oneLiner: "Use interval DP to track max coins from bursting every balloon last in range.",
    simpleExplanation: "Pop balloons for coins!\nTry each as the last in range.\nStore the best coins for each section.",
    mnemonics: [
      "\"Add padding\" → new_nums = [1] + nums + [1]",
      "\"Burst last in (l,r)\" → coins = L * i * R + dp[l][i-1] + dp[i+1][r]",
      "\"Try all i\" → for i in range(l, r + 1):"
    ],
    code: `def maxCoins(self, nums):
    n = len(nums)
    new_nums = [1] + nums + [1]

    dp = [[0] * (n + 2) for _ in range(n + 2)]
    for l in range(n, 0, -1):
        for r in range(l, n + 1):
            for i in range(l, r + 1):
                coins = new_nums[l - 1] * new_nums[i] * new_nums[r + 1]
                coins += dp[l][i - 1] + dp[i + 1][r]
                dp[l][r] = max(dp[l][r], coins)

    return dp[1][n]`,
    timeComplexity: "O(n³) - three nested loops",
    spaceComplexity: "O(n²) - for the 2D DP array"
  },
  {
    id: 11,
    title: "Regular Expression Matching",
    question: "Implement regular expression matching with support for '.' and '*'.",
    hint: "Use DP to track whether subpatterns match substrings.",
    oneLiner: "Match s and p with backtracking and support for . and *.",
    simpleExplanation: "Match characters step-by-step.\nIf * shows up, skip or use it.\nUse memory to speed up match!",
    mnemonics: [
      "\"Check match\" → s[i] == p[j] or p[j] == '.'",
      "\"Handle '*'\" → res = dp[j + 2] or (match and dp[j])",
      "\"Update DP\" → dp[j], dp1 = res, dp[j]"
    ],
    code: `def isMatch(self, s: str, p: str) -> bool:
    dp = [False] * (len(p) + 1)
    dp[len(p)] = True
    
    for i in range(len(s), -1, -1):
        dp1 = dp[len(p)]
        dp[len(p)] = (i == len(s))
        
        for j in range(len(p) - 1, -1, -1):
            match = i < len(s) and (s[i] == p[j] or p[j] == ".")
            res = False
            if (j + 1) < len(p) and p[j + 1] == "*":
                res = dp[j + 2]
                if match:
                    res |= dp[j]
            elif match:
                res = dp1
            dp[j], dp1 = res, dp[j]

    return dp[0]`,
    timeComplexity: "O(m×n) - where m,n are the lengths of s and p",
    spaceComplexity: "O(n) - for the DP array"
  }
];