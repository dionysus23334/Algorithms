# 2.3 Time Complexity

> **Level**: Level 2 · Foundations of Algorithm Analysis  
> **Status**: Expanded.

## Learning Objectives

- Use \(O,\Omega,\Theta\) to describe asymptotic upper bounds, lower bounds and tight bounds;
- Identify constant, logarithmic, linear, linearithmic, quadratic and exponential growth;
- Know that complexity notation drops constants but not the input size.

## Definitions

For non-negative functions \(f,g\):

- \(f(n)=O(g(n))\): there exist \(c>0,n_0\) such that \(f(n)\le cg(n)\) for \(n\ge n_0\);
- \(f(n)=\Omega(g(n))\): there exist \(c>0,n_0\) such that \(f(n)\ge cg(n)\);
- \(f(n)=\Theta(g(n))\): it is both \(O\) and \(\Omega\).

\(O\) is an upper bound, not an "exact time". Saying "this algorithm is \(O(n^2)\)" does not rule out that it is actually \(O(n)\).

## Common Growth Rates

| Complexity | Typical source | Intuition at \(n=10^6\) |
|---|---|---|
| \(O(1)\) | array indexing, hash average | extremely fast |
| \(O(\log n)\) | binary search, balanced tree | about 20 iterations |
| \(O(n)\) | a single pass | \(10^6\) |
| \(O(n\log n)\) | merge/heap sort | about \(2\times10^7\) |
| \(O(n^2)\) | nested loops | \(10^{12}\), usually unacceptable |
| \(O(2^n)\) | subset enumeration | only for very small inputs |

## Code Comparison

```python
def constant(a: list[int]) -> int:
    return a[0] if a else -1

def linear(a: list[int]) -> int:
    total = 0
    for x in a:
        total += x
    return total

def quadratic(a: list[int]) -> int:
    count = 0
    for i in range(len(a)):
        for j in range(i + 1, len(a)):
            count += 1
    return count

def logarithmic(n: int) -> int:
    steps = 0
    while n > 1:
        n //= 2
        steps += 1
    return steps
```

C++:

```cpp
#include <vector>

long long linear(const std::vector<int>& a) {
    long long total = 0;
    for (int x : a) total += x;
    return total;
}

long long quadratic(const std::vector<int>& a) {
    long long count = 0;
    for (int i = 0; i < static_cast<int>(a.size()); ++i)
        for (int j = i + 1; j < static_cast<int>(a.size()); ++j)
            ++count;
    return count;
}
```

## How to Count Nested Loops

```text
for i in 1..n:
    for j in 1..i:
        op
```

The count is \(\sum_{i=1}^n i=n(n+1)/2=\Theta(n^2)\).

```text
for i in 1..n:
    for j in 1..n step i:
        op
```

The count is \(n\sum_{i=1}^n 1/i=\Theta(n\log n)\) (harmonic series).

## Recursive Complexity

- \(T(n)=T(n-1)+O(1)\): \(O(n)\);
- \(T(n)=T(n/2)+O(1)\): \(O(\log n)\);
- \(T(n)=2T(n/2)+O(n)\): \(O(n\log n)\);
- \(T(n)=2T(n-1)+O(1)\): \(O(2^n)\).

## Boundaries and Pitfalls

- Do not take the number of loop levels as the complexity; look at the count at each level;
- The average case requires a probability assumption and cannot be assumed by default;
- For recursion, count the call stack in the space usage;
- An \(O(n)\) algorithm with a large constant may be slower than an \(O(n\log n)\) algorithm with a small constant;
- Complexity is asymptotic; measure small scales in practice.

## Exercises

1. Determine the \(O,\Omega,\Theta\) of \(3n^2+5n+7\).
2. Analyze the complexity of `for i in range(n): for j in range(0,n,i+1)`.
3. Prove that \(n!=\Omega(2^n)\) and explain what this means for enumeration algorithms.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](02-operation-count.md) · [Level Overview](index.md) · [Next](04-space-complexity.md)
