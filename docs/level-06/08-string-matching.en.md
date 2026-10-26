# 6.8 String Matching

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: Expanded.

## Learning Objectives

- Write naive matching;
- Understand the prefix function and KMP;
- Use the Z algorithm to find repeated structure.

## Naive Matching

```python
def naive_find(text: str, pat: str) -> int:
    n, m = len(text), len(pat)
    for i in range(n - m + 1):
        if text[i:i+m] == pat:
            return i
    return -1
```

Worst case \(O(nm)\).

## KMP Prefix Function

`pi[i]`: the length of the longest proper prefix of `pat[:i+1]` that is also a suffix of it.

```python
def prefix_function(p: str) -> list[int]:
    pi = [0] * len(p)
    j = 0
    for i in range(1, len(p)):
        while j > 0 and p[i] != p[j]:
            j = pi[j - 1]
        if p[i] == p[j]:
            j += 1
        pi[i] = j
    return pi

def kmp_find(text: str, pat: str) -> int:
    if not pat:
        return 0
    pi = prefix_function(pat)
    j = 0
    for i, ch in enumerate(text):
        while j > 0 and ch != pat[j]:
            j = pi[j - 1]
        if ch == pat[j]:
            j += 1
        if j == len(pat):
            return i - len(pat) + 1
    return -1
```

Time \(O(n+m)\).

## Z Algorithm

`z[i]`: the length of the longest common prefix of `s` and `s[i:]`. It can be used to find all matches and periods.

## C++ KMP

```cpp
#include <string>
#include <vector>

std::vector<int> prefix_function(const std::string& p) {
    std::vector<int> pi(p.size(), 0);
    for (int i = 1, j = 0; i < static_cast<int>(p.size()); ++i) {
        while (j > 0 && p[i] != p[j]) j = pi[j - 1];
        if (p[i] == p[j]) ++j;
        pi[i] = j;
    }
    return pi;
}
```

## Boundary Cases

| Case | Note |
|---|---|
| Empty pattern | usually returns 0 |
| Pattern longer than the text | returns -1 |
| Overlapping matches | KMP can continue to find the next one |
| Unicode | by byte or by code point; the convention must be consistent |

## Exercises

1. Return all match positions.
2. Use the prefix function to find the minimal period of a string.
3. Implement matching with the Z algorithm.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](07-monotonic.md) · [Level Overview](index.md) · [Next](09-trie-hash.md)
