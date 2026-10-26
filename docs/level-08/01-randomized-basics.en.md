# 8.1 Foundations of Randomized Algorithms

> **Level**: Level 8 · Advanced Algorithms and Computational Methods  
> **Status**: Expanded.

## Learning Objectives

- Analyse algorithms with random variables and expectation;
- Distinguish Monte Carlo from Las Vegas;
- Bound deviations with Markov/Chebyshev.

## Linearity of Expectation

\[
E\left[\sum_i X_i\right]=\sum_i E[X_i]
\]

The \(X_i\) need not be independent. The analysis of many randomized algorithms starts here.

## Indicator Variables

The indicator variable \(I_A\) of an event \(A\) satisfies \(E[I_A]=P(A)\). For example, in a random permutation the probability that "position \(i\) holds a given element" is \(1/n\).

## Concentration Inequalities

- Markov: \(P(X\ge a)\le E[X]/a\) (\(X\ge0\));
- Chebyshev: \(P(|X-E[X]|\ge a)\le \operatorname{Var}(X)/a^2\);
- Chernoff: exponential tail decay for sums of independent variables.

## Two Kinds of Randomized Algorithms

- **Monte Carlo**: deterministic running time, possibly wrong result; repeating the run lowers the error rate;
- **Las Vegas**: always-correct result, random running time; for example randomized quicksort.

```python
import random

def monte_carlo_pi(n: int) -> float:
    inside = 0
    for _ in range(n):
        x, y = random.random(), random.random()
        if x*x + y*y <= 1.0:
            inside += 1
    return 4.0 * inside / n
```

## C++ Random Experiment

```cpp
#include <iostream>
#include <random>

int main() {
    std::mt19937 rng(12345);
    std::uniform_real_distribution<double> u(0.0, 1.0);
    int inside = 0, n = 1000000;
    for (int i = 0; i < n; ++i) {
        double x = u(rng), y = u(rng);
        if (x*x + y*y <= 1.0) ++inside;
    }
    std::cout << 4.0 * inside / n << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Random seed | Fixing it makes runs reproducible; production uses true randomness/system entropy |
| Sample size | Error is about \(O(1/\sqrt n)\) |
| Independence | Many bounds require independence |
| Error rate | Repeating \(k\) times lowers it exponentially |

## Exercises

1. Use Chebyshev to bound the error of the Monte Carlo estimate of π.
2. Design a Las Vegas algorithm and analyse its expected time.
3. Explain why "a randomized test passes" does not mean the algorithm is correct.

## Sources

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)
- [MMDS](https://www.mmds.org/)

## Navigation

[← Level Overview](index.md) · [Next](02-randomized-algorithms.md)
