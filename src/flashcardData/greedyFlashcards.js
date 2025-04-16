export const greedyFlashcards = [
  {
    id: 1,
    title: "Maximum Subarray",
    question: "Find the contiguous subarray within a one-dimensional array of numbers that has the largest sum.",
    hint: "Use Kadane's algorithm to keep track of the best subarray ending at each position.",
    oneLiner: "Use Kadane's algorithm to track the best subarray sum ending at each index.",
    simpleExplanation: "Add each number to your score.\nIf it hurts more than helps, start fresh.\nKeep the highest score!",
    mnemonics: [
      "\"Choose max path\" → current_sum = max(num, current_sum + num)",
      "\"Track highest\" → max_sum = max(max_sum, current_sum)",
      "\"Start small\" → current_sum = max_sum = nums[0]"
    ],
    code: `def maxSubArray(nums):
    current_sum = max_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum`,
    timeComplexity: "O(n) - one pass through the array",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 2,
    title: "Jump Game",
    question: "Given an array where each element represents your maximum jump length, determine if you can reach the last index.",
    hint: "Track the furthest index you can reach as you iterate through the array.",
    oneLiner: "Track the furthest index reachable at every step.",
    simpleExplanation: "Jump from stone to stone.\nIf you can't reach one, stop.\nGo as far as you can!",
    mnemonics: [
      "\"Too far to jump?\" → if i > max_reach: return False",
      "\"Keep extending\" → max_reach = max(max_reach, i + num)",
      "\"Goal achieved\" → return True"
    ],
    code: `def canJump(nums):
    max_reach = 0
    for i, num in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + num)
        if max_reach >= len(nums) - 1:
            return True
    return True`,
    timeComplexity: "O(n) - one pass through the array",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 3,
    title: "Jump Game II",
    question: "Find the minimum number of jumps to reach the last index.",
    hint: "Track the current range and update it when you've explored all current possibilities.",
    oneLiner: "Count jumps when current range ends and extend to farthest.",
    simpleExplanation: "Each jump gets you closer to the goal.\nWait till you run out of steps.\nThen take the next big jump!",
    mnemonics: [
      "\"Track farthest\" → farthest = max(farthest, i + nums[i])",
      "\"Jump when needed\" → if i == current_end: jumps += 1; current_end = farthest",
      "\"Stop at end\" → for i in range(len(nums) - 1):"
    ],
    code: `def jump(nums):
    jumps = current_end = farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == current_end:
            jumps += 1
            current_end = farthest
    return jumps`,
    timeComplexity: "O(n) - one pass through the array",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 4,
    title: "Gas Station",
    question: "Find a starting gas station index to complete a circular route if possible.",
    hint: "If total gas >= total cost, there must be a solution. Track the current tank to find it.",
    oneLiner: "Track total gas vs cost and reset start when running dry.",
    simpleExplanation: "Drive your toy car around the track.\nIf you run out, try the next start.\nIf there's more gas than cost, you'll make it!",
    mnemonics: [
      "\"Reset on empty\" → if current_tank < 0: start_index = i + 1; current_tank = 0",
      "\"Check total\" → return start_index if total_tank >= 0 else -1",
      "\"Add net gain\" → total_tank += gas[i] - cost[i]"
    ],
    code: `def canCompleteCircuit(gas, cost):
    total_tank = current_tank = start_index = 0
    for i in range(len(gas)):
        total_tank += gas[i] - cost[i]
        current_tank += gas[i] - cost[i]
        if current_tank < 0:
            start_index = i + 1
            current_tank = 0
    return start_index if total_tank >= 0 else -1`,
    timeComplexity: "O(n) - one pass through the arrays",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 5,
    title: "Hand of Straights",
    question: "Determine if a hand of cards can be rearranged into groups of consecutive cards.",
    hint: "Sort the cards and greedily form groups starting with the smallest available card.",
    oneLiner: "Use a min-heap to form straight hands from smallest cards.",
    simpleExplanation: "Group cards into stairs like 3-4-5.\nStart with the smallest step.\nIf a step is missing, the group falls!",
    mnemonics: [
      "\"Build stair group\" → for i in range(first, first + groupSize):",
      "\"Check step\" → if count[i] == 0: return False",
      "\"Pop if done\" → if count[i] == 0 and i == min_heap[0]: heapq.heappop(min_heap)"
    ],
    code: `from collections import Counter
import heapq

def isNStraightHand(hand, groupSize):
    if len(hand) % groupSize != 0:
        return False

    count = Counter(hand)
    min_heap = list(count.keys())
    heapq.heapify(min_heap)

    while min_heap:
        first = min_heap[0]
        for i in range(first, first + groupSize):
            if count[i] == 0:
                return False
            count[i] -= 1
            if count[i] == 0:
                if i != min_heap[0]:
                    return False
                heapq.heappop(min_heap)
    return True`,
    timeComplexity: "O(n log n) - sorting and heap operations",
    spaceComplexity: "O(n) - for the counter and heap"
  },
  {
    id: 6,
    title: "Merge Triplets to Form Target Triplet",
    question: "Determine if it's possible to merge triplets to form a target triplet.",
    hint: "Only consider triplets where each element is less than or equal to the target.",
    oneLiner: "Pick only triplets ≤ target and track matched positions.",
    simpleExplanation: "Each robot part must be same or smaller.\nFind triplets that match one or more parts.\nCollect all 3 to build your robot!",
    mnemonics: [
      "\"Filter valid\" → if all(triplet[i] <= target[i] for i in range(3)):",
      "\"Track matches\" → if triplet[i] == target[i]: good.add(i)",
      "\"Need all parts\" → return len(good) == 3"
    ],
    code: `def mergeTriplets(triplets, target):
    good = set()
    for triplet in triplets:
        if all(triplet[i] <= target[i] for i in range(3)):
            for i in range(3):
                if triplet[i] == target[i]:
                    good.add(i)
    return len(good) == 3`,
    timeComplexity: "O(n) - one pass through the triplets",
    spaceComplexity: "O(1) - constant extra space"
  },
  {
    id: 7,
    title: "Partition Labels",
    question: "Partition a string into as many parts as possible so that each letter appears in at most one part.",
    hint: "Track the last occurrence of each character and use that to determine partition points.",
    oneLiner: "Use each character's last occurrence to determine cut points.",
    simpleExplanation: "You want to cut paper without repeating letters.\nWait until the last of all letters in the part.\nThen make a cut!",
    mnemonics: [
      "\"Last seen\" → last = {c: i for i, c in enumerate(S)}",
      "\"Cut when done\" → if i == j: result.append(i - anchor + 1); anchor = i + 1",
      "\"Extend end\" → j = max(j, last[c])"
    ],
    code: `def partitionLabels(S):
    last = {c: i for i, c in enumerate(S)}
    j = anchor = 0
    result = []
    for i, c in enumerate(S):
        j = max(j, last[c])
        if i == j:
            result.append(i - anchor + 1)
            anchor = i + 1
    return result`,
    timeComplexity: "O(n) - two passes through the string",
    spaceComplexity: "O(1) - constant extra space (at most 26 letters)"
  },
  {
    id: 8,
    title: "Valid Parenthesis String",
    question: "Determine if a string with '(', ')', and '*' characters can form valid parentheses.",
    hint: "Track the possible range of open parentheses using two variables.",
    oneLiner: "Track a possible open-parentheses range with '*' as wildcard.",
    simpleExplanation: "You're stacking cups.\n'*' can be a cup or nothing.\nJust don't let the stack fall!",
    mnemonics: [
      "\"Range tracking\" → low -= 1; high += 1 (for *)",
      "\"Clamp to zero\" → if low < 0: low = 0",
      "\"Early exit\" → if high < 0: return False"
    ],
    code: `def checkValidString(s: str) -> bool:
    low = high = 0  # Range of possible open parentheses count

    for char in s:
        if char == '(':
            low += 1
            high += 1
        elif char == ')':
            low -= 1
            high -= 1
        else:  # char == '*'
            low -= 1   # treat '*' as ')'
            high += 1  # treat '*' as '('

        # Clamp low to 0 since we can't have negative open brackets
        if high < 0:
            return False
        if low < 0:
            low = 0

    return low == 0`,
    timeComplexity: "O(n) - one pass through the string",
    spaceComplexity: "O(1) - constant extra space"
  }
];