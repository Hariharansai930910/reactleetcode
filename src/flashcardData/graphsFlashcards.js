// src/flashcardData/graphsFlashcards.js

export const graphsFlashcards = [
  {
    id: 1,
    title: "Number of Islands",
    question: "Given a 2D grid map of '1's (land) and '0's (water), count the number of islands.",
    hint: "Use DFS or BFS to explore connected land cells.",
    oneLiner: "Use DFS to flood-fill land and count how many times it starts.",
    simpleExplanation: "See land? Dive in and mark all connected land.\nGo up, down, left, right — turn it to water.\nCount how many dives you did!",
    mnemonics: [
      "\"Land found → dive!\" → if grid[r][c] == '1': dfs(r, c); count += 1",
      "\"Flood fill\" → grid[r][c] = '0'",
      "\"Recursive splash\" → dfs(r + 1, c), dfs(r - 1, c), dfs(r, c + 1), dfs(r, c - 1)"
    ],
    code: `def numIslands(grid):
    if not grid:
        return 0

    def dfs(r, c):
        if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]) or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # Mark as visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    count = 0
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1
    return count`,
    timeComplexity: "O(M × N), where M is the number of rows and N is the number of columns",
    spaceComplexity: "O(M × N) in worst case for recursion stack"
  },
  {
    id: 2,
    title: "Max Area of Island",
    question: "Find the maximum area of an island in a 2D grid.",
    hint: "Track area while using DFS/BFS to explore islands.",
    oneLiner: "DFS to count connected land areas and track the max size.",
    simpleExplanation: "Explore each island like a treasure map.\nCount each land you step on.\nKeep the biggest number!",
    mnemonics: [
      "\"Step on land\" → return 1 + dfs(...) + ...",
      "\"Sink it\" → grid[r][c] = 0",
      "\"Track best\" → max_area = max(max_area, dfs(r, c))"
    ],
    code: `def maxAreaOfIsland(grid):
    if not grid:
        return 0

    def dfs(r, c):
        if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]) or grid[r][c] == 0:
            return 0
        grid[r][c] = 0  # Mark as visited
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)

    max_area = 0
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == 1:
                max_area = max(max_area, dfs(r, c))
    return max_area`,
    timeComplexity: "O(M × N), where M is rows and N is columns",
    spaceComplexity: "O(M × N) in worst case for recursion stack"
  },
  {
    id: 3,
    title: "Clone Graph",
    question: "Create a deep copy of a connected undirected graph.",
    hint: "Use a hash map to map original nodes to their clones.",
    oneLiner: "Use DFS and a hashmap to copy each node and its neighbors.",
    simpleExplanation: "Copy the node. Then copy its friends.\nDon't copy the same kid twice!\nUse a notebook to remember who you copied.",
    mnemonics: [
      "\"Memoize node\" → old_to_new[node] = copy",
      "\"Visit neighbors\" → copy.neighbors.append(dfs(neighbor))",
      "\"Return copy\" → return old_to_new[node]"
    ],
    code: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node):
    if not node:
        return None

    old_to_new = {}

    def dfs(node):
        if node in old_to_new:
            return old_to_new[node]
        copy = Node(node.val)
        old_to_new[node] = copy
        for neighbor in node.neighbors:
            copy.neighbors.append(dfs(neighbor))
        return copy

    return dfs(node)`,
    timeComplexity: "O(N + M), where N is nodes and M is edges",
    spaceComplexity: "O(N) for mapping old nodes to new nodes"
  },
  {
    id: 4,
    title: "Walls and Gates",
    question: "Fill each empty room with the distance to its nearest gate.",
    hint: "Use multi-source BFS starting from all gates.",
    oneLiner: "Use BFS from every gate to fill rooms with the shortest distance.",
    simpleExplanation: "Start walking from every open gate.\nStep by step, add 1 to your count.\nStop if you hit a wall!",
    mnemonics: [
      "\"Start from gates\" → if rooms[r][c] == 0: queue.append((r, c))",
      "\"Step update\" → rooms[rr][cc] = rooms[r][c] + 1",
      "\"BFS directions\" → for dr, dc in [(1,0), (-1,0), (0,1), (0,-1)]"
    ],
    code: `from collections import deque

def wallsAndGates(rooms):
    if not rooms:
        return

    rows, cols = len(rooms), len(rooms[0])
    queue = deque()

    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 0:
                queue.append((r, c))

    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    while queue:
        r, c = queue.popleft()
        for dr, dc in directions:
            rr, cc = r + dr, c + dc
            if 0 <= rr < rows and 0 <= cc < cols and rooms[rr][cc] == float('inf'):
                rooms[rr][cc] = rooms[r][c] + 1
                queue.append((rr, cc))`,
    timeComplexity: "O(M × N), where M is rows and N is columns",
    spaceComplexity: "O(M × N) for the queue in worst case"
  },
  {
    id: 5,
    title: "Rotting Oranges",
    question: "Determine the minimum time required for all oranges to become rotten.",
    hint: "Use BFS with a time counter to track each minute of rot spread.",
    oneLiner: "Use BFS to spread rot from all rotten oranges minute by minute.",
    simpleExplanation: "Rotten oranges spread the stink.\nEach minute, they infect their neighbors.\nIf any fresh ones are left, return -1!",
    mnemonics: [
      "\"Start with all rotten\" → if grid[r][c] == 2: queue.append((r, c, 0))",
      "\"Spread the rot\" → grid[rr][cc] = 2",
      "\"Track time\" → minutes = max(minutes, cur_minute)"
    ],
    code: `from collections import deque

def orangesRotting(grid):
    if not grid:
        return -1

    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh_oranges = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c, 0))
            elif grid[r][c] == 1:
                fresh_oranges += 1

    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    minutes = 0

    while queue:
        r, c, minutes = queue.popleft()
        for dr, dc in directions:
            rr, cc = r + dr, c + dc
            if 0 <= rr < rows and 0 <= cc < cols and grid[rr][cc] == 1:
                grid[rr][cc] = 2
                fresh_oranges -= 1
                queue.append((rr, cc, minutes + 1))

    return minutes if fresh_oranges == 0 else -1`,
    timeComplexity: "O(M × N), where M is rows and N is columns",
    spaceComplexity: "O(M × N) for the queue in worst case"
  },
  {
    id: 6,
    title: "Pacific Atlantic Water Flow",
    question: "Find grid coordinates where water can flow to both Pacific and Atlantic oceans.",
    hint: "Start from ocean edges and work inward to find reachable cells.",
    oneLiner: "DFS from both ocean edges to find cells that can reach both.",
    simpleExplanation: "Water flows downhill or flat.\nStart from each ocean and mark the cells.\nReturn where both oceans meet!",
    mnemonics: [
      "\"Visit cell\" → visited.add((r, c))",
      "\"DFS only higher/equal\" → if heights[r][c] < prev_height: return",
      "\"Intersect both oceans\" → return list(pacific & atlantic)"
    ],
    code: `def pacificAtlantic(heights):
    if not heights:
        return []

    m, n = len(heights), len(heights[0])
    pacific = set()
    atlantic = set()

    def dfs(r, c, visited, prev_height):
        if (
            (r, c) in visited or
            r < 0 or c < 0 or r >= m or c >= n or
            heights[r][c] < prev_height
        ):
            return
        visited.add((r, c))
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            dfs(r + dr, c + dc, visited, heights[r][c])

    for i in range(m):
        dfs(i, 0, pacific, heights[i][0])
        dfs(i, n - 1, atlantic, heights[i][n - 1])
    for j in range(n):
        dfs(0, j, pacific, heights[0][j])
        dfs(m - 1, j, atlantic, heights[m - 1][j])

    return list(pacific & atlantic)`,
    timeComplexity: "O(m × n), where m is rows and n is columns",
    spaceComplexity: "O(m × n) for the sets and recursion stack"
  },
  {
    id: 7,
    title: "Surrounded Regions",
    question: "Capture all regions surrounded by X in a board.",
    hint: "Mark border-connected O's first, then flip the rest.",
    oneLiner: "Use DFS to mark safe 'O's on the border, then flip the rest.",
    simpleExplanation: "Mark the border O's as safe.\nFlip all trapped O's to X.\nFlip the safe ones back.",
    mnemonics: [
      "\"Safe marker\" → board[r][c] = '#'",
      "\"Flip trapped\" → if board[i][j] == 'O': board[i][j] = 'X'",
      "\"Restore safe\" → if board[i][j] == '#': board[i][j] = 'O'"
    ],
    code: `def solve(board):
    if not board or not board[0]:
        return

    m, n = len(board), len(board[0])

    def dfs(r, c):
        if r < 0 or c < 0 or r >= m or c >= n or board[r][c] != 'O':
            return
        board[r][c] = '#'
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            dfs(r + dr, c + dc)

    for i in range(m):
        dfs(i, 0)
        dfs(i, n - 1)
    for j in range(n):
        dfs(0, j)
        dfs(m - 1, j)

    for i in range(m):
        for j in range(n):
            if board[i][j] == 'O':
                board[i][j] = 'X'
            elif board[i][j] == '#':
                board[i][j] = 'O'`,
    timeComplexity: "O(m × n), each cell processed at most twice",
    spaceComplexity: "O(m × n) for the recursion stack in worst case"
  },
  {
    id: 8,
    title: "Course Schedule",
    question: "Determine if it's possible to finish all courses given prerequisites.",
    hint: "Use topological sort to check if there's any cycle in the graph.",
    oneLiner: "Use topological sort to check if all courses can be completed.",
    simpleExplanation: "Take courses with no prerequisites.\nRemove them from the graph.\nIf all courses can be taken, there's no cycle!",
    mnemonics: [
      "\"Count pre-reqs\" → indegree[course] += 1",
      "\"Start with zero prereqs\" → if indegree[c] == 0: queue.append(c)",
      "\"All courses?\" → return count == numCourses"
    ],
    code: `from collections import defaultdict, deque

def canFinish(numCourses, prerequisites):
    # Build adjacency list and indegree count
    graph = defaultdict(list)
    indegree = [0] * numCourses
    
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1
    
    # Start with courses that have no prerequisites
    queue = deque([c for c in range(numCourses) if indegree[c] == 0])
    count = 0
    
    while queue:
        curr = queue.popleft()
        count += 1
        
        for next_course in graph[curr]:
            indegree[next_course] -= 1
            if indegree[next_course] == 0:
                queue.append(next_course)
    
    return count == numCourses`,
    timeComplexity: "O(V + E), where V is vertices and E is edges",
    spaceComplexity: "O(V + E) for the adjacency list and queue"
  }
];