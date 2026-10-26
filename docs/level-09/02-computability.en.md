# 9.2 Computability

> **Level**: Level 9 · Algorithm Theory and Computational Limits  
> **Status**: Expanded.

## Learning Objectives

- Distinguish decidable from recognizable;
- Understand that the halting problem is undecidable;
- Construct counterexamples with the diagonal method.

## Decidable and Recognizable

- **Decidable**: there is an algorithm that, for every input, outputs yes/no within finitely many steps;
- **Recognizable**: there is an algorithm that eventually halts and accepts on "yes" instances; on "no" instances it may not halt.

The halting problem is the typical example of a problem that is recognizable but undecidable.

## The Halting Problem

Suppose there is a `halt(P, x)` that decides whether program `P` halts on input `x`. Construct:

```python
def paradox(P):
    if halt(P, P):
        while True:
            pass
    else:
        return
```

Calling `paradox(paradox)` derives a contradiction: if it halts then it does not halt, and if it does not halt then it halts.

## The Diagonal Method

Arrange all programs by input into a table, construct a program whose row is the opposite of the diagonal, and thereby prove that no computable enumeration covers all functions.

## C++ Demonstration of Undecidability

It is impossible to write a halting decider in C++ that is "correct for all programs"; any implementation fails, or fails to halt, on some class of inputs. The "simulation" below is only valid for finitely many steps:

```cpp
#include <iostream>

int main() {
    // A finite-step simulation cannot decide "never halts".
    for (int step = 0; step < 1000; ++step) {
        // simulate one step
    }
    std::cout << "unknown after 1000 steps\n";
}
```

## Reductions and Undecidability

If \(A\) is decidable and \(B\le A\), then \(B\) is decidable; conversely, if \(B\) is undecidable and \(B\le A\), then \(A\) is undecidable.

## Boundary Cases

| Concept | Note |
|---|---|
| Not halting | cannot be settled by "running it a little longer" |
| Recognizable | only guarantees halting on the "yes" side |
| Reduction direction | reduce from a known undecidable problem to the target |
| Real programs | type checking/termination analysis are approximations |

## Exercises

1. Prove that "the program outputs 42" is undecidable.
2. Explain the difference between decidable and recognizable.
3. Use the diagonal method to prove that uncomputable functions exist.

## Sources

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Foundations of Computation](https://math.hws.edu/FoundationsOfComputation/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](01-computation-models.md) · [Level Overview](index.md) · [Next](03-reductions.md)
