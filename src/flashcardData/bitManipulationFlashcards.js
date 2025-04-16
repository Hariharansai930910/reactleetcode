// src/flashcardData/bitManipulationFlashcards.js

export const bitManipulationFlashcards = [
  {
    id: 1,
    title: "Single Number",
    question: "Find the single number that appears only once in an array where all other numbers appear twice.",
    hint: "Consider using the XOR operation to cancel out duplicates.",
    oneLiner: "Use XOR to cancel out all duplicate numbers, leaving the single one.",
    simpleExplanation: "Every number appears twice except one.\nMatching numbers cancel each other out.\nOnly the lonely one stays!",
    mnemonics: [
      "\"Cancel duplicates\" → result ^= num",
      "\"Start with zero\" → result = 0",
      "\"Return the lone survivor\" → return result"
    ],
    code: `def singleNumber(nums):
    result = 0
    for num in nums:
        # XOR operation: a ^ a = 0 and a ^ 0 = a
        # So all pairs will cancel out, leaving only the single number
        result ^= num
    return result`,
    timeComplexity: "O(n) - one pass through the array",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 2,
    title: "Number of 1 Bits",
    question: "Count the number of '1' bits in an unsigned integer.",
    hint: "A powerful bit manipulation trick: n & (n-1) clears the rightmost set bit.",
    oneLiner: "Use n & (n - 1) to clear the rightmost 1 until n becomes 0.",
    simpleExplanation: "Look at a number's binary.\nEvery time you chop off a 1, count it.\nKeep chopping till there are none!",
    mnemonics: [
      "\"Chop rightmost 1\" → n &= (n - 1)",
      "\"Count each chop\" → count += 1",
      "\"Loop until empty\" → while n:"
    ],
    code: `def hammingWeight(n):
    count = 0
    while n:
        # n & (n-1) removes the rightmost 1 bit
        n &= (n - 1)
        count += 1
    return count`,
    timeComplexity: "O(k) - where k is the number of 1 bits",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 3,
    title: "Counting Bits",
    question: "Count the number of '1' bits in each number from 0 to n.",
    hint: "Reuse previously calculated results with dynamic programming.",
    oneLiner: "Build up the 1-bit count using previous results and last bit.",
    simpleExplanation: "Every number is made from smaller ones.\nCopy their 1-count and add the last bit.\nStore the count and keep going!",
    mnemonics: [
      "\"Right shift reuse\" → result[i >> 1] + (i & 1)",
      "\"Start from zero\" → result = [0] * (n + 1)",
      "\"Build bottom-up\" → for i in range(1, n + 1):"
    ],
    code: `def countBits(n):
    # Initialize result array with 0 for the first element
    result = [0] * (n + 1)
    
    for i in range(1, n + 1):
        # For any number i, result[i] = result[i >> 1] + (i & 1)
        # This works because i >> 1 is i / 2, and i & 1 is the last bit
        result[i] = result[i >> 1] + (i & 1)
    
    return result`,
    timeComplexity: "O(n) - we process each number from 0 to n",
    spaceComplexity: "O(n) - for the output array"
  },
  {
    id: 4,
    title: "Reverse Bits",
    question: "Reverse the bits of a 32-bit unsigned integer.",
    hint: "Build the result bit by bit, shifting and OR-ing.",
    oneLiner: "Shift and build the reversed number bit-by-bit.",
    simpleExplanation: "Read one bit at a time from right to left.\nPut it in the new number from left to right.\nDo this 32 times!",
    mnemonics: [
      "\"Shift left & add\" → result = (result << 1) | (n & 1)",
      "\"Shift n right\" → n >>= 1",
      "\"Do it 32 times\" → for i in range(32):"
    ],
    code: `def reverseBits(n):
    result = 0
    for i in range(32):
        # Left shift result by 1 to make space for the next bit
        result <<= 1
        # Add the least significant bit of n to result
        result |= (n & 1)
        # Right shift n by 1 to process the next bit
        n >>= 1
    
    return result`,
    timeComplexity: "O(1) - constant time (always 32 operations)",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 5,
    title: "Missing Number",
    question: "Find the missing number in a sequence of 0 to n.",
    hint: "Use properties of XOR to find the missing element.",
    oneLiner: "Use XOR to cancel out all matching numbers and find the missing one.",
    simpleExplanation: "XOR all numbers from 0 to n.\nXOR all numbers in the array.\nWhat remains is the missing number!",
    mnemonics: [
      "\"XOR indices\" → result ^= i",
      "\"XOR values\" → result ^= nums[i]",
      "\"XOR missing index\" → result ^= n"
    ],
    code: `def missingNumber(nums):
    result = len(nums)
    for i in range(len(nums)):
        result ^= i ^ nums[i]
    return result`,
    timeComplexity: "O(n) - one pass through the array",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 6,
    title: "Sum of Two Integers",
    question: "Calculate the sum of two integers without using the + or - operators.",
    hint: "Use bitwise operations to simulate addition.",
    oneLiner: "Use XOR for sum without carry and AND with shift for carry.",
    simpleExplanation: "XOR gives sum without carry.\nAND with shift gives the carry.\nRepeat until no carry left!",
    mnemonics: [
      "\"Sum without carry\" → a ^ b",
      "\"Generate carry\" → (a & b) << 1",
      "\"Repeat until done\" → while b != 0:"
    ],
    code: `def getSum(a, b):
    mask = 0xFFFFFFFF  # 32-bit mask
    
    while b != 0:
        # Calculate carry
        carry = ((a & b) & mask) << 1
        # Sum without carry
        a = (a ^ b) & mask
        b = carry
    
    # Convert back to signed integer if needed
    return a if a <= 0x7FFFFFFF else ~(a ^ mask)`,
    timeComplexity: "O(1) - constant time (maximum 32 iterations)",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 7,
    title: "Reverse Integer",
    question: "Reverse a 32-bit signed integer, returning 0 if the result overflows.",
    hint: "Extract digits by modulo and build the reverse number while checking for overflow.",
    oneLiner: "Extract digits from the end and build the number in reverse order.",
    simpleExplanation: "Pick off digits from the end one by one.\nAdd each to the reversed number.\nCheck for 32-bit integer overflow!",
    mnemonics: [
      "\"Extract digit\" → pop = x % 10",
      "\"Build reverse\" → rev = rev * 10 + pop",
      "\"Check overflow\" → if rev > 2^31-1 or rev < -2^31: return 0"
    ],
    code: `def reverse(x):
    # Handle negative numbers
    is_negative = x < 0
    x = abs(x)
    
    reversed_x = 0
    while x > 0:
        # Extract last digit
        digit = x % 10
        # Remove last digit from x
        x //= 10
        # Add digit to reversed_x
        reversed_x = reversed_x * 10 + digit
    
    # Check for overflow
    if reversed_x > 2**31 - 1:
        return 0
    
    return -reversed_x if is_negative else reversed_x`,
    timeComplexity: "O(log n) - we process each digit",
    spaceComplexity: "O(1) - constant extra space"
  }
];