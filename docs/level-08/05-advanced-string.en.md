# 8.5 Advanced String Structures

> **Level**: Level 8 · Advanced Algorithms and Computational Methods  
> **Status**: Expanded.

## Learning Objectives

- Build a suffix automaton (SAM);
- Understand the equivalent information carried by a suffix tree;
- Use a SAM to count distinct substrings / occurrences.

## Suffix Automaton

A SAM accepts all suffixes of a string; each state represents a set of substrings sharing the same endpos.

```python
class SAM:
    def __init__(self) -> None:
        self.next = [{}]
        self.link = [-1]
        self.len = [0]
        self.last = 0

    def extend(self, ch: str) -> None:
        cur = len(self.next)
        self.next.append({})
        self.link.append(0)
        self.len.append(self.len[self.last] + 1)
        p = self.last
        while p != -1 and ch not in self.next[p]:
            self.next[p][ch] = cur
            p = self.link[p]
        if p == -1:
            self.link[cur] = 0
        else:
            q = self.next[p][ch]
            if self.len[p] + 1 == self.len[q]:
                self.link[cur] = q
            else:
                clone = len(self.next)
                self.next.append(self.next[q].copy())
                self.link.append(self.link[q])
                self.len.append(self.len[p] + 1)
                while p != -1 and self.next[p].get(ch) == q:
                    self.next[p][ch] = clone
                    p = self.link[p]
                self.link[q] = self.link[cur] = clone
        self.last = cur
```

Number of distinct substrings:

\[
\sum_v (\operatorname{len}(v)-\operatorname{len}(\operatorname{link}(v))).
\]

## Suffix Tree

A suffix tree is a compressed suffix trie; it can be built from a SAM or a suffix array. It supports substring occurrence counts, longest common substring and more.

## C++ SAM State

```cpp
#include <array>
#include <string>
#include <vector>

struct State {
    std::array<int, 26> next{};
    int link = -1, len = 0;
    State() { next.fill(-1); }
};

void extend(std::vector<State>& st, int& last, char ch) {
    int cur = st.size();
    st.emplace_back();
    st[cur].len = st[last].len + 1;
    int p = last;
    while (p != -1 && st[p].next[ch - 'a'] == -1) {
        st[p].next[ch - 'a'] = cur;
        p = st[p].link;
    }
    if (p == -1) st[cur].link = 0;
    else {
        int q = st[p].next[ch - 'a'];
        if (st[p].len + 1 == st[q].len) st[cur].link = q;
        else {
            int clone = st.size();
            st.push_back(st[q]);
            st[clone].len = st[p].len + 1;
            while (p != -1 && st[p].next[ch - 'a'] == q) {
                st[p].next[ch - 'a'] = clone;
                p = st[p].link;
            }
            st[q].link = st[cur].link = clone;
        }
    }
    last = cur;
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty string | Only the initial state |
| Character set | Array / hash table |
| Clone states | Length and link must be correct |
| Occurrence counts | Accumulate over the parent tree |

## Exercises

1. Count the number of distinct substrings with a SAM.
2. Count the occurrences of every substring.
3. Find the longest common substring with a suffix tree.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](04-advanced-graph.md) · [Level Overview](index.md) · [Next](06-dynamic-trees.md)
