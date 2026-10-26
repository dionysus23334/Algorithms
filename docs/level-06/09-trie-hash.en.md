# 6.9 String Organization

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: expanded.

## Learning Objectives

- Use a trie for prefix queries;
- Use rolling hashing to compare substrings;
- Know about hash collisions and verification.

## Trie

```python
class TrieNode:
    def __init__(self) -> None:
        self.child: dict[str, "TrieNode"] = {}
        self.end = False

class Trie:
    def __init__(self) -> None:
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        cur = self.root
        for ch in word:
            cur = cur.child.setdefault(ch, TrieNode())
        cur.end = True

    def search(self, word: str) -> bool:
        cur = self.root
        for ch in word:
            if ch not in cur.child:
                return False
            cur = cur.child[ch]
        return cur.end

    def starts_with(self, prefix: str) -> bool:
        cur = self.root
        for ch in prefix:
            if ch not in cur.child:
                return False
            cur = cur.child[ch]
        return True
```

Time \(O(L)\); the space depends on the character set and the total length.

## Rolling Hash

\[
H[i]=\sum_{k=0}^{i-1}s[k]B^{i-1-k}\bmod M.
\]

A substring hash is obtained from the prefix difference multiplied by a modular inverse/power.

```python
def rolling_hash(s: str, base: int = 131, mod: int = 10**9 + 7) -> list[int]:
    h = [0] * (len(s) + 1)
    for i, ch in enumerate(s):
        h[i + 1] = (h[i] * base + ord(ch)) % mod
    return h
```

A single modulus carries a collision risk; use double hashing or verify directly.

## C++ Trie

```cpp
#include <array>
#include <string>
#include <vector>

struct TrieNode {
    std::array<int, 26> next{};
    bool end = false;
    TrieNode() { next.fill(-1); }
};

void insert(std::vector<TrieNode>& t, const std::string& s) {
    int u = 0;
    for (char ch : s) {
        int c = ch - 'a';
        if (t[u].next[c] == -1) {
            t[u].next[c] = static_cast<int>(t.size());
            t.emplace_back();
        }
        u = t[u].next[c];
    }
    t[u].end = true;
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty string | the root node; the semantics of `end` |
| Letter case | normalize or distinguish |
| Hash collision | verify, or use double hashing |
| Large character set | use a hash table instead of an array |

## Exercises

1. Count the number of words in a trie.
2. Use rolling hashing to decide whether two substrings are equal.
3. Construct a hash-collision example and explain why verification matters.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](08-string-matching.md) · [Level Overview](index.md) · [Next](10-number-theory.md)
