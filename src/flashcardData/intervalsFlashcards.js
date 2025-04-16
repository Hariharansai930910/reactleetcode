export const intervalsFlashcards = [
  {
    id: 1,
    title: "Insert Interval",
    question: "Given a set of non-overlapping intervals, insert a new interval into the set, merging if necessary.",
    hint: "Think about handling intervals before, during, and after the overlap separately.",
    oneLiner: "Scan and merge intervals while inserting the new one in the correct place.",
    simpleExplanation: "Check which intervals come before the new one.\nThen merge the ones that overlap with it.\nAfter that, just add what's left!",
    mnemonics: [
      "\"Add before\" → while i < n and intervals[i][1] < newInterval[0]: result.append(intervals[i])",
      "\"Merge overlap\" → newInterval[0] = min(newInterval[0], intervals[i][0])",
      "\"Add remaining\" → while i < n: result.append(intervals[i])"
    ],
    code: `def insert(intervals, newInterval):
    result = []
    i = 0
    n = len(intervals)

    # Add all intervals ending before newInterval starts
    while i < n and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1

    # Merge overlapping intervals
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    result.append(newInterval)

    # Add remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1

    return result`,
    timeComplexity: "O(n) - we process each interval once",
    spaceComplexity: "O(n) - for the result list"
  },
  {
    id: 2,
    title: "Merge Intervals",
    question: "Given a collection of intervals, merge all overlapping intervals.",
    hint: "Sort intervals by start time to make overlaps contiguous.",
    oneLiner: "Sort intervals and merge overlapping ones into bigger blocks.",
    simpleExplanation: "Sort your blocks by when they start.\nIf two blocks touch or overlap, combine them.\nKeep adding non-overlapping ones!",
    mnemonics: [
      "\"Sort by start\" → intervals.sort(key=lambda x: x[0])",
      "\"Merge check\" → if current[0] <= prev[1]: prev[1] = max(prev[1], current[1])",
      "\"New block\" → else: merged.append(current)"
    ],
    code: `def merge(intervals):
    if not intervals:
        return []

    # Sort intervals based on the start time
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        prev = merged[-1]
        if current[0] <= prev[1]:  # Overlapping intervals
            prev[1] = max(prev[1], current[1])
        else:
            merged.append(current)

    return merged`,
    timeComplexity: "O(n log n) - dominated by the sorting step",
    spaceComplexity: "O(n) - for the merged list"
  },
  {
    id: 3,
    title: "Non-Overlapping Intervals",
    question: "Find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    hint: "Sort by end time and greedily select non-overlapping intervals.",
    oneLiner: "Sort by end time and greedily keep non-overlapping intervals.",
    simpleExplanation: "Pick intervals that end the earliest.\nIf they don't bump into the next one, keep them.\nSubtract the number you kept from total.",
    mnemonics: [
      "\"Sort by end\" → intervals.sort(key=lambda x: x[1])",
      "\"Skip overlap\" → if intervals[i][0] >= end:",
      "\"Remove extras\" → return len(intervals) - count"
    ],
    code: `def eraseOverlapIntervals(intervals):
    if not intervals:
        return 0

    # Sort intervals based on the end time
    intervals.sort(key=lambda x: x[1])
    end = intervals[0][1]
    count = 1

    for i in range(1, len(intervals)):
        if intervals[i][0] >= end:
            count += 1
            end = intervals[i][1]

    return len(intervals) - count`,
    timeComplexity: "O(n log n) - dominated by the sorting step",
    spaceComplexity: "O(1) - using constant extra space"
  },
  {
    id: 4,
    title: "Meeting Rooms",
    question: "Given an array of meeting time intervals, determine if a person could attend all meetings.",
    hint: "Check if any meetings overlap after sorting.",
    oneLiner: "Sort intervals and check for any overlaps between meetings.",
    simpleExplanation: "Line up all your meetings by start time.\nIf one starts before the last one ended, you can't go!\nNo overlaps? You're good to attend all.",
    mnemonics: [
      "\"Sort by start\" → intervals.sort(key=lambda x: x[0])",
      "\"Overlap check\" → if intervals[i][0] < intervals[i - 1][1]: return False",
      "\"All good\" → return True"
    ],
    code: `def canAttendMeetings(intervals):
    # Sort intervals based on the start time
    intervals.sort(key=lambda x: x[0])

    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    return True`,
    timeComplexity: "O(n log n) - dominated by the sorting step",
    spaceComplexity: "O(1) - using constant extra space"
  },
  {
    id: 5,
    title: "Meeting Rooms II",
    question: "Find the minimum number of conference rooms required for a set of meeting intervals.",
    hint: "Use a min heap to track when rooms become available.",
    oneLiner: "Use a min-heap to track meeting end times and allocate rooms.",
    simpleExplanation: "Use rooms when meetings overlap.\nFree rooms that end before the next starts.\nCount how many rooms you needed.",
    mnemonics: [
      "\"Sort by start\" → intervals.sort(key=lambda x: x[0])",
      "\"Reuse room\" → if min_heap and min_heap[0] <= interval[0]: heapq.heappop(min_heap)",
      "\"Add end time\" → heapq.heappush(min_heap, interval[1])"
    ],
    code: `import heapq

def minMeetingRooms(intervals):
    if not intervals:
        return 0

    # Sort intervals based on the start time
    intervals.sort(key=lambda x: x[0])
    min_heap = []

    for interval in intervals:
        if min_heap and min_heap[0] <= interval[0]:
            heapq.heappop(min_heap)
        heapq.heappush(min_heap, interval[1])

    return len(min_heap)`,
    timeComplexity: "O(n log n) - dominated by sorting and heap operations",
    spaceComplexity: "O(n) - for the heap in worst case"
  },
  {
    id: 6,
    title: "Minimum Interval to Include Each Query",
    question: "Find the size of the smallest interval that includes each query point.",
    hint: "Process queries in ascending order and use a min heap to track valid intervals.",
    oneLiner: "Use a heap to track valid intervals for each sorted query.",
    simpleExplanation: "Sort your intervals and questions.\nFor each question, keep the smallest interval that fits.\nIf none fit, say \"no size!\"",
    mnemonics: [
      "\"Sort by start/query\" → intervals.sort(), queries_sorted = sorted(enumerate(queries), key=lambda x: x[1])",
      "\"Push valid\" → heapq.heappush(min_heap, (end - start + 1, end))",
      "\"Pop expired\" → while min_heap and min_heap[0][1] < query: heapq.heappop(min_heap)"
    ],
    code: `import heapq

def minInterval(intervals, queries):
    intervals.sort(key=lambda x: x[0])
    queries_sorted = sorted(enumerate(queries), key=lambda x: x[1])
    result = [-1] * len(queries)
    min_heap = []
    i = 0

    for index, query in queries_sorted:
        while i < len(intervals) and intervals[i][0] <= query:
            start, end = intervals[i]
            heapq.heappush(min_heap, (end - start + 1, end))
            i += 1

        while min_heap and min_heap[0][1] < query:
            heapq.heappop(min_heap)

        if min_heap:
            result[index] = min_heap[0][0]

    return result`,
    timeComplexity: "O((n + q) log n) - where n is intervals and q is queries",
    spaceComplexity: "O(n) - for the heap in worst case"
  }
];