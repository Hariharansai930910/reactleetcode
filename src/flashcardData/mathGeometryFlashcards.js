export const mathGeometryFlashcards = [
  {
    id: 1,
    title: "Rotate Image",
    question: "Rotate an n×n matrix 90 degrees clockwise in-place.",
    hint: "Think about swapping elements in a strategic way.",
    oneLiner: "Transpose the matrix and reverse each row.",
    simpleExplanation: "We flip the square along the slanty diagonal.\nThen we flip each row like turning a page.\nNow it looks rotated!",
    mnemonics: [
      "\"Flip + Transpose\" → matrix[:] = list(zip(*matrix[::-1]))",
      "\"Turn inside out\" → Transpose first, reverse next",
      "\"In-place magic\" → Modify the same matrix"
    ],
    code: `def rotate(self, matrix: List[List[int]]) -> None:
    # Reverse the matrix vertically
    matrix.reverse()

    # Transpose the matrix
    for i in range(len(matrix)):
        for j in range(i + 1, len(matrix)):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]`,
    timeComplexity: "O(N²) - we touch each element in the matrix",
    spaceComplexity: "O(1) - we rotate in-place without extra space"
  },
  {
    id: 2,
    title: "Spiral Matrix",
    question: "Return all elements of a matrix in spiral order, starting from the outside and spiraling inward.",
    hint: "Traverse the matrix in a spiral pattern: right, down, left, up, and repeat.",
    oneLiner: "Peel outer layers one by one in spiral order.",
    simpleExplanation: "We grab the top row, then go down the side.\nThen we go backwards along the bottom, then up.\nRepeat this spiral till everything's picked.",
    mnemonics: [
      "\"Peel & Rotate\" → res += matrix.pop(0); matrix = list(zip(*matrix))[::-1]",
      "\"Right-Down-Left-Up\" → Classic spiral movement",
      "\"Shrink the box\" → Matrix gets smaller every loop"
    ],
    code: `def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
    res = []
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    steps = [len(matrix[0]), len(matrix) - 1]

    r, c, d = 0, -1, 0
    while steps[d & 1]:
        for i in range(steps[d & 1]):
            r += directions[d][0]
            c += directions[d][1]
            res.append(matrix[r][c])
        steps[d & 1] -= 1
        d += 1
        d %= 4
    return res`,
    timeComplexity: "O(M×N) - we visit each element once",
    spaceComplexity: "O(1) - excluding the output array"
  },
  {
    id: 3,
    title: "Set Matrix Zeroes",
    question: "Given a matrix, if an element is 0, set its entire row and column to 0.",
    hint: "Use the first row and column as markers without using extra space.",
    oneLiner: "Use first row and column to mark zeros to be set later.",
    simpleExplanation: "If something is zero, we remember its row and column.\nWe use the first row and column as sticky notes.\nLater we turn whole rows and columns to zeros.",
    mnemonics: [
      "\"Mark for zero\" → matrix[i][0] = matrix[0][j] = 0",
      "\"First row/col = hint board\"",
      "\"Wipe after scan\" → Do changes only after scanning"
    ],
    code: `def setZeroes(self, matrix: List[List[int]]) -> None:
    ROWS, COLS = len(matrix), len(matrix[0])
    rowZero = False

    for r in range(ROWS):
        for c in range(COLS):
            if matrix[r][c] == 0:
                matrix[0][c] = 0
                if r > 0:
                    matrix[r][0] = 0
                else:
                    rowZero = True

    for r in range(1, ROWS):
        for c in range(1, COLS):
            if matrix[0][c] == 0 or matrix[r][0] == 0:
                matrix[r][c] = 0

    if matrix[0][0] == 0:
        for r in range(ROWS):
            matrix[r][0] = 0

    if rowZero:
        for c in range(COLS):
            matrix[0][c] = 0`,
    timeComplexity: "O(M×N) - we scan the matrix twice",
    spaceComplexity: "O(1) - we use the matrix itself to track zeros"
  },
  {
    id: 4,
    title: "Happy Number",
    question: "Determine if a number is 'happy': replace it with the sum of squares of its digits, and repeat until 1 or a cycle.",
    hint: "Use a technique to detect cycles, like fast and slow pointers.",
    oneLiner: "Loop sum of squares of digits until 1 or repeat.",
    simpleExplanation: "We square and add each digit.\nIf we reach 1, it's a happy number!\nIf we loop, it's stuck and unhappy.",
    mnemonics: [
      "\"Sum of digit squares\" → n = sum(int(c)**2 for c in str(n))",
      "\"Loop with memory\" → seen = set()",
      "\"Stop at 1 or cycle\" → while n != 1 and n not in seen: ..."
    ],
    code: `def isHappy(self, n: int) -> bool:
    slow, fast = n, self.sumOfSquares(n)
    power = lam = 1
    
    while slow != fast:
        if power == lam:
            slow = fast
            power *= 2
            lam = 0
        fast = self.sumOfSquares(fast)
        lam += 1
    return True if fast == 1 else False

def sumOfSquares(self, n: int) -> int:
    output = 0
    while n:
        digit = n % 10
        digit = digit ** 2
        output += digit
        n = n // 10
    return output`,
    timeComplexity: "O(log n) - number of digits decreases quickly",
    spaceComplexity: "O(1) - using constant extra space with Floyd's cycle detection"
  },
  {
    id: 5,
    title: "Plus One",
    question: "Given a non-empty array of digits representing a non-negative integer, increment it by one.",
    hint: "Handle carry operations from right to left.",
    oneLiner: "Add from the back, handle carry, insert if needed.",
    simpleExplanation: "We add 1 to the last digit.\nIf it turns into 10, we carry the 1.\nIf it carries all the way, we add a new digit!",
    mnemonics: [
      "\"Go backward\" → for i in reversed(range(len(digits)))",
      "\"Break early if no carry\"",
      "\"Insert 1 if overflow\" → digits.insert(0, 1)"
    ],
    code: `def plusOne(self, digits: List[int]) -> List[int]:
    one = 1
    i = 0
    digits.reverse()

    while one:
        if i < len(digits):
            if digits[i] == 9:
                digits[i] = 0
            else:
                digits[i] += 1
                one = 0
        else:
            digits.append(one)
            one = 0
        i += 1

    digits.reverse()
    return digits`,
    timeComplexity: "O(N) - potentially examine all digits",
    spaceComplexity: "O(1) - excluding output array, constant extra space"
  },
  {
    id: 6,
    title: "Pow(x, n)",
    question: "Implement pow(x, n), which calculates x raised to the power n.",
    hint: "Use binary exponentiation for efficiency.",
    oneLiner: "Use divide and conquer to reduce power fast.",
    simpleExplanation: "Split the problem into two smaller ones.\nUse the result to build the big one back.\nRepeat until tiny and fast.",
    mnemonics: [
      "\"Halve and square\" → pow(x * x, n // 2)",
      "\"Odd n needs extra x\" → x * pow(...) if n % 2 else pow(...)",
      "\"Fast power = Binary Exponentiation\""
    ],
    code: `def myPow(self, x: float, n: int) -> float:
    if x == 0:
        return 0
    if n == 0:
        return 1
    
    res = 1
    power = abs(n)
    
    while power:
        if power & 1:
            res *= x
        x *= x
        power >>= 1
    
    return res if n >= 0 else 1 / res`,
    timeComplexity: "O(log n) - binary exponentiation",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 7,
    title: "Multiply Strings",
    question: "Given two non-negative integers represented as strings, multiply them without converting directly to integers.",
    hint: "Simulate the traditional multiplication algorithm digit by digit.",
    oneLiner: "Simulate grade-school multiplication using arrays.",
    simpleExplanation: "We multiply each digit like on paper.\nAdd to the right place using carry.\nAt the end, remove leading zeroes.",
    mnemonics: [
      "\"Multiply and place\" → res[i + j + 1] += d1 * d2",
      "\"Add carry\" → res[i + j] += res[i + j + 1] // 10",
      "\"Join digits\" → ''.join(map(str, res)).lstrip('0')"
    ],
    code: `def multiply(self, num1: str, num2: str) -> str:
    if "0" in [num1, num2]:
        return "0"

    res = [0] * (len(num1) + len(num2))
    num1, num2 = num1[::-1], num2[::-1]
    for i1 in range(len(num1)):
        for i2 in range(len(num2)):
            digit = int(num1[i1]) * int(num2[i2])
            res[i1 + i2] += digit
            res[i1 + i2 + 1] += res[i1 + i2] // 10
            res[i1 + i2] = res[i1 + i2] % 10

    res, beg = res[::-1], 0
    while beg < len(res) and res[beg] == 0:
        beg += 1
    res = map(str, res[beg:])
    return "".join(res)`,
    timeComplexity: "O(m*n) - where m,n are the lengths of input strings",
    spaceComplexity: "O(m+n) - for the result array"
  },
  {
    id: 8,
    title: "Detect Squares",
    question: "Design a data structure that supports adding points and counting squares that can be formed.",
    hint: "Store points by coordinates and check for square formations efficiently.",
    oneLiner: "For each new point, check other 3 corners needed to make a square.",
    simpleExplanation: "When we add a point, we remember it.\nTo count squares, we try using that point as one corner.\nWe find 3 other points that make a square with it!",
    mnemonics: [
      "\"Store count of all points\" → self.points = defaultdict(int)",
      "\"Same y = square start\" → Loop all points with same y",
      "\"Check distance & match\" → count += self.points[...] * ..."
    ],
    code: `class DetectSquares:
    def __init__(self):
        self.ptsCount = defaultdict(lambda: defaultdict(int))

    def add(self, point: List[int]) -> None:
        self.ptsCount[point[0]][point[1]] += 1

    def count(self, point: List[int]) -> int:
        res = 0
        x1, y1 = point
        for y2 in self.ptsCount[x1]:
            side = y2 - y1
            if side == 0:
                continue

            x3, x4 = x1 + side, x1 - side
            res += (self.ptsCount[x1][y2] * self.ptsCount[x3][y1] *
                    self.ptsCount[x3][y2])

            res += (self.ptsCount[x1][y2] * self.ptsCount[x4][y1] *
                    self.ptsCount[x4][y2])
        return res`,
    timeComplexity: "add: O(1), count: O(N) where N is the number of points sharing an x-coordinate",
    spaceComplexity: "O(N) where N is the total number of points"
  }
];