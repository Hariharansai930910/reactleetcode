export const linkedListFlashcards = [
  {
    id: 1,
    title: "Reverse Linked List",
    question: "Reverse a singly linked list.",
    hint: "Use three pointers to keep track of previous, current, and next nodes.",
    oneLiner: "Iteratively reverse pointers one node at a time.",
    simpleExplanation: "We go through the list one by one.\nWe turn each pointer backward instead of forward.\nWhen we finish, the list is flipped!",
    mnemonics: [
      "\"Track previous\" → prev = None",
      "\"Flip pointer\" → curr.next = prev",
      "\"Move forward\" → prev, curr = curr, curr.next"
    ],
    code: `def reverseList(head):
    prev, curr = None, head
    
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    
    return prev`,
    timeComplexity: "O(n) - we visit each node once",
    spaceComplexity: "O(1) - we use constant extra space"
  },
  {
    id: 2,
    title: "Merge Two Sorted Lists",
    question: "Merge two sorted linked lists into one sorted list.",
    hint: "Use a dummy node to build the merged list.",
    oneLiner: "Use two pointers to weave nodes into a sorted list.",
    simpleExplanation: "We compare heads of both lists.\nWe always pick the smaller one and keep going.\nWe attach leftover nodes at the end.",
    mnemonics: [
      "\"Dummy node start\" → dummy = ListNode()",
      "\"Pick smaller\" → if l1.val < l2.val: attach l1",
      "\"Link remainder\" → tail.next = l1 or l2"
    ],
    code: `def mergeTwoLists(l1, l2):
    dummy = ListNode()
    tail = dummy
    
    while l1 and l2:
        if l1.val < l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next

    tail.next = l1 if l1 else l2
    return dummy.next`,
    timeComplexity: "O(n+m) - where n,m are lengths of input lists",
    spaceComplexity: "O(1) - we use constant extra space"
  },
  {
    id: 3,
    title: "Linked List Cycle",
    question: "Detect if a linked list has a cycle.",
    hint: "Use fast and slow pointers (Floyd's Cycle Detection).",
    oneLiner: "Use two pointers (slow and fast) to detect a loop.",
    simpleExplanation: "One pointer moves fast, the other moves slow.\nIf they ever meet, there's a loop.\nIf the fast one finishes, there's no cycle.",
    mnemonics: [
      "\"Initialize pointers\" → slow, fast = head, head",
      "\"Move fast x2\" → fast = fast.next.next",
      "\"Check meeting point\" → if slow == fast: return True"
    ],
    code: `def hasCycle(head):
    slow, fast = head, head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
            
    return False`,
    timeComplexity: "O(n) - in worst case, we visit each node once",
    spaceComplexity: "O(1) - we use constant extra space"
  },
  {
    id: 4,
    title: "Reorder List",
    question: "Reorder a linked list in-place as L0→Ln→L1→Ln-1→L2→Ln-2...",
    hint: "Find the middle, reverse the second half, and merge the two halves.",
    oneLiner: "Split the list, reverse the second half, and merge both.",
    simpleExplanation: "We find the middle of the list.\nWe reverse the second half.\nThen we zig-zag merge the two parts.",
    mnemonics: [
      "\"Find mid\" → slow = slow.next, fast = fast.next.next",
      "\"Reverse half\" → second = reverse(middle)",
      "\"Merge halves\" → while first and second: alternate attach"
    ],
    code: `def reorderList(head):
    if not head or not head.next:
        return
    
    # Find middle
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # Reverse second half
    prev, curr = None, slow.next
    slow.next = None  # Split list
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt

    # Merge two halves
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2`,
    timeComplexity: "O(n) - we visit each node a constant number of times",
    spaceComplexity: "O(1) - we use constant extra space"
  },
  {
    id: 5,
    title: "Remove Nth Node From End of List",
    question: "Remove the nth node from the end of the list.",
    hint: "Use two pointers with a gap of n nodes between them.",
    oneLiner: "Use two pointers with n distance apart.",
    simpleExplanation: "We move one pointer n steps ahead.\nThen we move both together until the fast one ends.\nThe slow one is right before the node to remove.",
    mnemonics: [
      "\"Advance fast\" → for _ in range(n): fast = fast.next",
      "\"Move both\" → while fast.next: slow = slow.next",
      "\"Remove node\" → slow.next = slow.next.next"
    ],
    code: `def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    fast, slow = dummy, dummy
    
    for _ in range(n + 1):
        fast = fast.next
    
    while fast:
        fast = fast.next
        slow = slow.next
    
    slow.next = slow.next.next
    return dummy.next`,
    timeComplexity: "O(n) - we visit each node at most once",
    spaceComplexity: "O(1) - we use constant extra space"
  },
  {
    id: 6,
    title: "Copy List with Random Pointer",
    question: "Clone a linked list with next and random pointers.",
    hint: "Create interleaved list, then fix random pointers, then separate lists.",
    oneLiner: "Interleave original and copied nodes, fix randoms, then split.",
    simpleExplanation: "We copy each node and put it right next to the original.\nThen we fix the random pointers.\nLast, we split them into two separate lists.",
    mnemonics: [
      "\"Clone nodes\" → curr.next = Node(curr.val)",
      "\"Fix random\" → curr.next.random = curr.random.next",
      "\"Separate lists\" → original.next = clone.next; clone.next = clone.next.next"
    ],
    code: `def copyRandomList(head):
    if not head:
        return None

    # Step 1: Create new nodes interleaved with the old nodes
    curr = head
    while curr:
        nxt = curr.next
        curr.next = Node(curr.val, nxt, None)
        curr = nxt

    # Step 2: Assign random pointers
    curr = head
    while curr:
        if curr.random:
            curr.next.random = curr.random.next
        curr = curr.next.next

    # Step 3: Separate the two lists
    old, new = head, head.next
    new_head = head.next
    while old:
        old.next = old.next.next if old.next else None
        new.next = new.next.next if new.next else None
        old = old.next
        new = new.next
    
    return new_head`,
    timeComplexity: "O(n) - we make three passes through the list",
    spaceComplexity: "O(1) - excluding output list"
  },
  {
    id: 7,
    title: "Add Two Numbers",
    question: "Add two numbers represented as linked lists (digits in reverse order).",
    hint: "Track carry and create new nodes as you sum digits.",
    oneLiner: "Add digits from each list node by node with carry.",
    simpleExplanation: "We add the numbers digit by digit.\nIf the sum is too big, we carry to the next one.\nWe build a new list as we go.",
    mnemonics: [
      "\"Add values + carry\" → total = l1.val + l2.val + carry",
      "\"Carry forward\" → carry = total // 10",
      "\"Create node\" → current.next = ListNode(total % 10)"
    ],
    code: `def addTwoNumbers(l1, l2):
    dummy = ListNode()
    curr, carry = dummy, 0

    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0
        carry, sum_val = divmod(val1 + val2 + carry, 10)
        
        curr.next = ListNode(sum_val)
        curr = curr.next

        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None

    return dummy.next`,
    timeComplexity: "O(max(n,m)) - where n,m are the lengths of the lists",
    spaceComplexity: "O(max(n,m)) - for the result list"
  },
  {
    id: 8,
    title: "Find The Duplicate Number",
    question: "Find the duplicate number in an array where each integer appears only once except for one.",
    hint: "Treat array values as pointers and use cycle detection.",
    oneLiner: "Use Floyd's Cycle Detection (like Linked List Cycle) on index mapping.",
    simpleExplanation: "We pretend the numbers are pointers in a list.\nWe find a cycle using slow and fast.\nThen we find where the cycle begins — that's the duplicate.",
    mnemonics: [
      "\"Find meeting\" → slow = nums[slow]; fast = nums[nums[fast]]",
      "\"Find entrance\" → slow = 0; move both till they meet",
      "\"Return dup\" → return slow"
    ],
    code: `def findDuplicate(nums):
    slow, fast = nums[0], nums[0]
    
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break

    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]

    return slow`,
    timeComplexity: "O(n) - we visit each number at most twice",
    spaceComplexity: "O(1) - we use constant extra space"
  },
  {
    id: 9,
    title: "LRU Cache",
    question: "Design a Least Recently Used (LRU) cache with O(1) get and put operations.",
    hint: "Use a hash map and doubly linked list together.",
    oneLiner: "Use a hash map + doubly linked list to track usage order and values.",
    simpleExplanation: "We keep a list of recently used items.\nWhen something is used, we move it to the front.\nIf the cache is full, we remove the oldest from the back.",
    mnemonics: [
      "\"Get/move to front\" → move_to_front(node)",
      "\"Insert new\" → add node to head",
      "\"Evict old\" → remove tail node if over capacity"
    ],
    code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key):
        if key in self.cache:
            self.cache.move_to_end(key)
            return self.cache[key]
        return -1

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`,
    timeComplexity: "O(1) - for both get and put operations",
    spaceComplexity: "O(capacity) - for the cache"
  },
  {
    id: 10,
    title: "Merge K Sorted Lists",
    question: "Merge k sorted linked lists into one sorted list.",
    hint: "Use a min heap to efficiently find the smallest node each time.",
    oneLiner: "Use a min-heap to always pick the smallest node among lists.",
    simpleExplanation: "We look at the first node from each list.\nWe always pick the smallest and move forward in that list.\nWe keep building a new sorted list.",
    mnemonics: [
      "\"Push all heads\" → heapq.heappush(heap, (node.val, i, node))",
      "\"Pop smallest\" → val, i, node = heapq.heappop(heap)",
      "\"Advance list\" → heapq.heappush(heap, (node.next.val, i, node.next))"
    ],
    code: `from heapq import heappush, heappop

def mergeKLists(lists):
    heap = []
    dummy = ListNode()
    curr = dummy

    for i, lst in enumerate(lists):
        if lst:
            heappush(heap, (lst.val, i, lst))
    
    while heap:
        val, i, node = heappop(heap)
        curr.next = node
        curr = node
        if node.next:
            heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next`,
    timeComplexity: "O(n log k) - where n is total nodes and k is number of lists",
    spaceComplexity: "O(k) - for the heap"
  },
  {
    id: 11,
    title: "Reverse Nodes in K-Group",
    question: "Reverse the nodes of the list k at a time and return the modified list.",
    hint: "Count k nodes, reverse them, and connect to next group.",
    oneLiner: "Group nodes in k, reverse in-place, and connect recursively or iteratively.",
    simpleExplanation: "We take chunks of k nodes.\nWe flip the order of each group.\nWe connect the reversed parts back together.",
    mnemonics: [
      "\"Count nodes\" → for _ in range(k): if not curr: return head",
      "\"Reverse k\" → reverse segment between head and k-th",
      "\"Link next group\" → head.next = recurse/iterate with next group"
    ],
    code: `def reverseKGroup(head, k):
    def get_kth(curr, k):
        while curr and k > 0:
            curr = curr.next
            k -= 1
        return curr

    dummy = ListNode(0)
    dummy.next = head
    group_prev = dummy

    while True:
        kth = get_kth(group_prev, k)
        if not kth:
            break
        group_next = kth.next

        # Reverse group
        prev, curr = group_next, group_prev.next
        while curr != group_next:
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp

        temp = group_prev.next
        group_prev.next = kth
        group_prev = temp

    return dummy.next`,
    timeComplexity: "O(n) - each node is reversed at most once",
    spaceComplexity: "O(1) - we use constant extra space"
  }
];
