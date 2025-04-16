export const binarySearchFlashcards = [
  {
    id: 1,
    title: "Binary Search",
    question: "Find the position of a target value in a sorted array.",
    hint: "Use the sorted property to cut search space in half each time.",
    oneLiner: "Use two pointers to repeatedly cut the search range in half.",
    simpleExplanation: "We look in the middle of the list.\nIf it's not the number, we search only the left or right part.\nWe do this again and again until we find it or run out.",
    mnemonics: [
      "\"Set range\" → low, high = 0, len(nums) - 1",
      "\"Check mid\" → mid = (low + high) // 2",
      "\"Narrow search\" → if nums[mid] < target: low = mid + 1 else: high = mid - 1"
    ],
    code: `def binarySearch(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1`,
    timeComplexity: "O(log n) - search space halves each iteration",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 2,
    title: "Search a 2D Matrix",
    question: "Search for a value in a row and column sorted matrix.",
    hint: "Treat the 2D matrix as a flattened sorted array for binary search.",
    oneLiner: "Treat the 2D matrix like a 1D array and use binary search.",
    simpleExplanation: "We pretend the grid is just one long list.\nWe use binary search on that list.\nWe change the middle number back to row and column to check it.",
    mnemonics: [
      "\"Convert index\" → row = mid // cols; col = mid % cols",
      "\"Compare mid\" → if matrix[row][col] == target: return True",
      "\"Adjust range\" → low = mid + 1 or high = mid - 1"
    ],
    code: `def searchMatrix(matrix, target):
    if not matrix or not matrix[0]:
        return False
    
    rows, cols = len(matrix), len(matrix[0])
    left, right = 0, rows * cols - 1
    
    while left <= right:
        mid = (left + right) // 2
        mid_value = matrix[mid // cols][mid % cols]
        
        if mid_value == target:
            return True
        elif mid_value < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return False`,
    timeComplexity: "O(log(m*n)) - binary search on flattened matrix",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 3,
    title: "Koko Eating Bananas",
    question: "Find the minimum eating speed to finish all bananas within a given time.",
    hint: "Use binary search on the range of possible eating speeds.",
    oneLiner: "Binary search the eating speed to find the minimum speed that finishes on time.",
    simpleExplanation: "We try different eating speeds.\nIf she can finish in time, we try slower ones.\nIf not, we try faster ones.",
    mnemonics: [
      "\"Search range\" → low, high = 1, max(piles)",
      "\"Check time\" → total_time = sum(ceil(pile / mid))",
      "\"Narrow search\" → if time <= h: try slower; else: go faster"
    ],
    code: `import math

def minEatingSpeed(piles, h):
    left, right = 1, max(piles)
    
    def canFinish(speed):
        return sum(math.ceil(pile / speed) for pile in piles) <= h
    
    while left < right:
        mid = (left + right) // 2
        if canFinish(mid):
            right = mid
        else:
            left = mid + 1
            
    return left`,
    timeComplexity: "O(n log m) - where m is max pile size",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 4,
    title: "Find Minimum in Rotated Sorted Array",
    question: "Find the minimum element in a rotated sorted array.",
    hint: "Use binary search and compare with the rightmost element to determine which half to search.",
    oneLiner: "Use binary search to find the smallest element by comparing with the rightmost.",
    simpleExplanation: "The smallest number is in the rotated part.\nWe keep checking the middle and comparing to the end.\nWe move left or right depending on which side is sorted.",
    mnemonics: [
      "\"Mid vs right\" → if nums[mid] > nums[right]: search right",
      "\"Else search left\" → right = mid",
      "\"Result is nums[left]\" → return nums[left]"
    ],
    code: `def findMin(nums):
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:  
            left = mid + 1
        else:
            right = mid  
            
    return nums[left]`,
    timeComplexity: "O(log n) - binary search",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 5,
    title: "Search in Rotated Sorted Array",
    question: "Search for a target in a rotated sorted array.",
    hint: "Determine which half is sorted and check if target is in that half.",
    oneLiner: "Binary search while checking which half is sorted and target range.",
    simpleExplanation: "We split the list in half each time.\nWe check which half is in order.\nThen we pick the side where the target can be.",
    mnemonics: [
      "\"Left sorted?\" → if nums[low] <= nums[mid]:",
      "\"Target in left?\" → if nums[low] <= target < nums[mid]: high = mid - 1",
      "\"Otherwise search right\" → low = mid + 1"
    ],
    code: `def search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:  
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
                
    return -1`,
    timeComplexity: "O(log n) - binary search",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 6,
    title: "Time-Based Key-Value Store",
    question: "Design a time-based key-value store with set and get operations.",
    hint: "Store values with timestamps in sorted order and use binary search for lookups.",
    oneLiner: "Store timestamped values in a list and binary search for the latest one <= target time.",
    simpleExplanation: "We save every version of a value with the time it was saved.\nWhen asked for a time, we look for the latest version at or before that time.\nWe do this using binary search.",
    mnemonics: [
      "\"Store as list\" → store[key].append((timestamp, value))",
      "\"Binary search timestamp\" → while low <= high: check mid time",
      "\"Return latest <= timestamp\" → res = value if time <= target"
    ],
    code: `from collections import defaultdict
import bisect

class TimeMap:
    def __init__(self):
        self.store = defaultdict(list)

    def set(self, key, value, timestamp):
        self.store[key].append((timestamp, value))

    def get(self, key, timestamp):
        if key not in self.store:
            return ""
        
        values = self.store[key]
        idx = bisect.bisect_right(values, (timestamp, chr(255))) - 1
        
        return values[idx][1] if idx >= 0 else ""`,
    timeComplexity: "set: O(1), get: O(log n)",
    spaceComplexity: "O(n) - to store all values"
  },
  {
    id: 7,
    title: "Median of Two Sorted Arrays",
    question: "Find the median of two sorted arrays.",
    hint: "Use binary search on the smaller array to find the correct partition point.",
    oneLiner: "Use binary search to partition both arrays such that left half ≤ right half.",
    simpleExplanation: "We cut both arrays in half in a smart way.\nWe want everything on the left half to be smaller than the right.\nWhen it's balanced, we take the middle numbers for the median.",
    mnemonics: [
      "\"Binary on smaller array\" → if len(A) > len(B): swap",
      "\"Partition and check\" → Aleft <= Bright and Bleft <= Aright",
      "\"Median calc\" → if total even: avg of max(left), min(right); else: max(left)"
    ],
    code: `def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1  # Ensure nums1 is the smaller array

    x, y = len(nums1), len(nums2)
    left, right = 0, x

    while left <= right:
        partitionX = (left + right) // 2
        partitionY = (x + y + 1) // 2 - partitionX

        maxX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
        minX = float('inf') if partitionX == x else nums1[partitionX]
        maxY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
        minY = float('inf') if partitionY == y else nums2[partitionY]

        if maxX <= minY and maxY <= minX:
            if (x + y) % 2 == 0:
                return (max(maxX, maxY) + min(minX, minY)) / 2
            else:
                return max(maxX, maxY)
        elif maxX > minY:
            right = partitionX - 1
        else:
            left = partitionX + 1`,
    timeComplexity: "O(log min(m,n)) - binary search on smaller array",
    spaceComplexity: "O(1) - constant extra space"
  }
];