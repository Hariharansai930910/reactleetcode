// src/flashcardData/advancedGraphsFlashcards.js

export const advancedGraphsFlashcards = [
  {
    id: 1,
    title: "Network Delay Time",
    question: "Given a network of n nodes, labeled from 1 to n, and times representing travel times as directed edges, find the minimum time for all nodes to receive a signal starting from a given node k.",
    hint: "Use Dijkstra's algorithm to find shortest paths from the source node.",
    oneLiner: "Use Dijkstra's algorithm to find shortest time to all nodes.",
    simpleExplanation: "We send a signal from one point.\nWe figure out how fast it can reach every other point.\nThe longest of those times is our answer.",
    mnemonics: [
      "\"Build graph\" → graph[u].append((v, w))",
      "\"Min-heap Dijkstra\" → heappop(heap) gives node with smallest time",
      "\"Update time\" → if new_time < dist[v]: update and push"
    ],
    code: `class Solution:
def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    edges = collections.defaultdict(list)
    for u, v, w in times:
        edges[u].append((v, w))

    minHeap = [(0, k)]
    visit = set()
    t = 0
    while minHeap:
        w1, n1 = heapq.heappop(minHeap)
        if n1 in visit:
            continue
        visit.add(n1)
        t = w1

        for n2, w2 in edges[n1]:
            if n2 not in visit:
                heapq.heappush(minHeap, (w1 + w2, n2))
    return t if len(visit) == n else -1`,
    timeComplexity: "O(E log V) - where E is edges and V is vertices",
    spaceComplexity: "O(V) - to store distances to all vertices"
  },
  {
    id: 2,
    title: "Reconstruct Itinerary",
    question: "Given a list of airline tickets, reconstruct the itinerary in order starting from 'JFK'. If there are multiple valid itineraries, return the lexicographically smallest one.",
    hint: "Use a greedy DFS approach to pick the lexicographically smallest destination at each step.",
    oneLiner: "Use DFS + min-heap to build lexicographically smallest itinerary.",
    simpleExplanation: "We treat each airport as a point.\nWe travel using the smallest possible word (alphabetically).\nWhen all tickets are used, that's our path.",
    mnemonics: [
      "\"Build min-heap graph\" → graph[frm].append(to); heapify",
      "\"DFS visit\" → while graph[airport]: dfs(next_dest)",
      "\"Build itinerary\" → res.appendleft(airport)"
    ],
    code: `class Solution:
def findItinerary(self, tickets: List[List[str]]) -> List[str]:
    adj = defaultdict(list)
    for src, dst in sorted(tickets)[::-1]:
        adj[src].append(dst)
        
    stack = ["JFK"]
    res = []
    
    while stack:
        curr = stack[-1]
        if not adj[curr]:
            res.append(stack.pop())
        else:
            stack.append(adj[curr].pop())
            
    return res[::-1]`,
    timeComplexity: "O(E log E) - where E is the number of edges/tickets",
    spaceComplexity: "O(V + E) - to store the graph and result"
  },
  {
    id: 3,
    title: "Min Cost to Connect All Points",
    question: "Given an array of points on a 2D plane, return the minimum cost to connect all points where the cost between two points is their Manhattan distance.",
    hint: "Use a minimum spanning tree algorithm like Prim's or Kruskal's.",
    oneLiner: "Use Prim's algorithm (MST) with min-heap for Manhattan distances.",
    simpleExplanation: "We connect all dots with the least total cost.\nWe always choose the shortest connection that's not yet used.\nWhen all points are connected, we stop.",
    mnemonics: [
      "\"Heap init\" → heap = [(0, 0)] (cost, node)",
      "\"Track visited\" → if node not in visited: add to cost",
      "\"Push neighbors\" → for every next_point: heappush with distance"
    ],
    code: `class Solution:
def minCostConnectPoints(self, points: List[List[int]]) -> int:
    n, node = len(points), 0
    dist = [100000000] * n
    visit = [False] * n
    edges, res = 0, 0

    while edges < n - 1:
        visit[node] = True
        nextNode = -1
        for i in range(n):
            if visit[i]:
                continue
            curDist = (abs(points[i][0] - points[node][0]) + 
                       abs(points[i][1] - points[node][1]))
            dist[i] = min(dist[i], curDist)
            if nextNode == -1 or dist[i] < dist[nextNode]:
                nextNode = i
                
        res += dist[nextNode]
        node = nextNode
        edges += 1

    return res`,
    timeComplexity: "O(V²) - where V is the number of points",
    spaceComplexity: "O(V) - to store distances and visited array"
  },
  {
    id: 4,
    title: "Swim in Rising Water",
    question: "Find the least time until you can reach the bottom right square in a grid where the depth of water at time t is t.",
    hint: "Use Dijkstra's algorithm or binary search to find the minimum time required.",
    oneLiner: "Use Dijkstra-style BFS to always swim in the minimum rising level.",
    simpleExplanation: "We treat the grid like a pool filling up.\nWe can only move to spots that are less than or equal to the current water level.\nWe find the smallest max value along the path to the bottom.",
    mnemonics: [
      "\"Heap by elevation\" → heappush(heap, (elevation, r, c))",
      "\"Track max\" → max_time = max(max_time, grid[r][c])",
      "\"Stop at end\" → if r == n-1 and c == n-1: return max_time"
    ],
    code: `class Solution:
def swimInWater(self, grid: List[List[int]]) -> int:
    N = len(grid)
    visit = set()
    minH = [[grid[0][0], 0, 0]]  # (time/max-height, r, c)
    directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

    visit.add((0, 0))
    while minH:
        t, r, c = heapq.heappop(minH)
        if r == N - 1 and c == N - 1:
            return t
        for dr, dc in directions:
            neiR, neiC = r + dr, c + dc
            if (neiR < 0 or neiC < 0 or 
                neiR == N or neiC == N or
                (neiR, neiC) in visit
            ):
                continue
            visit.add((neiR, neiC))
            heapq.heappush(minH, [max(t, grid[neiR][neiC]), neiR, neiC])`,
    timeComplexity: "O(N² log N) - where N is the grid size",
    spaceComplexity: "O(N²) - for the visited set and heap"
  },
  {
    id: 5,
    title: "Alien Dictionary",
    question: "Given a sorted dictionary of alien words, derive the order of letters in the alien language.",
    hint: "Construct a graph where each edge (a,b) means 'a comes before b', then perform topological sort.",
    oneLiner: "Build graph from character order and use topological sort (BFS).",
    simpleExplanation: "We look at word pairs to learn which letter comes first.\nWe build a graph of rules from those pairs.\nThen we sort the letters based on what comes before what.",
    mnemonics: [
      "\"Build graph\" → if a != b: graph[a].add(b); indegree[b] += 1",
      "\"Start with 0 indegree\" → queue = letters with indegree 0",
      "\"Topo sort\" → while queue: pop letter, reduce indegrees"
    ],
    code: `function alienOrder(words) {
  const adj = {};
  const indegree = {};

  for (const word of words) {
    for (const char of word) {
      adj[char] = new Set();
      indegree[char] = 0;
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const [w1, w2] = [words[i], words[i + 1]];
    const minLen = Math.min(w1.length, w2.length);
    if (w1.length > w2.length && w1.slice(0, minLen) === w2) return "";

    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        if (!adj[w1[j]].has(w2[j])) {
          adj[w1[j]].add(w2[j]);
          indegree[w2[j]]++;
        }
        break;
      }
    }
  }

  const queue = [];
  for (const char in indegree) {
    if (indegree[char] === 0) queue.push(char);
  }

  const res = [];
  while (queue.length) {
    const char = queue.shift();
    res.push(char);
    for (const neighbor of adj[char]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return res.length === Object.keys(indegree).length ? res.join("") : "";
}`,
    timeComplexity: "O(C) - where C is the total length of all words",
    spaceComplexity: "O(1) - at most 26 letters in alphabet"
  },
  {
    id: 6,
    title: "Cheapest Flights Within K Stops",
    question: "Find the cheapest price from source to destination with at most k stops.",
    hint: "Use Bellman-Ford or BFS with a queue to track the number of stops.",
    oneLiner: "Use modified BFS (Bellman-Ford style) with (cost, node, stops).",
    simpleExplanation: "We look for the cheapest flight path with limited stops.\nWe explore each city step by step.\nWe avoid paths that are too long or expensive.",
    mnemonics: [
      "\"Queue with stops\" → queue = [(0, src, 0)]",
      "\"If stops ≤ K\" → push (cost + price, next, stops + 1)",
      "\"Track cheapest\" → if city == dst: return cost"
    ],
    code: `function findCheapestPrice(n, flights, src, dst, k) {
  const prices = new Array(n).fill(Infinity);
  prices[src] = 0;
  
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, cost] of flights) {
    adj[u].push([v, cost]);
  }

  const queue = [[0, src, 0]];

  while (queue.length) {
    const [cost, node, stops] = queue.shift();
    if (stops > k) continue;

    for (const [nei, price] of adj[node]) {
      const nextCost = cost + price;
      if (nextCost < prices[nei]) {
        prices[nei] = nextCost;
        queue.push([nextCost, nei, stops + 1]);
      }
    }
  }

  return prices[dst] === Infinity ? -1 : prices[dst];
}`,
    timeComplexity: "O(V + E*K) - where V is vertices, E is edges",
    spaceComplexity: "O(V) - to store the prices array"
  }
];
