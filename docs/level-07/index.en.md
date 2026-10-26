# Level 7 · Advanced Algorithms and Data Structures

> **Goal**: handle more complex states, structures, and combinations of algorithms.
>
> This chapter table defines the table of contents and the writing order; each chapter will ultimately provide Python / C++ dual-language implementations, a running example, and boundary cases.

## Chapters

| Chapter | Content outline | Python / C++ implementation |
|---|---|---|
| 01 | [Advanced Dynamic Programming](01-dp-advanced.md) | Interval DP, bitmask DP, digit DP, rerooting DP | Typical model implementations |
| 02 | [Dynamic Programming Optimization](02-dp-optimization.md) | Rolling arrays, prefix-sum optimization, monotonic-queue optimization | Before/after optimization comparison |
| 03 | [Advanced Search](03-search-advanced.md) | Bidirectional search, iterative deepening, meet-in-the-middle search, A* | Search and heuristic function examples |
| 04 | [Graph Connectivity Structures](04-connectivity.md) | Strongly connected components, condensation, bridges, articulation points, Eulerian paths | Hand-written implementations of the relevant algorithms |
| 05 | [Network Flow and Matching](05-network-flow.md) | Residual networks, augmenting paths, max-flow min-cut, bipartite matching | Dinic, augmenting-path matching |
| 06 | [Advanced Strings](06-string-advanced.md) | Aho–Corasick automaton, Manacher, suffix array, longest common prefix | Multi-pattern matching, palindrome and suffix queries |
| 07 | [Advanced Tree Structures](07-advanced-trees.md) | Rotations and balancing, AVL trees, Treap, persistent segment tree, heavy-light decomposition | Core operations in both languages |
| 08 | [Offline Processing and Block Decomposition](08-offline-block.md) | Block decomposition, Mo's algorithm, sweep line, CDQ divide and conquer | Offline queries and counting |
| 09 | [Advanced Number Theory](09-nt-advanced.md) | Chinese remainder theorem, Euler's totient function, order, primality testing, integer factorization | CRT, Miller–Rabin, Pollard rho |
| 10 | [XOR Linear Basis](10-xor-basis.md) | Vectors over the two-element field, elimination, basis, representability | Insertion, membership test, maximum XOR |
| 11 | [Computational Geometry](11-computational-geometry.md) | Vectors, dot product, cross product, intersection, polygons, convex hull | Geometric predicates, convex hull, rotating calipers |

## Writing conventions

- Present the problem and the interface first, then the implementation;
- The Python version prioritizes expressing the algorithm structure;
- The C++ version demonstrates pointers, memory layout, ownership, and resource management;
- Each chapter contains at least: normal cases, boundary cases, complexity analysis, and exercises.
