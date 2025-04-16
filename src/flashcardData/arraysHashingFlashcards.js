export const arraysHashingFlashcards = [
  {
    id: 1,
    title: "Contains Duplicate",
    question: "Check if an array contains any duplicates.",
    hint: "Think about using a data structure that allows for quick lookup.",
    oneLiner: "Use a set to check if any element repeats.",
    simpleExplanation: "We go through each number.\nWe keep a list of ones we've already seen.\nIf a number shows up again, we know it's a duplicate.",
    mnemonics: [
      "\"Seen before?\" → if num in seen: return True",
      "\"Add new\" → seen.add(num)",
      "\"End clean\" → return False"
    ],
    code: `def hasDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
    timeComplexity: "O(n) - one pass through the array",
    spaceComplexity: "O(n) - in worst case, all elements in set"
  },
  {
    id: 2,
    title: "Valid Anagram",
    question: "Determine if two strings are anagrams (contain the same letters).",
    hint: "Count the frequency of characters in both strings and compare.",
    oneLiner: "Use counters (hashmaps) to compare character frequencies.",
    simpleExplanation: "We count the letters in both words.\nIf every letter shows up the same number of times, it's an anagram.\nOtherwise, it's not.",
    mnemonics: [
      "\"Count both\" → Counter(s) == Counter(t)",
      "\"Compare maps\" → for key in counts: compare values",
      "\"Return result\" → return True/False"
    ],
    code: `def isAnagram(s, t):
    if len(s) != len(t):
        return False

    count = [0] * 26
    for i in range(len(s)):
        count[ord(s[i]) - ord('a')] += 1
        count[ord(t[i]) - ord('a')] -= 1

    for val in count:
        if val != 0:
            return False
    return True`,
    timeComplexity: "O(n) - where n is the length of the strings",
    spaceComplexity: "O(1) - fixed array size for character counts"
  },
  {
    id: 3,
    title: "Two Sum",
    question: "Find two numbers in an array that add up to a target.",
    hint: "Use a hash map to store values you've seen and their indices.",
    oneLiner: "Store each number's complement in a hashmap as we loop.",
    simpleExplanation: "We look for two numbers that add to a target.\nWe remember each number we see and what we need to reach the target.\nIf we find the right pair, we return their positions.",
    mnemonics: [
      "\"Check map\" → if target - num in seen: return [i, seen[target - num]]",
      "\"Store index\" → seen[num] = i",
      "\"Loop through\" → for i, num in enumerate(nums):"
    ],
    code: `def twoSum(nums, target):
    indices = {}  # val -> index
    for i, n in enumerate(nums):
        diff = target - n
        if diff in indices:
            return [indices[diff], i]
        indices[n] = i
    return []`,
    timeComplexity: "O(n) - one pass through the array",
    spaceComplexity: "O(n) - for the hash map"
  },
  {
    id: 4,
    title: "Group Anagrams",
    question: "Group a list of strings such that all anagrams are together.",
    hint: "Use a common representation (like sorted string) as a key to group anagrams.",
    oneLiner: "Group words using sorted letters as a key in a hashmap.",
    simpleExplanation: "We sort the letters in each word.\nWords with the same letters go into the same group.\nWe collect all the groups.",
    mnemonics: [
      "\"Sort word\" → key = ''.join(sorted(word))",
      "\"Group by key\" → anagram_map[key].append(word)",
      "\"Return values\" → return anagram_map.values()"
    ],
    code: `def groupAnagrams(strs):
    res = defaultdict(list)
    for s in strs:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord('a')] += 1
        res[tuple(count)].append(s)
    return list(res.values())`,
    timeComplexity: "O(n*k) - where n is the number of strings and k is the max string length",
    spaceComplexity: "O(n) - for storing all strings"
  },
  {
    id: 5,
    title: "Top K Frequent Elements",
    question: "Find the k most frequent elements in an array.",
    hint: "Use a counter to track frequencies and a heap to find the top k elements.",
    oneLiner: "Use a counter and a heap to get the top k items.",
    simpleExplanation: "We count how many times each number shows up.\nWe keep the k most common ones.\nThen we return them.",
    mnemonics: [
      "\"Count frequency\" → count = Counter(nums)",
      "\"Heap select top\" → heapq.nlargest(k, count.keys(), key=count.get)",
      "\"Return result\" → return result"
    ],
    code: `def topKFrequent(nums, k):
    count = {}
    freq = [[] for i in range(len(nums) + 1)]

    for num in nums:
        count[num] = 1 + count.get(num, 0)
    for num, cnt in count.items():
        freq[cnt].append(num)
    
    res = []
    for i in range(len(freq) - 1, 0, -1):
        for num in freq[i]:
            res.append(num)
            if len(res) == k:
                return res`,
    timeComplexity: "O(n) - bucket sort approach",
    spaceComplexity: "O(n) - for the frequency counters"
  },
  {
    id: 6,
    title: "Encode and Decode Strings",
    question: "Design an algorithm to encode and decode a list of strings into a single string.",
    hint: "Use a delimiter with length information to separate strings unambiguously.",
    oneLiner: "Use a length prefix or delimiter to encode, then decode safely.",
    simpleExplanation: "We turn each word into a number + word combo.\nThat way we can separate them later.\nWe read the length to split them back correctly.",
    mnemonics: [
      "\"Encode with length\" → s = str(len(word)) + \"#\" + word",
      "\"Split by count\" → length = int(s[:i]), then s[i+1:i+1+length]",
      "\"Loop until done\" → while i < len(s): decode"
    ],
    code: `class Solution:
    def encode(self, strs):
        res = ""
        for s in strs:
            res += str(len(s)) + "#" + s
        return res

    def decode(self, s):
        res = []
        i = 0
        
        while i < len(s):
            j = i
            while s[j] != '#':
                j += 1
            length = int(s[i:j])
            i = j + 1
            j = i + length
            res.append(s[i:j])
            i = j
            
        return res`,
    timeComplexity: "O(n) - linear in total string length",
    spaceComplexity: "O(n) - for the encoded/decoded strings"
  },
  {
    id: 7,
    title: "Product of Array Except Self",
    question: "Compute the product of all elements except self without division.",
    hint: "Use prefix and suffix products to compute the result in two passes.",
    oneLiner: "Use prefix and suffix multiplications without division.",
    simpleExplanation: "We find how much every number would be if we multiply all other numbers.\nFirst, we go left to right.\nThen, we go right to left and finish the math.",
    mnemonics: [
      "\"Left pass\" → for i in range(n): res[i] *= prefix",
      "\"Right pass\" → for i in reversed(range(n)): res[i] *= suffix",
      "\"Update prefixes\" → prefix *= nums[i], suffix *= nums[i]"
    ],
    code: `def productExceptSelf(nums):
    res = [1] * (len(nums))

    prefix = 1
    for i in range(len(nums)):
        res[i] = prefix
        prefix *= nums[i]
    postfix = 1
    for i in range(len(nums) - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
    return res`,
    timeComplexity: "O(n) - two passes through the array",
    spaceComplexity: "O(1) - excluding output array"
  },
  {
    id: 8,
    title: "Valid Sudoku",
    question: "Determine if a 9x9 Sudoku board is valid.",
    hint: "Check each row, column, and 3x3 sub-box for duplicates.",
    oneLiner: "Use sets to check each row, column, and 3x3 box.",
    simpleExplanation: "Each row, column, and box must have unique numbers.\nWe go through the board and record what we see.\nIf anything repeats in the same row, column, or box, it's not valid.",
    mnemonics: [
      "\"Check each cell\" → for i in range(9): for j in range(9):",
      "\"Use 3 keys\" → row[i], col[j], box[i//3, j//3]",
      "\"Add or return False\" → if val in set: return False else: add"
    ],
    code: `def isValidSudoku(board):
    for row in range(9):
        seen = set()
        for i in range(9):
            if board[row][i] == ".": 
                continue
            if board[row][i] in seen:
                return False
            seen.add(board[row][i])
    
    for col in range(9):
        seen = set()
        for i in range(9):
            if board[i][col] == ".":
                continue
            if board[i][col] in seen:
                return False
            seen.add(board[i][col])
        
    for square in range(9):
        seen = set()
        for i in range(3):
            for j in range(3):
                row = (square//3) * 3 + i
                col = (square % 3) * 3 + j
                if board[row][col] == ".":
                    continue
                if board[row][col] in seen:
                    return False
                seen.add(board[row][col])
    return True`,
    timeComplexity: "O(1) - fixed size (9x9) board",
    spaceComplexity: "O(1) - fixed size sets"
  },
  {
    id: 9,
    title: "Longest Consecutive Sequence",
    question: "Find the length of the longest consecutive sequence in an unsorted array.",
    hint: "Use a set for O(1) lookups and check for sequence starts.",
    oneLiner: "Use a set and expand sequences from the smallest number.",
    simpleExplanation: "We put all the numbers in a quick lookup set.\nThen we start from numbers that are the beginning of a sequence.\nWe count how long each chain goes.",
    mnemonics: [
      "\"Add to set\" → num_set = set(nums)",
      "\"Start from beginning\" → if num - 1 not in num_set:",
      "\"Expand right\" → while num + streak in num_set: streak += 1"
    ],
    code: `def longestConsecutive(nums):
    numSet = set(nums)
    longest = 0

    for num in numSet:
        if (num - 1) not in numSet:
            length = 1
            while (num + length) in numSet:
                length += 1
            longest = max(length, longest)
    return longest`,
    timeComplexity: "O(n) - we visit each number at most twice",
    spaceComplexity: "O(n) - for the set"
  }
];