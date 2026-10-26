# Level 8 · Advanced Algorithms and Computational Methods

> **Goal**: combine deeper mathematical tools to analyse algorithmic guarantees and implementation costs.
>
> This chapter table is both the table of contents and the writing order; each chapter will ultimately provide Python / C++ implementations, a running example and boundary cases.

## Chapters

| Chapter | Content outline | Python / C++ implementation |
|---|---|---|
| 01 | [Randomized Algorithm Basics](01-randomized-basics.md) | Probability, expectation, randomized correctness, expected running time | Random experiments and statistical validation |
| 02 | [Randomized Algorithms](02-randomized-algorithms.md) | Randomized selection, reservoir sampling, randomized hashing | Hand-written implementation and repeated experiments |
| 03 | [Advanced DP Optimization](03-advanced-dp-optimization.md) | Divide-and-conquer optimization, convex hull optimization, Knuth optimization and their conditions | Model and optimization implementation |
| 04 | [Advanced Graph Algorithms](04-advanced-graph.md) | Minimum-cost flow, general graph matching | Core algorithm implementation |
| 05 | [Advanced String Structures](05-advanced-string.md) | Suffix automaton, suffix tree | Construction and typical queries |
| 06 | [Dynamic Trees](06-dynamic-trees.md) | Splay tree foundations, dynamic forests, path operations, Link-Cut Tree | Core implementations in both languages |
| 07 | [Fast Transforms](07-fft-ntt.md) | Polynomials, convolution, roots of unity, FFT, NTT | Hand-written transforms and convolution verification |
| 08 | [Foundations of Numerical Computation](08-numerical-basics.md) | Floating-point error, condition number, stability, convergence, stopping criteria | Error and stability experiments |
| 09 | [Numerical Algorithms](09-numerical-algorithms.md) | Bisection root finding, Newton's method, elimination with pivoting, interpolation, numerical integration | Hand-written core algorithm implementations |
| 10 | [Optimization Algorithms](10-optimization.md) | Gradient, convexity, gradient descent, Newton's method, introduction to linear programming | Optimization and convergence experiments |
| 11 | [Large-scale Data Algorithms](11-large-scale.md) | External sorting, Bloom filter, streaming statistics, approximate counting | Chunked file processing and streaming computation |

## Writing Conventions

- Give the problem and the interface first, then the implementation;
- The Python version prioritises expressing the algorithm structure;
- The C++ version demonstrates pointers, memory layout, ownership and resource management;
- Every chapter contains at least: a normal case, boundary cases, complexity analysis and exercises.
