export const heapPriorityQueueFlashcards = [
  {
    id: 1,
    title: "Kth Largest Element in a Stream",
    question: "Design a class to find the kth largest element in a stream of numbers.",
    hint: "Maintain a min-heap of size k to efficiently track the kth largest element.",
    oneLiner: "Maintain a min-heap of size `k` to track the Kth largest element.",
    simpleExplanation: "We keep the biggest `k` numbers in a bucket.\nWe throw out the smallest one if we get too many.\nThe Kth largest is always the smallest in our bucket.",
    mnemonics: [
      "\"Push to heap\" → heapq.heappush(self.heap, val)",
      "\"Pop if oversized\" → if len(self.heap) > k: heapq.heappop(self.heap)",
      "\"Return Kth\" → return self.heap[0]"
    ],
    code: `import heapq

class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.min_heap = nums
        heapq.heapify(self.min_heap)
        while len(self.min_heap) > k:
            heapq.heappop(self.min_heap)

    def add(self, val):
        heapq.heappush(self.min_heap, val)
        if len(self.min_heap) > self.k:
            heapq.heappop(self.min_heap)
        return self.min_heap[0]`,
    timeComplexity: "init: O(n log k), add: O(log k)",
    spaceComplexity: "O(k) - to store the heap of size k"
  },
  {
    id: 2,
    title: "Last Stone Weight",
    question: "Smash stones together and return the final weight of the last stone (if any).",
    hint: "Use a max-heap (simulated with a min-heap using negative values) to efficiently get the largest stones.",
    oneLiner: "Use a max-heap (invert numbers) to always smash the heaviest stones.",
    simpleExplanation: "We take the two heaviest stones.\nIf they're different, we smash and put the leftover back.\nWe keep doing that until one or zero stones are left.",
    mnemonics: [
      "\"Max heap\" → heap = [-x for x in stones]",
      "\"Pop two largest\" → a = -heapq.heappop(heap), b = -heapq.heappop(heap)",
      "\"Push back if diff\" → if a != b: heapq.heappush(heap, -(a - b))"
    ],
    code: `import heapq

def lastStoneWeight(stones):
    stones = [-s for s in stones]
    heapq.heapify(stones)
    while len(stones) > 1:
        first = -heapq.heappop(stones)
        second = -heapq.heappop(stones)
        if first != second:
            heapq.heappush(stones, -(first - second))
    return -stones[0] if stones else 0`,
    timeComplexity: "O(n log n) - heap operations for each stone",
    spaceComplexity: "O(n) - for the heap"
  },
  {
    id: 3,
    title: "K Closest Points to Origin",
    question: "Find the k closest points to the origin (0, 0) from a list of points.",
    hint: "Use a heap to keep track of the k closest points based on their distance from the origin.",
    oneLiner: "Use a max-heap of size `k` with negative distances.",
    simpleExplanation: "We find how far each point is from the center.\nWe keep only the closest `k` ones.\nAt the end, we give back those points.",
    mnemonics: [
      "\"Calculate dist\" → dist = x*x + y*y",
      "\"Max heap trick\" → heapq.heappush(heap, (-dist, (x, y)))",
      "\"Pop if > k\" → if len(heap) > k: heapq.heappop(heap)"
    ],
    code: `import heapq

def kClosest(points, k):
    heap = []
    for (x, y) in points:
        dist = -(x**2 + y**2)
        if len(heap) < k:
            heapq.heappush(heap, (dist, x, y))
        else:
            heapq.heappushpop(heap, (dist, x, y))
    return [(x, y) for (dist, x, y) in heap]`,
    timeComplexity: "O(n log k) - heap operations for each point",
    spaceComplexity: "O(k) - for the heap"
  },
  {
    id: 4,
    title: "Kth Largest Element in an Array",
    question: "Find the kth largest element in an unsorted array.",
    hint: "Use a min-heap of size k to track the k largest elements.",
    oneLiner: "Use a min-heap of size `k` to track top elements.",
    simpleExplanation: "We look through all the numbers.\nWe keep a bucket with the largest `k` ones.\nThe smallest in that bucket is the answer.",
    mnemonics: [
      "\"Push to heap\" → heapq.heappush(heap, num)",
      "\"Trim to k size\" → if len(heap) > k: heapq.heappop(heap)",
      "\"Return top\" → return heap[0]"
    ],
    code: `import heapq

def findKthLargest(nums, k):
    return heapq.nlargest(k, nums)[-1]

# Alternative implementation:
def findKthLargest_alt(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
    timeComplexity: "O(n log k) - heap operations for each element",
    spaceComplexity: "O(k) - for the heap"
  },
  {
    id: 5,
    title: "Task Scheduler",
    question: "Find the minimum time needed to execute all tasks with cooldown constraints.",
    hint: "Greedily schedule the most frequent tasks first to minimize idle time.",
    oneLiner: "Use a greedy strategy with a max-heap and cooldown logic.",
    simpleExplanation: "We want to do tasks without repeating too soon.\nWe do the most frequent task first.\nIf we wait, we fill gaps with idle time.",
    mnemonics: [
      "\"Count tasks\" → freq = Counter(tasks)",
      "\"Max heap\" → heap = [-cnt for cnt in freq.values()]",
      "\"Cooldown cycle\" → for i in range(n + 1): fill tasks or idle"
    ],
    code: `from collections import Counter
import heapq

def leastInterval(tasks, n):
    task_counts = Counter(tasks)
    max_heap = [-cnt for cnt in task_counts.values()]
    heapq.heapify(max_heap)
    time = 0
    while max_heap:
        temp = []
        for _ in range(n + 1):
            if max_heap:
                temp.append(heapq.heappop(max_heap))
        for item in temp:
            if item + 1 < 0:
                heapq.heappush(max_heap, item + 1)
        time += n + 1 if max_heap else len(temp)
    return time`,
    timeComplexity: "O(n) - processing each task once",
    spaceComplexity: "O(1) - at most 26 task types (letters)"
  },
  {
    id: 6,
    title: "Design Twitter",
    question: "Design a simplified version of Twitter with posting, following, and news feed functionality.",
    hint: "Use heaps to efficiently merge and retrieve the most recent tweets from followed users.",
    oneLiner: "Use a heap to get the 10 most recent tweets across users.",
    simpleExplanation: "Each user has their own tweet list.\nWe mix them and keep only the latest 10.\nWe also track who follows whom.",
    mnemonics: [
      "\"Tweet store\" → self.tweets = {user: []}",
      "\"Heap feed\" → heapq.heappush(heap, (-time, tweet))",
      "\"Follows set\" → self.followees[user].add(followee)"
    ],
    code: `import heapq
from collections import defaultdict, deque

class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = defaultdict(deque)
        self.followees = defaultdict(set)

    def postTweet(self, userId, tweetId):
        self.tweets[userId].appendleft((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId):
        heap = []
        self.followees[userId].add(userId)
        for followee in self.followees[userId]:
            for tweet in self.tweets[followee]:
                heapq.heappush(heap, tweet)
                if len(heap) > 10:
                    heapq.heappop(heap)
        result = []
        while heap:
            result.append(heapq.heappop(heap)[1])
        return result[::-1]

    def follow(self, followerId, followeeId):
        self.followees[followerId].add(followeeId)

    def unfollow(self, followerId, followeeId):
        self.followees[followerId].discard(followeeId)`,
    timeComplexity: "postTweet: O(1), getNewsFeed: O(F + T log T)",
    spaceComplexity: "O(U + T) - users and tweets"
  },
  {
    id: 7,
    title: "Find Median from Data Stream",
    question: "Design a data structure that supports adding integers and finding the median.",
    hint: "Use two heaps to track the lower and upper halves of the data stream.",
    oneLiner: "Use two heaps (max-heap + min-heap) to balance lower and upper halves.",
    simpleExplanation: "We keep small numbers on one side, big ones on the other.\nThe middle is easy to find when both sides are balanced.\nWe add numbers and move between sides as needed.",
    mnemonics: [
      "\"Two heaps\" → small = MaxHeap, large = MinHeap",
      "\"Balance heaps\" → if len(small) > len(large): move one over",
      "\"Get median\" → return (top of small + top of large) / 2"
    ],
    code: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max heap (inverted min heap)
        self.large = []  # Min heap

    def addNum(self, num):
        heapq.heappush(self.small, -num)
        if (self.small and self.large and
                (-self.small[0] > self.large[0])):
            heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.small) > len(self.large) + 1:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2`,
    timeComplexity: "addNum: O(log n), findMedian: O(1)",
    spaceComplexity: "O(n) - to store all elements"
  }
];