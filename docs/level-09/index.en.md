# Level 9 · Algorithm Theory and Computational Limits

> **Goal**: understand whether a problem is solvable, its resource limits, and the meaning of approximation and randomization.
>
> **Status**: all 10 chapters of Level 9 are expanded; each chapter contains Python / C++ implementations, complexity, boundary cases and exercises.

## Chapters

| Chapter | Content outline | Python / C++ implementation |
|---|---|---|
| 01 | [Computational Models](01-computation-models.md) | RAM model, Turing machine, encoding, input length, bit complexity | Simple computational-model simulation |
| 02 | [Computability](02-computability.md) | Decidability, recognizability, halting problem, undecidability | Finite execution process demonstration, together with theoretical proofs |
| 03 | [Problem Reductions](03-reductions.md) | Reduction direction, construction, polynomial-time reduction | Small-scale reduction instances |
| 04 | [Complexity Classes](04-complexity-classes.md) | Decision problems, P, NP, verification and solving, NP-hard and NP-complete | Certificate verification compared with exhaustive search |
| 05 | [NP-Complete Problems](05-np-complete.md) | SAT, 3-SAT, clique, vertex cover, subset sum | Small-scale solvers and reduction examples |
| 06 | [Algorithm Lower Bounds](06-lower-bounds.md) | Decision trees, comparison-sorting lower bounds, adversary arguments | Comparison counts and decision-process demonstration |
| 07 | [Approximation Algorithms](07-approximation.md) | Approximation ratio, greedy approximation, relaxation and rounding | Approximate solutions compared with optimal solutions |
| 08 | [Online Algorithms](08-online.md) | Online decisions, competitive analysis, caching, scheduling | Cache replacement and scheduling simulation |
| 09 | [Parameterized Algorithms](09-parameterized.md) | Parameters, fixed-parameter tractability, search trees, kernelization | Parameterized search examples |
| 10 | [Theory of Randomized Computation](10-randomized-theory.md) | Monte Carlo, Las Vegas, error-probability amplification | Experiments on repeated runs and error rates |

## Writing Conventions

- Give the problem and the interface first, then the implementation;
- The Python version prioritises expressing the algorithm structure;
- The C++ version demonstrates pointers, memory layout, ownership and resource management;
- Every chapter contains at least: a normal case, boundary cases, complexity analysis and exercises.
