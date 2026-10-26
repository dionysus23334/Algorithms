# 9.7 Approximation Algorithms

> **Level**: Level 9 · Algorithm Theory and Computational Limits  
> **Status**: Expanded.

## Learning Objectives

- Define the approximation ratio;
- Write a 2-approximation for vertex cover;
- Use a greedy approach for set cover.

## Approximation Ratio

For a minimisation problem, the algorithm's solution \(A\) and the optimal solution \(OPT\) satisfy

\[
A\le \rho\cdot OPT
\]

and the algorithm is called a \(\rho\)-approximation. The closer \(\rho\) is to 1, the better.

## 2-Approximation for Vertex Cover

Repeatedly take an uncovered edge and add both of its endpoints to the cover.

```python
def vertex_cover_2approx(n: int, edges: list[tuple[int,int]]) -> set[int]:
    cover = set()
    used = [False] * len(edges)
    for i, (u, v) in enumerate(edges):
        if used[i]:
            continue
        cover.add(u); cover.add(v)
        for j, (a, b) in enumerate(edges):
            if a in cover or b in cover:
                used[j] = True
    return cover
```

Approximation ratio 2: the edge chosen at each step has at least one endpoint that must lie in any cover, while we choose two.

## Greedy Set Cover

At each step choose the set covering the most uncovered elements; the approximation ratio is \(H_n=O(\log n)\).

## C++ Vertex Cover

```cpp
#include <set>
#include <utility>
#include <vector>

std::set<int> vertex_cover(const std::vector<std::pair<int,int>>& edges) {
    std::set<int> cover;
    for (auto [u, v] : edges) {
        if (cover.count(u) || cover.count(v)) continue;
        cover.insert(u); cover.insert(v);
    }
    return cover;
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Maximisation problems | the ratio points the other way |
| Approximation ratio | a worst-case guarantee |
| Heuristics | no guarantee, so not an approximation algorithm |
| Inapproximability | some problems have lower bounds |

## Exercises

1. Prove the 2-approximation for vertex cover.
2. Implement the greedy set cover and estimate its approximation ratio.
3. Construct a vertex-cover instance on which the greedy approach attains a factor of 2.

## Sources

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)
- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)

## Navigation

[← Previous](06-lower-bounds.md) · [Level Overview](index.md) · [Next](08-online.md)
