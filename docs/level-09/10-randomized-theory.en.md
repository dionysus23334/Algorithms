# 9.10 Theory of Randomized Computation

> **Level**: Level 9 · Algorithm Theory and Computational Limits  
> **Status**: Expanded.

## Learning Objectives

- Distinguish Monte Carlo / Las Vegas;
- Define RP, BPP, ZPP;
- Lower the error rate by repeating the majority vote.

## Classes

- **RP**: polynomial time; when the correct answer is "yes" it accepts with probability at least \(1/2\); on "no" it always rejects;
- **coRP**: one-sided guarantee for "no";
- **ZPP**: Las Vegas, expected polynomial time, always-correct result;
- **BPP**: two-sided error, error rate \(\le1/3\).

\[
RP\subseteq BPP,\qquad ZPP=RP\cap coRP.
\]

## Error Amplification

If the single-run error rate is \(p<1/2\), independently repeating \(2t+1\) times and taking the majority makes the error rate decrease exponentially (Chernoff).

```python
import random

def majority_vote(f, trials: int = 101) -> bool:
    return sum(f() for _ in range(trials)) * 2 > trials
```

## Example: Randomized Primality Testing

Miller–Rabin is Monte Carlo: a composite number may be misjudged as prime, and repeating \(k\) times lowers the error rate to \(4^{-k}\).

## C++ Repeated Experiment

```cpp
#include <iostream>
#include <random>

int main() {
    std::mt19937 rng(12345);
    std::bernoulli_distribution coin(0.5);
    int yes = 0, trials = 10000;
    for (int i = 0; i < trials; ++i) yes += coin(rng);
    std::cout << static_cast<double>(yes) / trials << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| One-sided / two-sided | The error direction differs |
| Independence | Repetition must be independent |
| Randomness source | Pseudorandom vs true randomness |
| Derandomization | Some problems can be made deterministic |

## Exercises

1. Prove that repeating the majority vote lowers the error rate exponentially.
2. Explain the relationship between ZPP and Las Vegas.
3. Test a large integer repeatedly with Miller–Rabin.

## Sources

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](09-parameterized.md) · [Level Overview](index.md)
