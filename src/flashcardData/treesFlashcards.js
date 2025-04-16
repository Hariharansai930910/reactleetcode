// src/flashcardData/treesFlashcards.js

export const treesFlashcards = [
  {
    id: 1,
    title: "Invert Binary Tree",
    question: "Invert a binary tree (swap all left and right children at every node).",
    hint: "Apply the inversion recursively at each node.",
    oneLiner: "Swap left and right at every node recursively.",
    simpleExplanation: "Flip every branch left-to-right.\nDo the same for children too.\nKeep flipping till the bottom!",
    mnemonics: [
      "\"Flip subtrees\" → root.left, root.right = invertTree(root.right), invertTree(root.left)",
      "\"Base case\" → if not root: return None",
      "\"Return flipped root\" → return root"
    ],
    code: `def invertTree(self, root):
    if not root:
        return None
    root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
    return root`,
    timeComplexity: "O(N) - we visit each node once",
    spaceComplexity: "O(H) - recursion stack, where H is the height (worst case O(N))"
  },
  {
    id: 2,
    title: "Maximum Depth of Binary Tree",
    question: "Find the maximum depth (number of nodes along the longest path from root to leaf).",
    hint: "Use recursion to find the depth of both subtrees.",
    oneLiner: "Recursively get max depth from left and right, add one.",
    simpleExplanation: "Go down both left and right.\nFind the deeper one.\nAdd yourself to the count!",
    mnemonics: [
      "\"Check both sides\" → maxDepth(root.left), maxDepth(root.right)",
      "\"Add 1 for current\" → 1 + max(...)",
      "\"Stop at null\" → if not root: return 0"
    ],
    code: `def maxDepth(self, root):
    if not root:
        return 0
    return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
    timeComplexity: "O(N) - we visit each node once",
    spaceComplexity: "O(H) - recursion stack, where H is the height"
  },
  {
    id: 3,
    title: "Diameter of Binary Tree",
    question: "Find the length of the longest path between any two nodes in a binary tree.",
    hint: "Use depth-first search while tracking the longest path through each node.",
    oneLiner: "Track the longest path across any node via DFS.",
    simpleExplanation: "Find longest path between any two nodes.\nAt every node, try left + right path.\nUpdate the best as you go.",
    mnemonics: [
      "\"DFS returns depth\" → return 1 + max(left, right)",
      "\"Update diameter\" → diameter = max(diameter, left + right)",
      "\"Use nonlocal\" → nonlocal diameter"
    ],
    code: `def diameterOfBinaryTree(self, root):
    diameter = 0

    def depth(node):
        nonlocal diameter
        if not node:
            return 0
        left = depth(node.left)
        right = depth(node.right)
        diameter = max(diameter, left + right)
        return 1 + max(left, right)

    depth(root)
    return diameter`,
    timeComplexity: "O(N) - we visit each node once",
    spaceComplexity: "O(H) - recursion stack, where H is the height"
  },
  {
    id: 4,
    title: "Balanced Binary Tree",
    question: "Determine if a binary tree is height-balanced (depth of subtrees differs by at most 1).",
    hint: "Check balance while computing height to avoid redundant traversals.",
    oneLiner: "Use post-order DFS and return -1 if imbalance is detected.",
    simpleExplanation: "Check if both sides are even.\nIf one side too tall, mark broken.\nKeep bubbling -1 up the tree!",
    mnemonics: [
      "\"Check balance\" → if abs(left - right) > 1: return -1",
      "\"Bubble imbalance\" → if left == -1 or right == -1: return -1",
      "\"DFS returns height\" → return 1 + max(left, right)"
    ],
    code: `def isBalanced(self, root):
    def dfs(node):
        if not node:
            return 0
        left = dfs(node.left)
        right = dfs(node.right)
        if left == -1 or right == -1 or abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    
    return dfs(root) != -1`,
    timeComplexity: "O(N) - we visit each node once",
    spaceComplexity: "O(H) - recursion stack, where H is the height"
  },
  {
    id: 5,
    title: "Same Tree",
    question: "Check if two binary trees are the same (have the same structure and values).",
    hint: "Compare the nodes recursively from the root down.",
    oneLiner: "DFS both trees and match all nodes and values.",
    simpleExplanation: "Walk both trees together.\nAt every node, check values.\nIf anything differs, stop!",
    mnemonics: [
      "\"Match value\" → p.val == q.val",
      "\"Match left/right\" → return isSameTree(p.left, q.left) and ...",
      "\"Null base case\" → if not p and not q: return True"
    ],
    code: `def isSameTree(self, p, q):
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)`,
    timeComplexity: "O(N) - we visit each node once",
    spaceComplexity: "O(H) - recursion stack, where H is the height"
  },
  {
    id: 6,
    title: "Subtree of Another Tree",
    question: "Check if a tree is a subtree of another tree.",
    hint: "Check if current roots match, or if the subtree matches anywhere deeper.",
    oneLiner: "Check current node or its children for subtree match.",
    simpleExplanation: "Is it the same tree right now?\nIf not, check left and right.\nOne match is all you need!",
    mnemonics: [
      "\"Check match\" → isSameTree(root, subRoot)",
      "\"Recurse left/right\" → isSubtree(root.left, ...) or ...",
      "\"Reuse sameTree logic\" → def isSameTree(...)"
    ],
    code: `def isSubtree(self, root, subRoot):
    def isSameTree(p, q):
        if not p and not q:
            return True
        if not p or not q or p.val != q.val:
            return False
        return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)

    if not root:
        return False
    return isSameTree(root, subRoot) or self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)`,
    timeComplexity: "O(M*N) - where M,N are the sizes of the trees",
    spaceComplexity: "O(H) - recursion stack, where H is the height"
  },
  {
    id: 7,
    title: "Lowest Common Ancestor of a Binary Search Tree",
    question: "Find the lowest common ancestor of two nodes in a binary search tree.",
    hint: "Use BST properties to navigate efficiently (values less than root go left, greater go right).",
    oneLiner: "Walk down and stop where values split.",
    simpleExplanation: "Look left if both are smaller.\nGo right if both are bigger.\nElse, you found the split!",
    mnemonics: [
      "\"Both left?\" → if p.val < root.val and q.val < root.val:",
      "\"Both right?\" → elif p.val > root.val and q.val > root.val:",
      "\"Split found\" → return root"
    ],
    code: `def lowestCommonAncestor(self, root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root`,
    timeComplexity: "O(H) - where H is the height of the tree",
    spaceComplexity: "O(1) - iterative approach uses constant space"
  },
  {
    id: 8,
    title: "Binary Tree Level Order Traversal",
    question: "Return the level order traversal of a binary tree (values grouped by levels).",
    hint: "Use breadth-first search with a queue to process nodes level by level.",
    oneLiner: "Use a queue to collect node values level by level.",
    simpleExplanation: "Start at the root.\nVisit every level, left to right.\nAdd children to the queue!",
    mnemonics: [
      "\"Loop level size\" → for _ in range(len(queue)):",
      "\"Push children\" → if node.left: queue.append(...)",
      "\"Save level\" → result.append(level)"
    ],
    code: `from collections import deque

def levelOrder(self, root):
    if not root:
        return []
    queue, result = deque([root]), []
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result`,
    timeComplexity: "O(N) - we visit each node once",
    spaceComplexity: "O(N) - in worst case, the queue stores all nodes at the deepest level"
  },
  {
    id: 9,
    title: "Binary Tree Right Side View",
    question: "Return the values visible from the right side of a binary tree (rightmost node at each level).",
    hint: "Use level order traversal and keep the rightmost node at each level.",
    oneLiner: "Save the last node of each level from left-to-right scan.",
    simpleExplanation: "You stand on the right side.\nSee the last node of each row.\nOnly those are visible!",
    mnemonics: [
      "\"Peek last\" → result.append(queue[-1].val)",
      "\"BFS as usual\" → for _ in range(len(queue)):",
      "\"Push children\" → queue.append(node.left/right)"
    ],
    code: `from collections import deque

def rightSideView(self, root):
    if not root:
        return []
    queue, result = deque([root]), []
    while queue:
        result.append(queue[-1].val)
        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return result`,
    timeComplexity: "O(N) - we visit each node once",
    spaceComplexity: "O(D) - where D is the tree's max width"
  },
  {
    id: 10,
    title: "Count Good Nodes in Binary Tree",
    question: "Count nodes where all ancestors have values <= the node's value.",
    hint: "Track the maximum value seen on the path from root to current node.",
    oneLiner: "DFS down the tree and count nodes >= max seen so far.",
    simpleExplanation: "Start from root.\nIf you're bigger than all parents, count yourself.\nPass the max as you go down.",
    mnemonics: [
      "\"Compare with max\" → count = 1 if node.val >= maxVal else 0",
      "\"Pass down max\" → maxVal = max(maxVal, node.val)",
      "\"Sum results\" → return count + dfs(left) + dfs(right)"
    ],
    code: `def goodNodes(self, root):
    def dfs(node, maxVal):
        if not node:
            return 0
        count = 1 if node.val >= maxVal else 0
        maxVal = max(maxVal, node.val)
        return count + dfs(node.left, maxVal) + dfs(node.right, maxVal)

    return dfs(root, root.val)`,
    timeComplexity: "O(N) - we visit each node once",
    spaceComplexity: "O(H) - recursion stack, where H is the height"
  },
  {
    id: 11,
    title: "Validate Binary Search Tree",
    question: "Determine if a binary tree is a valid binary search tree (BST).",
    hint: "Track the valid range of values for each subtree.",
    oneLiner: "Use bounds to check if every node is within (min, max).",
    simpleExplanation: "Every left should be smaller.\nEvery right should be bigger.\nUse ranges to check!",
    mnemonics: [
      "\"Check value\" → if not (low < node.val < high): return False",
      "\"Update bounds\" → dfs(node.left, low, node.val)",
      "\"Return True for leaf\" → if not node: return True"
    ],
    code: `def isValidBST(self, root):
    def dfs(node, low, high):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return dfs(node.left, low, node.val) and dfs(node.right, node.val, high)

    return dfs(root, float('-inf'), float('inf'))`,
    timeComplexity: "O(N) - we visit each node once",
    spaceComplexity: "O(H) - recursion stack, where H is the height"
  },
  {
    id: 12,
    title: "Kth Smallest Element in a BST",
    question: "Find the kth smallest element in a binary search tree.",
    hint: "Use in-order traversal to visit nodes in ascending order.",
    oneLiner: "Inorder traversal gives sorted values—return kth.",
    simpleExplanation: "Left → Root → Right gives sorted list.\nStop when you hit the kth value.\nUse a stack to go deep.",
    mnemonics: [
      "\"Go left\" → while root: stack.append(root)",
      "\"Pop & count\" → root = stack.pop(); k -= 1",
      "\"Found kth\" → if k == 0: return root.val"
    ],
    code: `def kthSmallest(self, root, k):
    stack = []
    while root or stack:
        while root:
            stack.append(root)
            root = root.left
        root = stack.pop()
        k -= 1
        if k == 0:
            return root.val
        root = root.right`,
    timeComplexity: "O(H + k) - where H is the height of the tree",
    spaceComplexity: "O(H) - for the stack"
  },
  {
    id: 13,
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    question: "Build a binary tree from its preorder and inorder traversal arrays.",
    hint: "Use the preorder array to identify the root, and inorder to determine left and right subtrees.",
    oneLiner: "Use preorder to pick roots, inorder to split left/right.",
    simpleExplanation: "First value is root.\nInorder tells you who's left/right.\nRecursively build the tree!",
    mnemonics: [
      "\"Map inorder index\" → inorder_map = {val: idx for ...}",
      "\"Pick root\" → root_val = preorder[pre_idx]",
      "\"Split subtrees\" → helper(pre_idx+1, ..., in_idx-1)"
    ],
    code: `def buildTree(self, preorder, inorder):
    inorder_map = {val: idx for idx, val in enumerate(inorder)}
    
    def helper(pre_idx, in_left, in_right):
        if in_left > in_right:
            return None
        root_val = preorder[pre_idx]
        root = TreeNode(root_val)
        in_idx = inorder_map[root_val]
        root.left = helper(pre_idx + 1, in_left, in_idx - 1)
        root.right = helper(pre_idx + (in_idx - in_left) + 1, in_idx + 1, in_right)
        return root

    return helper(0, 0, len(inorder) - 1)`,
    timeComplexity: "O(N) - we process each node once",
    spaceComplexity: "O(N) - for the hash map and recursion stack"
  },
  {
    id: 14,
    title: "Binary Tree Maximum Path Sum",
    question: "Find the maximum path sum between any two nodes in a binary tree.",
    hint: "Track both the maximum path sum and the maximum path sum ending at each node.",
    oneLiner: "DFS each node and track best path going through it.",
    simpleExplanation: "Try every path that bends at a node.\nTrack the best total sum.\nOnly return max single-leg path upward!",
    mnemonics: [
      "\"Ignore negatives\" → left = max(dfs(node.left), 0)",
      "\"Update global max\" → max_sum = max(max_sum, left + right + node.val)",
      "\"Return one leg\" → return node.val + max(left, right)"
    ],
    code: `def maxPathSum(self, root):
    max_sum = float('-inf')

    def dfs(node):
        nonlocal max_sum
        if not node:
            return 0
        left = max(dfs(node.left), 0)
        right = max(dfs(node.right), 0)
        max_sum = max(max_sum, left + right + node.val)
        return node.val + max(left, right)

    dfs(root)
    return max_sum`,
    timeComplexity: "O(N) - we visit each node once",
    spaceComplexity: "O(H) - recursion stack, where H is the height"
  },
  {
    id: 15,
    title: "Serialize and Deserialize Binary Tree",
    question: "Design an algorithm to serialize and deserialize a binary tree.",
    hint: "Use a preorder traversal with a special null marker.",
    oneLiner: "Turn the tree into a nested list and JSON it.",
    simpleExplanation: "Turn tree into a string.\nSend it over the wire.\nRebuild it later!",
    mnemonics: [
      "\"Listify tree\" → [val, left, right]",
      "\"Use JSON\" → json.dumps(...) / json.loads(...)",
      "\"Recursive decode\" → deserialize(lst[1]), deserialize(lst[2])"
    ],
    code: `def serialize(self, root):
    return json.dumps([] if not root else [root.val, self.serialize(root.left), self.serialize(root.right)])

def deserialize(self, data):
    lst = json.loads(data)
    if not lst:
        return None
    node = TreeNode(lst[0])
    node.left = self.deserialize(lst[1])
    node.right = self.deserialize(lst[2])
    return node`,
    timeComplexity: "O(N) - we process each node once",
    spaceComplexity: "O(N) - for the serialized string"
  }
];