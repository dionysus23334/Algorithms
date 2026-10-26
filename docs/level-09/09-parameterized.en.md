# 9.9 Parameterized Algorithms

> **Level**: Level 9 · Algorithm Theory and Computational Limits  
> **Status**: Expanded.

## Learning Objectives

- Define FPT;
- Solve vertex cover with a search tree;
- Understand kernelization.

## Parameterized Complexity

A problem instance carries a parameter \(k\); if the running time of the algorithm is

\[
O(f(k)\cdot n^c)
\]

where \(c\) is independent of \(k\), the problem is called fixed-parameter tractable (FPT).

## Vertex Cover Search Tree

Pick an edge \((u,v)\); every cover must contain \(u\) or \(v\):

```python
def vertex_cover_fpt(n: int, edges: list[tuple[int,int]], k: int) -> set[int] | None:
    if not edges:
        return set()
    if k == 0:
        return None
    u, v = edges[0]
    rest = [e for e in edges if u not in e and v not in e]
    left = vertex_cover_fpt(n, rest, k - 1)
    if left is not None:
        return left | {u}
    right = vertex_cover_fpt(n, rest, k - 1)
    if right is not None:
        return right | {v}
    return None
```

Time \(O(2^k\cdot m)\).

## Kernelization

Use rules to shrink the instance to a kernel whose size depends only on \(k\); for example, in vertex cover any vertex of degree \(>k\) must be selected.

## C++ Recursion Framework

```cpp
#include <utility>
#include <vector>

bool vc(int k, std::vector<std::pair<int,int>> edges) {
    if (edges.empty()) return true;
    if (k == 0) return false;
    auto [u, v] = edges.front();
    std::vector<std::pair<int,int>> rest;
    for (auto e : edges) if (e.first != u && e.second != u && e.first != v && e.second != v) rest.push_back(e);
    return vc(k-1, rest);
}
```

(The example explores only one side; the complete version must try \(u\) and \(v\) separately.)

## Boundary Cases

| Scenario | Note |
|---|---|
| \(k\) large | \(2^k\) blows up |
| Choice of parameter | Affects FPT |
| Kernel size | The rules must be proved safe |
| NP-hard | Parameterization does not change the worst case |

## Exercises

1. Implement the complete two-branch vertex cover.
2. Kernelize using the degree rule.
3. Explain why \(O(n^k)\) is not FPT.

## Sources

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## Navigation

[← Previous](08-online.md) · [Level Overview](index.md) · [Next](10-randomized-theory.md)
