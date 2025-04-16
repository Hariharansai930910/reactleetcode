export const trieFlashcards = [
  {
    id: 1,
    title: "Implement Trie (Prefix Tree)",
    question: "Design a data structure that supports inserting, searching, and prefix matching for strings",
    hint: "Think about how to represent character-by-character traversal using nested dictionaries",
    oneLiner: "Use a nested dictionary where each node is a character map, ending with a special end marker.",
    simpleExplanation: "We build a tree where each letter has its own branch.\nWe follow each letter step by step when adding a word.\nA special symbol tells us when a word ends.",
    mnemonics: [
      "\"Start root\" → self.root = {}",
      "\"Insert char by char\" → node = node.setdefault(char, {})",
      "\"Mark end of word\" → node['#'] = True"
    ],
    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.isWord = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.isWord = True

    def search(self, word):
        node = self._find(word)
        return node is not None and node.isWord

    def startsWith(self, prefix):
        return self._find(prefix) is not None

    def _find(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node`,
    timeComplexity: "insert: O(L), search: O(L), startsWith: O(L) where L is word length",
    spaceComplexity: "O(N) where N is total characters inserted"
  },
  {
    id: 2,
    title: "Design Add and Search Words Data Structure",
    question: "Implement a data structure that can add words and search for words with wildcards",
    hint: "How would you handle a '.' character that can match any letter during search?",
    oneLiner: "Extend Trie with DFS to handle wildcards (.) during search.",
    simpleExplanation: "We store words in a special tree (Trie).\nWhen searching, we can use . to mean any letter.\nWe check all possible paths for matches.",
    mnemonics: [
      "\"Dot means explore\" → if char == '.': try all children",
      "\"End match\" → if at end and '#' in node: return True",
      "\"DFS search\" → searchHelper(word, index, node)"
    ],
    code: `class WordDictionary:
    def __init__(self):
        self.root = {}

    def addWord(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node['#'] = True  # End of word

    def search(self, word):
        def dfs(node, i):
            if i == len(word):
                return '#' in node
            if word[i] == '.':
                return any(dfs(child, i + 1) for child in node if child != '#')
            return word[i] in node and dfs(node[word[i]], i + 1)

        return dfs(self.root, 0)`,
    timeComplexity: "addWord: O(L), search: Worst case O(26^L) if all characters are .",
    spaceComplexity: "O(N) where N is total characters inserted"
  },
  {
    id: 3,
    title: "Word Search II",
    question: "Given an m×n board of characters and a list of words, find all words that can be formed on the board",
    hint: "Could you use a Trie to quickly check if a prefix exists in the word list during board traversal?",
    oneLiner: "Build a Trie of words, then DFS through board to match prefixes.",
    simpleExplanation: "We put all words into a search tree (Trie).\nThen we walk around the board letter by letter.\nIf we match a word path, we add it to our answers.",
    mnemonics: [
      "\"Build Trie first\" → for word in words: insert(word)",
      "\"Explore neighbors\" → dfs(i, j, node)",
      "\"Found word\" → if '#' in node: add to result"
    ],
    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None  # Store word at the end

class Solution:
    def findWords(self, board, words):
        root = TrieNode()

        # Build Trie
        for word in words:
            node = root
            for ch in word:
                if ch not in node.children:
                    node.children[ch] = TrieNode()
                node = node.children[ch]
            node.word = word

        res = []
        rows, cols = len(board), len(board[0])

        def dfs(r, c, node):
            char = board[r][c]
            if char not in node.children:
                return
            nxt_node = node.children[char]
            if nxt_node.word:
                res.append(nxt_node.word)
                nxt_node.word = None  # Avoid duplicates

            board[r][c] = '#'
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':
                    dfs(nr, nc, nxt_node)
            board[r][c] = char

        for r in range(rows):
            for c in range(cols):
                dfs(r, c, root)

        return res`,
    timeComplexity: "Building Trie: O(W * L), DFS Search: O(M * N * 4^L)",
    spaceComplexity: "O(W * L) for Trie + O(L) recursion depth"
  }
];