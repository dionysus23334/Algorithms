# Level 5 · Core Algorithm Design Methods

> **Goal**: be able to derive a solution and explain why the algorithm is correct.
>
> This chapter table defines the table of contents and the writing order; every chapter ultimately provides dual Python / C++ implementations, running examples and boundary cases.

## Chapters

| Chapter | Content outline | Python / C++ implementation |
|---|---|---|
| 01 | [Divide and Conquer](01-divide-conquer.md) | Partition, recursive solving, merge | Merge sort, quicksort, quickselect |
| 02 | [Recursion Complexity](02-recursion-complexity.md) | Recurrences, recursion trees, substitution method, introduction to the master theorem | Call-count and level statistics |
| 03 | [Advanced Sorting](03-advanced-sorts.md) | Heapsort, counting sort, radix sort; applicable conditions | Hand-written implementations in both languages |
| 04 | [Backtracking](04-backtracking.md) | State, choice, undo, result collection | Subsets, permutations, combinations, N-Queens |
| 05 | [Pruning and Deduplication](05-pruning-dedup.md) | Feasibility pruning, repeated choices, search order | Constrained combinatorial search |
| 06 | [Greedy](06-greedy.md) | Local choice, exchange argument, failure counterexamples | Interval scheduling, Huffman coding |
| 07 | [Introduction to Dynamic Programming](07-dp-intro.md) | State, transition, boundary, order, memoization | Grid paths, memoized search |
| 08 | [Knapsack Problems](08-knapsack.md) | 0/1 knapsack, unbounded knapsack, space optimization | Two-dimensional and one-dimensional implementations |
| 09 | [Sequence Dynamic Programming](09-sequence-dp.md) | Longest increasing subsequence, longest common subsequence, edit distance | State computation and solution reconstruction |
| 10 | [Synthesis of Methods](10-synthesis.md) | Binary search on the answer, prefix sums and hashing, sorting and greedy | Implementations for combined problems |

## Writing Conventions

- Give the problem and the interface first, then the implementation;
- The Python version prioritizes expressing the algorithm structure;
- The C++ version demonstrates pointers, memory layout, ownership and resource management;
- Every chapter contains at least: normal cases, boundary cases, complexity analysis, exercises.
