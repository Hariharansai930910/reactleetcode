export const twoPointersFlashcards = [
  {
    id: 1,
    title: "Valid Palindrome",
    question: "Check if a given string is a palindrome, considering only alphanumeric characters and ignoring cases.",
    hint: "Try using two pointers moving from both ends of the string, skipping non-alphanumeric characters.",
    oneLiner: "Use two pointers from both ends, skipping non-alphanumerics and comparing characters.",
    simpleExplanation: "We look at one letter from the front and one from the back.\nWe skip anything that's not a letter or number.\nIf everything matches going inward, it's a palindrome!",
    mnemonics: [
      "\"Skip non-letters\" → if not s[l].isalnum(): l += 1",
      "\"Lowercase compare\" → if s[l].lower() != s[r].lower(): return False",
      "\"Move pointers\" → l += 1, r -= 1"
    ],
    code: `def isPalindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
            
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True`,
    timeComplexity: "O(N) - we process each character at most once",
    spaceComplexity: "O(1) - only using two pointers regardless of input size"
  },
  {
    id: 2,
    title: "Two Sum II - Input Array Is Sorted",
    question: "Find two numbers in a sorted array that add up to a target.",
    hint: "Since the array is sorted, try using two pointers from both ends and adjust based on the sum.",
    oneLiner: "Use two pointers from both ends and move based on sum.",
    simpleExplanation: "We start from both ends of the list.\nIf the sum is too big, move the right one left.\nIf too small, move the left one right — until it fits!",
    mnemonics: [
      "\"Check sum\" → if nums[l] + nums[r] == target: return",
      "\"Too big?\" → if sum > target: r -= 1",
      "\"Too small?\" → if sum < target: l += 1"
    ],
    code: `def twoSum(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1
    
    while left < right:
        curr_sum = numbers[left] + numbers[right]
        
        if curr_sum == target:
            return [left + 1, right + 1]  # 1-based index
        
        if curr_sum < target:
            left += 1
        else:
            right -= 1
    
    return []`,
    timeComplexity: "O(N) - we process each element at most once",
    spaceComplexity: "O(1) - only using two pointers regardless of input size"
  },
  {
    id: 3,
    title: "3Sum",
    question: "Find all unique triplets in an array that sum to zero.",
    hint: "Sort the array first, then use a combination of iteration and two pointers technique.",
    oneLiner: "Sort the array, then for each element, use two pointers to find pairs that complete the triplet.",
    simpleExplanation: "First, we sort all numbers.\nThen for each number, we look for two other numbers that add up to create zero.\nWe use two pointers to efficiently find these pairs.",
    mnemonics: [
      "\"Sort first\" → nums.sort()",
      "\"Skip duplicates\" → if i > 0 and nums[i] == nums[i-1]: continue",
      "\"Two pointers for sum\" → left, right = i+1, len(nums)-1"
    ],
    code: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:  # Skip duplicates
            continue
        
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            
            if total == 0:
                res.append([nums[i], nums[left], nums[right]])
                
                while left < right and nums[left] == nums[left + 1]:  # Skip duplicates
                    left += 1
                while left < right and nums[right] == nums[right - 1]:  # Skip duplicates
                    right -= 1
                
                left += 1
                right -= 1
                
            elif total < 0:
                left += 1
            else:
                right -= 1
                
    return res`,
    timeComplexity: "O(N²) - sorting takes O(N log N), then we have nested loops",
    spaceComplexity: "O(1) - excluding the output array"
  },
  {
    id: 4,
    title: "Container With Most Water",
    question: "Find two vertical lines that form a container with the maximum water storage.",
    hint: "Try starting with the widest container and strategically move inward.",
    oneLiner: "Use two pointers from ends and move the one with shorter height.",
    simpleExplanation: "We look at the widest container first.\nWe always keep the bigger height and try to make width smaller.\nWe keep track of the best result as we move inward.",
    mnemonics: [
      "\"Start ends\" → l, r = 0, len(height) - 1",
      "\"Calculate area\" → area = min(height[l], height[r]) * (r - l)",
      "\"Move pointer\" → if height[l] < height[r]: l += 1 else: r -= 1"
    ],
    code: `def maxArea(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        max_water = max(max_water, (right - left) * min(height[left], height[right]))
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water`,
    timeComplexity: "O(N) - we process each element at most once",
    spaceComplexity: "O(1) - only using constant extra space"
  },
  {
    id: 5,
    title: "Trapping Rain Water",
    question: "Calculate the amount of rainwater that can be trapped between an array of heights.",
    hint: "For each position, the water trapped depends on the maximum heights to its left and right.",
    oneLiner: "Use two pointers with left/right max to accumulate water at each position.",
    simpleExplanation: "We look at the left and right sides of each block.\nWe keep track of the highest walls on both ends.\nWater is trapped if the block is lower than both sides.",
    mnemonics: [
      "\"Track maxes\" → left_max = max(left_max, height[l])",
      "\"Trap water\" → if height[l] < height[r]: water += left_max - height[l]",
      "\"Move inward\" → l += 1 or r -= 1 depending on height"
    ],
    code: `def trap(height: list[int]) -> int:
    if not height:
        return 0
    
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    trapped_water = 0
    
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                trapped_water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                trapped_water += right_max - height[right]
            right -= 1
            
    return trapped_water`,
    timeComplexity: "O(N) - we process each element at most once",
    spaceComplexity: "O(1) - using constant extra space"
  }
];