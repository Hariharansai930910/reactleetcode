export const backtrackingFlashcards = [
  {
    id: 1,
    title: "Subsets",
    question: "Generate all possible subsets of a given set of distinct integers.",
    hint: "Use backtracking to recursively build all combinations.",
    oneLiner: "Use backtracking to include or exclude each number.",
    simpleExplanation: "We pick numbers one by one.\nEach time, we decide to keep it or skip it.\nThat gives us all possible combinations.",
    mnemonics: [
      "\"Start with empty list\" → res = [[]]",
      "\"Try adding\" → dfs(index + 1, path + [nums[i]])",
      "\"Try skipping\" → dfs(index + 1, path)"
    ],
    code: `def subsets(self, nums):
    result = []
    def backtrack(start, path):
        result.append(path)
        for i in range(start, len(nums)):
            backtrack(i + 1, path + [nums[i]])
    backtrack(0, [])
    return result`,
    timeComplexity: "O(2^n) - we generate all possible subsets",
    spaceComplexity: "O(n) - maximum depth of recursion stack"
  },
  {
    id: 2,
    title: "Combination Sum",
    question: "Find all unique combinations of candidates where the chosen numbers sum to a target.",
    hint: "Use backtracking to try different combinations, and each number can be used unlimited times.",
    oneLiner: "Use DFS to try combinations, reusing the same number.",
    simpleExplanation: "We keep adding numbers until we hit the target.\nWe can use the same number again.\nIf it's too much, we stop and go back.",
    mnemonics: [
      "\"Base case\" → if target == 0: add path",
      "\"Too big\" → if target < 0: return",
      "\"Try again\" → dfs(i, path + [candidates[i]], target - candidates[i])"
    ],
    code: `def combinationSum(self, candidates, target):
    result = []
    def backtrack(start, target, path):
        if target == 0:
            result.append(path)
            return
        for i in range(start, len(candidates)):
            if candidates[i] > target:
                continue
            backtrack(i, target - candidates[i], path + [candidates[i]])
    candidates.sort()
    backtrack(0, target, [])
    return result`,
    timeComplexity: "O(N^(T/M)) - where T is target and M is minimum value",
    spaceComplexity: "O(T/M) - maximum recursion depth"
  },
  {
    id: 3,
    title: "Combination Sum II",
    question: "Find all unique combinations in candidates where the chosen numbers sum to target (no duplicates allowed).",
    hint: "Sort the array first to handle duplicates easily.",
    oneLiner: "Like Combination Sum but skip duplicates and don't reuse elements.",
    simpleExplanation: "We can't use the same number again.\nWe also skip duplicates to avoid repeat combos.\nWe keep trying until the sum matches the target.",
    mnemonics: [
      "\"Sort first\" → candidates.sort()",
      "\"Skip duplicates\" → if i > start and candidates[i] == candidates[i - 1]: continue",
      "\"DFS without reuse\" → dfs(i + 1, path + [candidates[i]], target - candidates[i])"
    ],
    code: `def combinationSum2(self, candidates, target):
    result = []
    candidates.sort()
    def backtrack(start, target, path):
        if target == 0:
            result.append(path)
            return
        prev = -1
        for i in range(start, len(candidates)):
            if candidates[i] == prev:
                continue
            if candidates[i] > target:
                break
            backtrack(i + 1, target - candidates[i], path + [candidates[i]])
            prev = candidates[i]
    backtrack(0, target, [])
    return result`,
    timeComplexity: "O(2^n) - worst case, all combinations",
    spaceComplexity: "O(n) - maximum recursion depth"
  },
  {
    id: 4,
    title: "Permutations",
    question: "Return all possible permutations of a list of distinct integers.",
    hint: "Track which numbers have been used in the current permutation.",
    oneLiner: "Use backtracking to build all possible orders.",
    simpleExplanation: "We make all different orders of the numbers.\nWe pick one at a time and don't repeat it.\nWhen the list is full, we save it.",
    mnemonics: [
      "\"Track used\" → if num in used: continue",
      "\"Choose number\" → path.append(num)",
      "\"Backtrack\" → path.pop() and used.remove(num)"
    ],
    code: `def permute(self, nums):
    result = []
    def backtrack(path, options):
        if not options:
            result.append(path)
            return
        for i in range(len(options)):
            backtrack(path + [options[i]], options[:i] + options[i+1:])
    backtrack([], nums)
    return result`,
    timeComplexity: "O(n!) - we generate all permutations",
    spaceComplexity: "O(n) - maximum recursion depth"
  },
  {
    id: 5,
    title: "Subsets II",
    question: "Return all possible subsets of a list of integers that might contain duplicates.",
    hint: "Sort the array and skip duplicates at the same level of recursion.",
    oneLiner: "Backtracking with duplicate skip using sorted input.",
    simpleExplanation: "Like normal subsets, but now we skip duplicates.\nWe sort the list so we can spot repeats.\nWe only use the first time a number shows up at a level.",
    mnemonics: [
      "\"Sort input\" → nums.sort()",
      "\"Skip repeat at level\" → if i > start and nums[i] == nums[i - 1]: continue",
      "\"DFS normally\" → dfs(i + 1, path + [nums[i]])"
    ],
    code: `def subsetsWithDup(self, nums):
    result = []
    nums.sort()
    def backtrack(start, path):
        result.append(path)
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            backtrack(i + 1, path + [nums[i]])
    backtrack(0, [])
    return result`,
    timeComplexity: "O(2^n) - worst case, all subsets",
    spaceComplexity: "O(n) - maximum recursion depth"
  },
  {
    id: 6,
    title: "Word Search",
    question: "Given a grid and a word, find if the word exists in the grid. Letters must be adjacent.",
    hint: "Use backtracking to explore all possible paths through the grid.",
    oneLiner: "Backtrack through board cells matching word letters.",
    simpleExplanation: "We try to find each letter one by one.\nWe can only move up/down/left/right.\nIf it works, we return true!",
    mnemonics: [
      "\"Check match\" → if board[i][j] != word[pos]: return",
      "\"Mark visited\" → board[i][j] = '#'",
      "\"Unmark (backtrack)\" → board[i][j] = original_letter"
    ],
    code: `def exist(self, board, word):
    rows, cols = len(board), len(board[0])
    def backtrack(r, c, index):
        if index == len(word):
            return True
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[index]:
            return False
        temp, board[r][c] = board[r][c], '#'
        found = (backtrack(r+1, c, index+1) or
                 backtrack(r-1, c, index+1) or
                 backtrack(r, c+1, index+1) or
                 backtrack(r, c-1, index+1))
        board[r][c] = temp
        return found
    for r in range(rows):
        for c in range(cols):
            if backtrack(r, c, 0):
                return True
    return False`,
    timeComplexity: "O(M×N×4^L) - where L is word length",
    spaceComplexity: "O(L) - recursion depth equals word length"
  },
  {
    id: 7,
    title: "Palindrome Partitioning",
    question: "Partition a string such that every substring is a palindrome. Return all possible partitions.",
    hint: "Use backtracking to try different cutting points in the string.",
    oneLiner: "Use backtracking to cut the string at every palindrome point.",
    simpleExplanation: "We break the string into pieces.\nOnly cut when the piece is a palindrome.\nWe keep cutting until the whole string is split.",
    mnemonics: [
      "\"Check palindrome\" → if s[l:r+1] == s[l:r+1][::-1]",
      "\"Cut and continue\" → dfs(end + 1, path + [s[start:end+1]])",
      "\"Add to result\" → if start == len(s): res.append(path)"
    ],
    code: `def partition(self, s):
    result = []
    def is_palindrome(sub):
        return sub == sub[::-1]
    def backtrack(start, path):
        if start == len(s):
            result.append(path)
            return
        for end in range(start + 1, len(s) + 1):
            if is_palindrome(s[start:end]):
                backtrack(end, path + [s[start:end]])
    backtrack(0, [])
    return result`,
    timeComplexity: "O(N×2^N) - checking palindromes adds a factor of N",
    spaceComplexity: "O(N) - recursion depth is at most N"
  },
  {
    id: 8,
    title: "Letter Combinations of a Phone Number",
    question: "Given a string containing digits from 2-9, return all possible letter combinations.",
    hint: "Create a mapping of digits to letters and use backtracking.",
    oneLiner: "Backtrack all digit-letter mappings like a tree.",
    simpleExplanation: "Each number maps to letters.\nWe pick one letter per number.\nWe try every combination possible.",
    mnemonics: [
      "\"Map digits\" → digit_map = {'2': 'abc', ...}",
      "\"For each digit\" → for letter in digit_map[digit]:",
      "\"Backtrack\" → dfs(index + 1, path + letter)"
    ],
    code: `def letterCombinations(self, digits):
    if not digits:
        return []
    phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }
    result = []
    def backtrack(index, path):
        if index == len(digits):
            result.append(path)
            return
        for char in phone[digits[index]]:
            backtrack(index + 1, path + char)
    backtrack(0, '')
    return result`,
    timeComplexity: "O(4^N) - each digit maps to at most 4 letters",
    spaceComplexity: "O(N) - recursion depth equals input length"
  },
  {
    id: 9,
    title: "N Queens",
    question: "Place N queens on an N×N chessboard so that no two queens attack each other.",
    hint: "Track which columns, diagonals, and anti-diagonals are occupied.",
    oneLiner: "Place queens row by row, checking for safe spots.",
    simpleExplanation: "We try to put queens one row at a time.\nWe make sure they don't attack each other.\nIf it works, we save the board setup.",
    mnemonics: [
      "\"Loop columns\" → for col in range(n):",
      "\"Check safe\" → if col not in cols and row+col not in diag1 and row-col not in diag2",
      "\"Place & recurse\" → dfs(row + 1) and backtrack positions"
    ],
    code: `def solveNQueens(self, n):
    cols = set()
    diag1 = set()  # r + c
    diag2 = set()  # r - c
    
    result = []
    board = [['.' for _ in range(n)] for _ in range(n)]
    
    def backtrack(r):
        if r == n:
            copy = [''.join(row) for row in board]
            result.append(copy)
            return

        for c in range(n):
            if c in cols or (r + c) in diag1 or (r - c) in diag2:
                continue

            cols.add(c)
            diag1.add(r + c)
            diag2.add(r - c)
            board[r][c] = 'Q'

            backtrack(r + 1)

            cols.remove(c)
            diag1.remove(r + c)
            diag2.remove(r - c)
            board[r][c] = '.'
    
    backtrack(0)
    return result`,
    timeComplexity: "O(N!) - we try each valid permutation of queen placements",
    spaceComplexity: "O(N) - for the board and tracking structures"
  }
];