export const stackFlashcards = [
  {
    id: 1,
    title: "Valid Parentheses",
    question: "Given a string containing only ()[], determine if it is valid.",
    hint: "Use a stack to match opening and closing brackets.",
    oneLiner: "Use a stack to match every closing bracket with the latest opening one.",
    simpleExplanation: "Open brackets go into a bag.\nIf you see a closer, match it with the last opener.\nIf the bag is empty at the end, it's valid!",
    mnemonics: [
      "\"Push opener\" → stack.append(char)",
      "\"Pop and match\" → top = stack.pop() if stack else '#'",
      "\"Check match\" → if mapping[char] != top: return False"
    ],
    code: `def isValid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    
    return not stack`,
    timeComplexity: "O(N) - one pass through the string",
    spaceComplexity: "O(N) - in worst case, all opening brackets"
  },
  {
    id: 2,
    title: "Min Stack",
    question: "Implement a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    hint: "Use an auxiliary stack to track minimum values.",
    oneLiner: "Keep a second stack that always holds the current minimum.",
    simpleExplanation: "One stack is for real items.\nAnother stack is for the smallest so far.\nPeek the small stack to get the min anytime!",
    mnemonics: [
      "\"Push min\" → if not min_stack or val <= min_stack[-1]: min_stack.append(val)",
      "\"Pop min too\" → if popped == min_stack[-1]: min_stack.pop()",
      "\"Get min\" → return min_stack[-1]"
    ],
    code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        if self.stack.pop() == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
    timeComplexity: "O(1) - constant time for all operations",
    spaceComplexity: "O(N) - in worst case, we store each element twice"
  },
  {
    id: 3,
    title: "Evaluate Reverse Polish Notation",
    question: "Evaluate an arithmetic expression in Reverse Polish Notation.",
    hint: "Use a stack to process numbers and operators.",
    oneLiner: "Use a stack to apply operators to previous numbers.",
    simpleExplanation: "Read numbers and put them in a stack.\nWhen you see a symbol, do math on the top two numbers.\nPut the result back and keep going!",
    mnemonics: [
      "\"Pop two, compute\" → a = stack.pop(); b = stack.pop()",
      "\"Divide carefully\" → stack.append(int(a / b))",
      "\"Push number\" → stack.append(int(token))"
    ],
    code: `def evalRPN(tokens: list[str]) -> int:
    stack = []
    for token in tokens:
        if token in {'+', '-', '*', '/'}:
            b, a = stack.pop(), stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            elif token == '/':
                stack.append(int(a / b))  # Ensure truncation towards zero
        else:
            stack.append(int(token))
    
    return stack[0]`,
    timeComplexity: "O(N) - process each token once",
    spaceComplexity: "O(N) - in worst case, all tokens are numbers"
  },
  {
    id: 4,
    title: "Generate Parentheses",
    question: "Generate all valid combinations of n pairs of parentheses.",
    hint: "Use backtracking with open and close counts.",
    oneLiner: "Use backtracking with open and close counters to build valid combinations.",
    simpleExplanation: "You can only close if you've opened one.\nKeep adding ( or ) if it's allowed.\nAdd to the list when it's full and balanced!",
    mnemonics: [
      "\"Base case full\" → if len(s) == 2 * n: res.append(s)",
      "\"Try opening\" → if left < n: backtrack(s + \"(\", ...)",
      "\"Try closing\" → if right < left: backtrack(s + \")\", ...)"
    ],
    code: `def generateParenthesis(n: int) -> list[str]:
    res = []
    
    def backtrack(s, left, right):
        if len(s) == 2 * n:
            res.append(s)
            return
        if left < n:
            backtrack(s + "(", left + 1, right)
        if right < left:
            backtrack(s + ")", left, right + 1)
    
    backtrack("", 0, 0)
    return res`,
    timeComplexity: "O(4^n / √n) - approximate number of valid combinations",
    spaceComplexity: "O(N) - max recursion depth of 2n"
  },
  {
    id: 5,
    title: "Daily Temperatures",
    question: "Given an array of temperatures, return an array where ans[i] is the number of days until a warmer temperature.",
    hint: "Use a monotonic stack to track indices of temperatures.",
    oneLiner: "Use a monotonic stack to find the next warmer day.",
    simpleExplanation: "Keep days in a stack until a warmer one shows up.\nThen pop and mark how long they waited.\nRepeat until all are checked.",
    mnemonics: [
      "\"Pop when warmer\" → while stack and temperatures[stack[-1]] < temp:",
      "\"Set wait days\" → res[idx] = i - idx",
      "\"Track index\" → stack.append(i)"
    ],
    code: `def dailyTemperatures(temperatures: list[int]) -> list[int]:
    stack = []
    res = [0] * len(temperatures)
    
    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            idx = stack.pop()
            res[idx] = i - idx
        stack.append(i)
    
    return res`,
    timeComplexity: "O(N) - each temperature is pushed and popped at most once",
    spaceComplexity: "O(N) - in worst case, the stack stores all indices"
  },
  {
    id: 6,
    title: "Car Fleet",
    question: "Given position and speed arrays of cars, return the number of fleets that arrive at the destination.",
    hint: "Sort by position and calculate arrival time for each car.",
    oneLiner: "Sort cars by position and use a stack to track merging fleets.",
    simpleExplanation: "Sort cars from back to front.\nSee how long each takes to reach the end.\nIf one catches another, they become a team!",
    mnemonics: [
      "\"Sort by position\" → cars = sorted(zip(position, speed), reverse=True)",
      "\"Calc time to end\" → time = (target - pos) / spd",
      "\"Stack only new fleets\" → if not stack or time > stack[-1]: stack.append(time)"
    ],
    code: `def carFleet(target: int, position: list[int], speed: list[int]) -> int:
    cars = sorted(zip(position, speed), reverse=True)
    stack = []
    
    for pos, spd in cars:
        time = (target - pos) / spd
        if not stack or time > stack[-1]:
            stack.append(time)
    
    return len(stack)`,
    timeComplexity: "O(N log N) - dominated by the sorting step",
    spaceComplexity: "O(N) - for the sorted array and stack"
  },
  {
    id: 7,
    title: "Largest Rectangle in Histogram",
    question: "Find the largest rectangular area in a histogram.",
    hint: "Use a monotonic stack to calculate areas when heights decrease.",
    oneLiner: "Use a monotonic stack to compute max area rectangle at each drop.",
    simpleExplanation: "Go bar by bar, stack up when taller.\nIf a lower one comes, pop and measure.\nAlways track the biggest area!",
    mnemonics: [
      "\"Push height index\" → stack.append(i)",
      "\"Pop and calc area\" → width = i if not stack else i - stack[-1] - 1",
      "\"Update max area\" → max_area = max(max_area, height * width)"
    ],
    code: `def largestRectangleArea(heights: list[int]) -> int:
    stack = []
    max_area = 0
    heights.append(0)  # Sentinel value
    
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    
    return max_area`,
    timeComplexity: "O(N) - each bar is pushed and popped at most once",
    spaceComplexity: "O(N) - in worst case, the stack contains all bars"
  }
];