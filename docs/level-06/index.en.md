# Level 6 · Common Topic Algorithms

> **Goal**: systematically master the common algorithms in graphs, strings, ranges and number theory.
>
> This chapter table is the table of contents and the writing order; each chapter will ultimately provide dual Python / C++ implementations, a running example and boundary cases.

## Chapters

| Chapter | Content outline | Python / C++ implementation |
|---|---|---|
| 01 | [Graph Search](01-graph-search.md) | BFS, DFS, connected components, grid search | Traversal, flood fill, unweighted shortest paths |
| 02 | [Basic Graph Structures](02-graph-structure.md) | Cycle detection, bipartite graphs, topological sort | Coloring, topological sort, DAG dynamic programming |
| 03 | [Shortest Paths](03-shortest-path.md) | Relaxation, non-negative weights, negative weights and negative cycles | Dijkstra, Bellman–Ford, Floyd–Warshall |
| 04 | [Minimum Spanning Tree](04-mst.md) | Cut property, Kruskal, Prim | Disjoint set union and priority queue implementations |
| 05 | [Algorithms on Trees](05-tree-algorithms.md) | Subtree statistics, tree DP, binary lifting, lowest common ancestor | State computation on trees, LCA |
| 06 | [Range Data Structures](06-range-ds.md) | Fenwick tree, segment tree, lazy tags, sparse table | Range updates and queries |
| 07 | [Monotonic Structures](07-monotonic.md) | Monotonic stack, monotonic queue | Next greater element, window extrema |
| 08 | [String Matching](08-string-matching.md) | Naive matching, prefix function, KMP, Z algorithm | Pattern matching and finding repeated structure |
| 09 | [String Organization](09-trie-hash.md) | Trie, rolling hash, collisions and verification | Prefix queries, substring hashing |
| 10 | [Basic Number Theory](10-number-theory.md) | Divisibility, congruence, GCD, extended GCD, fast exponentiation, sieves | Hand-written implementations of the core algorithms |
| 11 | [Combinatorial Computation](11-combinatorics.md) | Counting principles, binomial coefficients, modular inverses, inclusion–exclusion | Binomial preprocessing and counting |
| 12 | [XOR Applications](12-xor.md) | Odd/even occurrence counts, range XOR, binary trie | Maximum XOR and related queries |

## Writing Conventions

- Give the problem and the interface first, then the implementation;
- The Python version prioritizes expressing the algorithm structure;
- The C++ version demonstrates pointers, memory layout, ownership and resource management;
- Every chapter contains at least: a normal case, boundary cases, complexity analysis and exercises.
