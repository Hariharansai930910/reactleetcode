// src/flashcardData/oneDDPFlashcards.js

export const oneDDPFlashcards = [
  {
    id: 1,
    title: "Climbing Stairs",
    question: "Given n steps, you can climb 1 or 2 steps at a time. Find the number of distinct ways to reach the top.",
    hint: "Think about how many ways you can reach each step from previous steps.",
    oneLiner: "Use Fibonacci-style bottom-up DP to count steps.",
    simpleExplanation: "You can climb 1 or 2 stairs at a time.\nCount how many ways to get to each stair.\nIt's like adding ways from two previous steps.",
    mnemonics: [
      "\"Fibonacci step\" → first, second = second, first + second",
      "\"Start base\" → first, second = 1, 2",
      "\"Return top\" → return second"
    ],
    code: `def climbStairs(n):
    if n <= 2:
        return n
    first, second = 1, 2
    for _ in range(3, n + 1):
        first, second = second, first + second
    return second`,
    timeComplexity: "O(n) - one pass through the steps",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 2,
    title: "Min Cost Climbing Stairs",
    question: "Given an array cost where cost[i] is the cost of the i-th step, find the minimum cost to reach the top.",
    hint: "For each step, decide whether to jump from 1 or 2 steps back based on minimum cost.",
    oneLiner: "Track min cost to reach each stair by choosing the cheaper path.",
    simpleExplanation: "Every stair has a price.\nYou can jump one or two ahead.\nAlways pay the cheaper way!",
    mnemonics: [
      "\"Take cheaper path\" → first, second = second, cost[i] + min(first, second)",
      "\"Start base\" → first, second = cost[0], cost[1]",
      "\"Choose last\" → return min(first, second)"
    ],
    code: `def minCostClimbingStairs(cost):
    n = len(cost)
    first, second = cost[0], cost[1]
    for i in range(2, n):
        first, second = second, cost[i] + min(first, second)
    return min(first, second)`,
    timeComplexity: "O(n) - one pass through the cost array",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 3,
    title: "House Robber",
    question: "Given an array of house values, find the maximum amount you can rob without robbing adjacent houses.",
    hint: "For each house, decide whether to rob it (and skip the previous) or skip it.",
    oneLiner: "Use DP to choose max between robbing current or skipping it.",
    simpleExplanation: "Can't rob two houses in a row.\nEach time, choose: rob this or skip it.\nKeep track of best steal.",
    mnemonics: [
      "\"Rob or skip\" → first, second = second, max(second, first + num)",
      "\"Track rolling max\" → first, second = 0, 0",
      "\"Final loot\" → return second"
    ],
    code: `def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    first, second = 0, 0
    for num in nums:
        first, second = second, max(second, first + num)
    return second`,
    timeComplexity: "O(n) - one pass through nums array",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 4,
    title: "House Robber II",
    question: "Similar to House Robber, but houses are in a circle. Find the maximum amount you can rob.",
    hint: "Break the circle by solving the problem twice, once skipping the first house and once skipping the last.",
    oneLiner: "Run house robber on both circle-split paths and return the best.",
    simpleExplanation: "First and last houses are neighbors.\nSo rob from 0 to n-2 or from 1 to n-1.\nTake the better of the two!",
    mnemonics: [
      "\"Rob linearly\" → rob_linear(nums[:-1]), rob_linear(nums[1:])",
      "\"Rolling max again\" → first, second = second, max(second, first + num)",
      "\"Return max plan\" → return max(...)"
    ],
    code: `def rob(nums):
    def rob_linear(houses):
        first, second = 0, 0
        for num in houses:
            first, second = second, max(second, first + num)
        return second

    if len(nums) == 1:
        return nums[0]
    return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))`,
    timeComplexity: "O(n) - two linear passes",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    question: "Find the longest palindromic substring in a given string.",
    hint: "Expand around centers to find palindromes, considering both odd and even length cases.",
    oneLiner: "Expand around each center to find longest mirror substring.",
    simpleExplanation: "A palindrome reads the same both ways.\nTry expanding around every letter.\nKeep the longest one you find!",
    mnemonics: [
      "\"Expand center\" → while s[left] == s[right]: left--, right++",
      "\"Two tries\" → expand(i, i), expand(i, i+1)",
      "\"Track longest\" → if len(temp) > len(longest): longest = temp"
    ],
    code: `def longestPalindrome(s):
    def expand_around_center(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]

    longest = ""
    for i in range(len(s)):
        # Odd length palindrome
        temp = expand_around_center(i, i)
        if len(temp) > len(longest):
            longest = temp
        # Even length palindrome
        temp = expand_around_center(i, i + 1)
        if len(temp) > len(longest):
            longest = temp
    return longest`,
    timeComplexity: "O(n²) - expand up to n times for each center",
    spaceComplexity: "O(1) - constant extra space (not counting result)"
  },
  {
    id: 6,
    title: "Decode Ways",
    question: "Find the number of ways to decode a string of digits, where 'A'=1, 'B'=2, ..., 'Z'=26.",
    hint: "Use DP to track the number of ways to decode at each position.",
    oneLiner: "Use DP to count valid decodings considering one or two digits at a time.",
    simpleExplanation: "Start from the end of the string.\nAt each step, try one digit or two digits.\nAdd up the possibilities!",
    mnemonics: [
      "\"Try one digit\" → if valid(s[i]): dp[i] += dp[i+1]",
      "\"Try two digits\" → if valid(s[i:i+2]): dp[i] += dp[i+2]",
      "\"Base case\" → dp[n] = 1 (one way to decode empty string)"
    ],
    code: `def numDecodings(s):
    if not s or s[0] == '0':
        return 0
        
    n = len(s)
    dp = [0] * (n + 1)
    dp[n] = 1  # Empty string has one way to decode
    dp[n-1] = 1 if s[n-1] != '0' else 0
    
    for i in range(n-2, -1, -1):
        if s[i] != '0':  # Single digit
            dp[i] += dp[i+1]
        
        # Two digits
        if s[i] == '1' or (s[i] == '2' and s[i+1] <= '6'):
            dp[i] += dp[i+2]
    
    return dp[0]`,
    timeComplexity: "O(n) - one pass through the string",
    spaceComplexity: "O(n) - for the DP array (can be optimized to O(1))"
  },
  {
    id: 7,
    title: "Coin Change",
    question: "Find the fewest number of coins needed to make up a given amount.",
    hint: "Use bottom-up DP to compute the minimum coins needed for each subamount.",
    oneLiner: "Use DP to build up the minimum coins needed for each amount.",
    simpleExplanation: "For each smaller amount, we know the best way.\nTo get a larger amount, try each coin.\nPick the solution that uses fewest coins!",
    mnemonics: [
      "\"Try each coin\" → dp[i] = min(dp[i], dp[i-coin] + 1)",
      "\"Initialize max\" → dp = [amount+1] * (amount+1)",
      "\"Check impossible\" → return -1 if dp[amount] > amount else dp[amount]"
    ],
    code: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1`,
    timeComplexity: "O(amount * n) - where n is the number of coins",
    spaceComplexity: "O(amount) - for the DP array"
  },
  {
    id: 8,
    title: "Maximum Product Subarray",
    question: "Find the contiguous subarray with the largest product.",
    hint: "Track both maximum and minimum products as you go (since negatives can flip the result).",
    oneLiner: "Track both max and min product because negatives can flip the sign.",
    simpleExplanation: "We need to track both max and min.\nA big negative × negative = big positive.\nAt each step, the new num can flip everything!",
    mnemonics: [
      "\"Track both\" → curr_max, curr_min = max/min(num, num*curr_max, num*curr_min)",
      "\"Max can flip\" → if num is negative, swap curr_max and curr_min",
      "\"Track result\" → result = max(result, curr_max)"
    ],
    code: `def maxProduct(nums):
    if not nums:
        return 0
    
    result = curr_max = curr_min = nums[0]
    
    for num in nums[1:]:
        values = (num, num * curr_max, num * curr_min)
        curr_max, curr_min = max(values), min(values)
        result = max(result, curr_max)
    
    return result`,
    timeComplexity: "O(n) - one pass through the array",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 9,
    title: "Word Break",
    question: "Determine if a string can be segmented into space-separated words from a dictionary.",
    hint: "Use DP to track which substrings can be formed with dictionary words.",
    oneLiner: "Use DP to mark reachable positions in the string via dictionary words.",
    simpleExplanation: "Start at the beginning of the string.\nFrom each position we can reach, try all dictionary words.\nMark new positions we can reach with those words.",
    mnemonics: [
      "\"Mark reachable\" → dp[i+len(word)] = True",
      "\"Check prefix\" → if dp[i] and s[i:i+len(word)] == word:",
      "\"Return end\" → return dp[len(s)]"
    ],
    code: `def wordBreak(s, wordDict):
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True  # Empty string is always formable
    
    for i in range(n):
        if not dp[i]:
            continue
        for word in wordDict:
            if s[i:i+len(word)] == word:
                dp[i + len(word)] = True
                if dp[n]:  # Early termination
                    return True
    
    return dp[n]`,
    timeComplexity: "O(n * m * k) - where n is string length, m is dict size, k is avg word length",
    spaceComplexity: "O(n) - for the DP array"
  },
  {
    id: 10,
    title: "Palindromic Substrings",
    question: "Count the number of palindromic substrings in a given string.",
    hint: "Expand around centers to find all palindromes.",
    oneLiner: "Expand around each possible center (n centers for odd, n-1 for even).",
    simpleExplanation: "Check every position as a center.\nExpand outward as long as characters match.\nCount both odd and even-length palindromes!",
    mnemonics: [
      "\"Expand center\" → while s[l] == s[r]: count += 1",
      "\"Odd and even\" → countSubstrings(i, i), countSubstrings(i, i+1)",
      "\"Break when mismatch\" → if l < 0 or r >= len(s) or s[l] != s[r]: break"
    ],
    code: `def countSubstrings(s):
    count = 0
    n = len(s)
    
    def expand_around_center(left, right):
        nonlocal count
        while left >= 0 and right < n and s[left] == s[right]:
            count += 1
            left -= 1
            right += 1
    
    for i in range(n):
        # Odd length palindromes
        expand_around_center(i, i)
        # Even length palindromes
        expand_around_center(i, i + 1)
    
    return count`,
    timeComplexity: "O(n²) - expand up to n times for each center",
    spaceComplexity: "O(1) - constant extra space"
  }
];