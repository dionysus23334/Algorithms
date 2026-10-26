# 9.6 Algorithm Lower Bounds

> **Level**: Level 9 · Algorithm Theory and Computational Limits  
> **Status**: Expanded.

## Learning Objectives

- Prove the comparison-sorting lower bound with decision trees;
- Understand the adversary argument;
- Distinguish "lower bound" from "optimal algorithm".

## Comparison-Sorting Lower Bound

The decision tree of comparison sorting has \(n!\) leaves; the height of a binary tree is at least \(\log_2(n!)=\Omega(n\log n)\).

Therefore any comparison-based sort requires at least \(\Omega(n\log n)\) comparisons in the worst case.

## Counting Comparisons

```python
def insertion_sort_count(a: list[int]) -> tuple[list[int], int]:
    a = a[:]
    cmp = 0
    for i in range(1, len(a)):
        x = a[i]
        j = i - 1
        while j >= 0:
            cmp += 1
            if a[j] <= x:
                break
            a[j+1] = a[j]
            j -= 1
        a[j+1] = x
    return a, cmp
```

For a reverse-ordered array the number of comparisons is \(\Theta(n^2)\); a lower bound only states "at least", not that some algorithm attains it.

## Adversary Argument

The adversary answers each query so that the algorithm keeps as many possibilities as possible; if only a constant fraction can be eliminated each time, at least \(\Omega(\log N)\) queries are needed.

## Other Lower Bounds

- Searching an unordered array: \(\Omega(n)\);
- Finding the maximum in the comparison model: \(n-1\) comparisons;
- Some data-structure operations have amortised lower bounds.

## C++ Comparison Counting

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{5,4,3,2,1};
    int cmp = 0;
    std::sort(a.begin(), a.end(), [&](int x, int y) { ++cmp; return x < y; });
    std::cout << cmp << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Non-comparison sorting | the lower bound does not apply |
| Worst case/average case | lower bounds usually refer to the worst case |
| Model | RAM/comparison/Turing machine differ |
| Lower-bound proof | is not the same as an algorithm implementation |

## Exercises

1. Prove the lower bound for searching an unordered array with a decision tree.
2. Explain why counting sort does not violate \(\Omega(n\log n)\).
3. Design an adversary strategy to prove a lower bound for some problem.

## Sources

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## Navigation

[← Previous](05-np-complete.md) · [Level Overview](index.md) · [Next](07-approximation.md)
