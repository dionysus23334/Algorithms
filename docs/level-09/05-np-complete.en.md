# 9.5 NP-Complete Problems

> **Level**: Level 9 · Algorithm Theory and Computational Limits  
> **Status**: Expanded.

## Learning Objectives

- Recognise SAT, 3-SAT, clique, vertex cover and subset sum;
- Verify with small-scale solvers;
- Understand the reduction chain.

## Classic NP-Complete Problems

- **SAT**: satisfiability of a Boolean formula;
- **3-SAT**: every clause has exactly 3 literals;
- **Clique**: whether the graph has a complete subgraph of size \(k\);
- **Vertex cover**: whether there is a set of \(k\) vertices covering all edges;
- **Subset sum**: whether some subset sums to the target.

## Small-scale SAT Solving

```python
from itertools import product

def sat_bruteforce(n: int, clauses: list[list[int]]) -> list[bool] | None:
    for bits in product([False, True], repeat=n):
        if all(any(bits[abs(l)-1] == (l > 0) for l in c) for c in clauses):
            return list(bits)
    return None
```

\(O(2^n\cdot m)\); only suitable for very small \(n\).

## Reduction Chain

\[
\text{SAT}\le_p\text{3-SAT}\le_p\text{independent set}\le_p\text{vertex cover}.
\]

Every step must preserve the answer and be constructed in polynomial time.

## Brute-Force Vertex Cover

```python
from itertools import combinations

def has_vertex_cover(n: int, edges: list[tuple[int,int]], k: int) -> bool:
    for chosen in combinations(range(n), k):
        s = set(chosen)
        if all(u in s or v in s for u, v in edges):
            return True
    return False
```

## C++ Subset Sum

```cpp
#include <iostream>
#include <vector>

bool subset_sum(const std::vector<int>& a, int target) {
    std::vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int x : a)
        for (int j = target; j >= x; --j)
            dp[j] = dp[j] || dp[j-x];
    return dp[target];
}
```

Note: this is pseudo-polynomial \(O(n\cdot target)\), not polynomial.

## Boundary Cases

| Scenario | Note |
|---|---|
| Small \(n\) | brute force/backtracking is feasible |
| Large \(n\) | needs approximation/parameterisation/heuristics |
| Pseudo-polynomial | the number of digits of target is exponential |
| Reduction | parameters and graph construction |

## Exercises

1. Verify a 3-SAT instance by brute force.
2. Reduce vertex cover to independent set.
3. Explain why the subset-sum DP is not polynomial time.

## Sources

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## Navigation

[← Previous](04-complexity-classes.md) · [Level Overview](index.md) · [Next](06-lower-bounds.md)
