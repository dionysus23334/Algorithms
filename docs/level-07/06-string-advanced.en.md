# 7.6 Advanced Strings

> **Level**: Level 7 · Advanced Algorithms and Data Structures  
> **Status**: expanded.

## Learning Objectives

- Use the Aho–Corasick automaton for multi-pattern matching;
- Use Manacher to compute palindrome radii;
- Understand suffix arrays and LCP.

## Aho–Corasick Automaton

Trie + fail pointers; fail points to the node corresponding to the longest proper suffix.

```python
from collections import deque

class AC:
    def __init__(self) -> None:
        self.next = [{}]
        self.fail = [0]
        self.out = [[]]

    def add(self, word: str, idx: int) -> None:
        u = 0
        for ch in word:
            if ch not in self.next[u]:
                self.next[u][ch] = len(self.next)
                self.next.append({})
                self.fail.append(0)
                self.out.append([])
            u = self.next[u][ch]
        self.out[u].append(idx)

    def build(self) -> None:
        q = deque()
        for v in self.next[0].values():
            q.append(v)
        while q:
            u = q.popleft()
            for ch, v in self.next[u].items():
                f = self.fail[u]
                while f and ch not in self.next[f]:
                    f = self.fail[f]
                self.fail[v] = self.next[f].get(ch, 0)
                self.out[v] += self.out[self.fail[v]]
                q.append(v)
```

The running time depends on the total length and the alphabet size.

## Manacher

`d1[i]`: the radius of the odd-length palindrome centered at `i`; `d2[i]`: the radius of the even-length palindrome. Linear time.

```python
def manacher(s: str) -> tuple[list[int], list[int]]:
    n = len(s)
    d1 = [0] * n
    l, r = 0, -1
    for i in range(n):
        k = 1 if i > r else min(d1[l + r - i], r - i + 1)
        while i - k >= 0 and i + k < n and s[i-k] == s[i+k]:
            k += 1
        d1[i] = k
        if i + k - 1 > r:
            l, r = i - k + 1, i + k - 1
    d2 = [0] * n
    l, r = 0, -1
    for i in range(n):
        k = 0 if i > r else min(d2[l + r - i + 1], r - i + 1)
        while i - k - 1 >= 0 and i + k < n and s[i-k-1] == s[i+k]:
            k += 1
        d2[i] = k
        if i + k - 1 > r:
            l, r = i - k, i + k - 1
    return d1, d2
```

## Suffix Array

`sa[i]`: the starting position of the \(i\)-th smallest suffix; `lcp` is the longest common prefix of adjacent suffixes. Doubling + radix sort gives \(O(n\log n)\).

## C++ Implementation

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

int longest_palindrome(const std::string& s) {
    int n = s.size(), best = 1;
    std::vector<int> d1(n), d2(n);
    for (int i = 0, l = 0, r = -1; i < n; ++i) {
        int k = (i > r) ? 1 : std::min(d1[l + r - i], r - i + 1);
        while (i - k >= 0 && i + k < n && s[i-k] == s[i+k]) ++k;
        d1[i] = k; best = std::max(best, 2 * k - 1);
        if (i + k - 1 > r) { l = i - k + 1; r = i + k - 1; }
    }
    for (int i = 0, l = 0, r = -1; i < n; ++i) {
        int k = (i > r) ? 0 : std::min(d2[l + r - i + 1], r - i + 1);
        while (i - k - 1 >= 0 && i + k < n && s[i-k-1] == s[i+k]) ++k;
        d2[i] = k; best = std::max(best, 2 * k);
        if (i + k - 1 > r) { l = i - k; r = i + k - 1; }
    }
    return best;
}

int main() {
    std::cout << longest_palindrome("abacdfgdcaba") << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty string | The arrays are empty |
| Alphabet | Array / hash table |
| Overlapping patterns | The `out` chain of the AC automaton |
| Palindrome centers | Two sets of arrays, for odd and even lengths |

## Exercises

1. Use the Aho–Corasick automaton to count the number of occurrences of each pattern.
2. Use Manacher to find the longest palindromic substring.
3. Use a suffix array to count the number of distinct substrings.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](05-network-flow.md) · [Level Overview](index.md) · [Next](07-advanced-trees.md)
