export const slidingWindowFlashcards = [
  {
    id: 1,
    title: "Best Time to Buy and Sell Stock",
    question: "Given an array where prices[i] is the price of a stock on day i, find the maximum profit.",
    hint: "Track the minimum price seen so far and calculate potential profit at each step.",
    oneLiner: "Track the minimum price so far and compute profit at each step.",
    simpleExplanation: "We watch the lowest price we've seen.\nThen we check how much we'd earn if we sold today.\nWe remember the best profit we ever found.",
    mnemonics: [
      "\"Track min\" → min_price = min(min_price, price)",
      "\"Check profit\" → profit = price - min_price",
      "\"Update best\" → max_profit = max(max_profit, profit)"
    ],
    code: `def maxProfit(prices: list[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    
    return max_profit`,
    timeComplexity: "O(N) - single pass through the array",
    spaceComplexity: "O(1) - using constant extra space"
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    question: "Find the length of the longest substring without repeating characters.",
    hint: "Use a sliding window and keep track of characters you've seen.",
    oneLiner: "Use a sliding window and a set/map to track characters.",
    simpleExplanation: "We move across the string, adding each new letter.\nIf we see a repeat, we shrink the start of the window.\nWe keep track of the longest clean stretch.",
    mnemonics: [
      "\"Check char in map\" → if s[r] in seen: l = max(l, seen[s[r]] + 1)",
      "\"Store index\" → seen[s[r]] = r",
      "\"Track max length\" → res = max(res, r - l + 1)"
    ],
    code: `def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = max_length = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length`,
    timeComplexity: "O(N) - at most 2n operations in the worst case",
    spaceComplexity: "O(min(N, 26)) - limited by character set size"
  },
  {
    id: 3,
    title: "Longest Repeating Character Replacement",
    question: "Find the length of the longest substring with at most k character replacements.",
    hint: "Use a sliding window and track the frequency of each character.",
    oneLiner: "Use sliding window; replace excess characters beyond the most frequent one.",
    simpleExplanation: "We build a window and count letters inside.\nWe make sure we don't replace more than k characters.\nIf we do, we shrink the window.",
    mnemonics: [
      "\"Track max freq\" → max_count = max(counts.values())",
      "\"Valid window?\" → if (right - left + 1) - max_count > k: shrink",
      "\"Update max\" → res = max(res, window length)"
    ],
    code: `from collections import Counter

def characterReplacement(s: str, k: int) -> int:
    count = Counter()
    left = max_length = max_freq = 0
    
    for right in range(len(s)):
        count[s[right]] += 1
        max_freq = max(max_freq, count[s[right]])
        
        if (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1
        
        max_length = max(max_length, right - left + 1)
    
    return max_length`,
    timeComplexity: "O(N) - single pass through the string",
    spaceComplexity: "O(26) - limited to 26 uppercase letters"
  },
  {
    id: 4,
    title: "Permutation in String",
    question: "Given two strings s1 and s2, check if s1's permutation is a substring of s2.",
    hint: "Use a sliding window of length s1 and compare character counts.",
    oneLiner: "Use sliding window with frequency counters and compare with target.",
    simpleExplanation: "We count letters in the small word.\nThen we move a window over the big word and check each group of letters.\nIf one window matches, we found a match!",
    mnemonics: [
      "\"Build counters\" → Counter(s1) == Counter(window)",
      "\"Slide window\" → add s2[i], remove s2[i - len(s1)]",
      "\"Compare counters\" → if match: return True"
    ],
    code: `from collections import Counter

def checkInclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2):
        return False
    
    s1_count = Counter(s1)
    s2_count = Counter(s2[:len(s1)])
    
    if s1_count == s2_count:
        return True
    
    left = 0
    for right in range(len(s1), len(s2)):
        s2_count[s2[right]] += 1
        s2_count[s2[left]] -= 1
        if s2_count[s2[left]] == 0:
            del s2_count[s2[left]]
        left += 1
        if s1_count == s2_count:
            return True
    
    return False`,
    timeComplexity: "O(N) - where N is the length of s2",
    spaceComplexity: "O(26) - limited to 26 lowercase letters"
  },
  {
    id: 5,
    title: "Minimum Window Substring",
    question: "Given two strings s and t, find the minimum substring of s that contains all characters of t.",
    hint: "Use a sliding window and track character frequencies.",
    oneLiner: "Use sliding window and hashmap to shrink window once all chars are matched.",
    simpleExplanation: "We count the letters we need.\nAs we move forward, we check if we have enough of each letter.\nThen we shrink the window from the left to find the smallest one.",
    mnemonics: [
      "\"Need map\" → need = Counter(t)",
      "\"Expand window\" → window[s[r]] += 1",
      "\"Shrink if valid\" → while formed == required: update res, move left"
    ],
    code: `from collections import Counter

def minWindow(s: str, t: str) -> str:
    if not t or not s:
        return ""
    
    t_count = Counter(t)
    window_count = Counter()
    
    left = right = formed = 0
    required = len(t_count)
    min_len = float("inf")
    min_window = ""

    while right < len(s):
        window_count[s[right]] += 1
        if window_count[s[right]] == t_count[s[right]]:
            formed += 1

        while formed == required:
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_window = s[left:right+1]

            window_count[s[left]] -= 1
            if s[left] in t_count and window_count[s[left]] < t_count[s[left]]:
                formed -= 1

            left += 1
        
        right += 1
    
    return min_window`,
    timeComplexity: "O(N) - where N is the length of s",
    spaceComplexity: "O(26) - limited to character set size"
  },
  {
    id: 6,
    title: "Sliding Window Maximum",
    question: "Given an array nums and a window size k, return the maximum element in each window.",
    hint: "Use a deque to maintain indices of potential maximum elements.",
    oneLiner: "Use a deque to keep track of max values in the current window.",
    simpleExplanation: "We go through numbers with a window of size k.\nWe keep only the biggest numbers inside the window.\nWe throw out numbers that are too old or too small.",
    mnemonics: [
      "\"Pop smaller\" → while q and nums[i] > nums[q[-1]]: q.pop()",
      "\"Pop out-of-window\" → if q[0] <= i - k: q.popleft()",
      "\"Append max\" → if i >= k - 1: res.append(nums[q[0]])"
    ],
    code: `from collections import deque

def maxSlidingWindow(nums: list[int], k: int) -> list[int]:
    if not nums:
        return []
    
    deque_window = deque()
    result = []

    for i in range(len(nums)):
        # Remove elements outside the window
        if deque_window and deque_window[0] < i - k + 1:
            deque_window.popleft()

        # Remove smaller elements in k range
        while deque_window and nums[deque_window[-1]] < nums[i]:
            deque_window.pop()
        
        deque_window.append(i)

        # Append max value once window size is reached
        if i >= k - 1:
            result.append(nums[deque_window[0]])

    return result`,
    timeComplexity: "O(N) - each element is processed at most twice",
    spaceComplexity: "O(K) - the deque never grows beyond size k"
  }
];