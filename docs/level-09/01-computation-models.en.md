# 9.1 Computational Models

> **Level**: Level 9 · Algorithm Theory and Computational Limits  
> **Status**: Expanded.

## Learning Objectives

- Distinguish the RAM model from the Turing machine;
- Understand input encoding and input length;
- Distinguish unit cost from bit cost.

## Why a Computation Model Is Needed

"How much time does an algorithm need" requires the machine model to be pinned down first. The \(\Omega(n\log n)\) bound for comparison sorting holds under the **comparison model**; a Turing machine's complexity is counted in tape operations.

## The RAM Model

- Unlimited registers, arithmetic/memory access in \(O(1)\);
- Suited to analysing arrays, pointers and hash tables;
- Large-integer arithmetic should not be assumed \(O(1)\).

## Turing Machine

- A finite-state controller plus an infinite tape;
- Each step reads/writes one cell and moves one position;
- It is the standard model for defining computability and complexity.

```python
# A "tape" simulation performing only addition: unary is far too inefficient, so only the head is shown.
def tm_add_unary(a: int, b: int) -> int:
    tape = ["1"] * a + ["+"] + ["1"] * b
    head = 0
    while tape[head] != "+":
        head += 1
    tape[head] = "1"
    return sum(1 for x in tape if x == "1")
```

A real Turing machine needs a state transition table; here Python is used to simulate the idea of a tape.

## Input Length

- The input length of an integer \(n\) is \(\lceil\log_2(n+1)\rceil\), not 1;
- "Polynomial time" means polynomial in the number of input bits / the size of the graph;
- Pseudo-polynomial algorithms (such as the \(O(nW)\) knapsack) may be exponential in the binary length of \(W\).

## Bit Complexity

The cost of large-integer addition/multiplication and of matrix operations depends on the bit width; this matters especially in cryptography.

## C++ Bit Widths

```cpp
#include <iostream>
#include <limits>

int main() {
    std::cout << sizeof(int) * 8 << ' ' << sizeof(long long) * 8 << '\n';
    std::cout << std::numeric_limits<unsigned long long>::max() << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Large integers | bit cost |
| Hash tables | the RAM assumption |
| Turing machine | enormous constant factor |
| Input encoding | unary vs binary |

## Exercises

1. Explain why "adding \(n\)-bit integers is \(O(n)\)".
2. Put bubble sort on a Turing machine and estimate the complexity.
3. Explain the difference between pseudo-polynomial time and polynomial time.

## Sources

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Foundations of Computation](https://math.hws.edu/FoundationsOfComputation/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Level Overview](index.md) · [Next](02-computability.md)
