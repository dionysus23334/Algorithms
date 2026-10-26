# 9.3 Problem Reductions

> **Level**: Level 9 · Algorithm Theory and Computational Limits  
> **Status**: Expanded.

## Learning Objectives

- Write polynomial-time reductions;
- Determine the direction of a reduction;
- Use reductions to prove NP-hardness.

## Definition of a Reduction

\(A\le_p B\): there exists a polynomial-time function \(f\) such that

\[
x\in A\iff f(x)\in B.
\]

If \(B\) can be solved in polynomial time, then so can \(A\); if \(A\) is hard, then \(B\) is hard.

## Example: Independent Set → Clique

The graph \(G=(V,E)\) has an independent set of size \(k\) \(\iff\) the complement graph \(\bar G\) has a clique of size \(k\).

```python
def complement_graph(n: int, edges: set[tuple[int,int]]) -> set[tuple[int,int]]:
    out = set()
    for i in range(n):
        for j in range(i + 1, n):
            if (i, j) not in edges:
                out.add((i, j))
    return out
```

The reduction changes only the graph, not \(k\), and runs in time \(O(n^2)\).

## Direction

- To prove that \(B\) is NP-hard: reduce from a known NP-hard problem \(A\) to \(B\);
- Do not reduce in the opposite direction;
- A reduction must preserve the answer (yes/no).

## Combined Examples

- 3-SAT \(\le_p\) clique;
- clique \(\le_p\) vertex cover (complement graph / parameter transformation);
- subset sum \(\le_p\) partition.

## C++ Complement Graph

```cpp
#include <set>
#include <utility>
#include <vector>

std::set<std::pair<int,int>> complement(int n, const std::set<std::pair<int,int>>& e) {
    std::set<std::pair<int,int>> out;
    for (int i = 0; i < n; ++i)
        for (int j = i + 1; j < n; ++j)
            if (!e.count({i, j})) out.insert({i, j});
    return out;
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Reduction direction | easy to write backwards |
| Polynomial time | the construction must not be exponential |
| Parameters | whether \(k\) is preserved/transformed |
| Answer preservation | yes/no must correspond |

## Exercises

1. Reduce independent set to vertex cover.
2. Reduce 3-SAT to independent set.
3. Prove that if \(A\le_p B\) and \(B\in P\), then \(A\in P\).

## Sources

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## Navigation

[← Previous](02-computability.md) · [Level Overview](index.md) · [Next](04-complexity-classes.md)
