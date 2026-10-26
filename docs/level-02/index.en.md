# Level 2 · Foundations of Algorithm Analysis

> **Goal**: understand correctness and efficiency, and be able to compare different solutions.
>
> This chapter table is the table of contents and the writing order; each chapter will ultimately provide dual-language Python / C++ implementations, running examples and boundary cases.

## Chapters

| Chapter | Content outline | Python / C++ implementation |
|---|---|---|
| 01 | [Problem Definition](01-problem-definition.md) | Input/output, constraints, preconditions, valid results | Function contracts and input checks |
| 02 | [Operation Count](02-operation-count.md) | Input size, loop counts, halving the size | Operation counting |
| 03 | [Time Complexity](03-time-complexity.md) | Constant, logarithmic, linear, linearithmic, quadratic and exponential growth | Comparison of programs with different complexities |
| 04 | [Space Complexity](04-space-complexity.md) | Auxiliary space, in-place modification, copy overhead | Comparison of storage schemes |
| 05 | [Introduction to Correctness](05-correctness.md) | Counterexamples, loop invariants, termination | Analysis of search and extremum algorithms |
| 06 | [Testing and Verification](06-testing.md) | Normal cases, boundary cases, randomized stress testing | Comparison of naive and optimized solutions |
| 07 | [Performance Measurement](07-performance.md) | Theoretical complexity versus actual running time, input distribution | timeit / chrono |

## Writing conventions

- Give the problem and the interface first, then the implementation;
- The Python version prioritizes expressing the algorithm structure;
- The C++ version demonstrates pointers, memory layout, ownership and resource management;
- Each chapter contains at least: normal cases, boundary cases, complexity analysis, and exercises.
