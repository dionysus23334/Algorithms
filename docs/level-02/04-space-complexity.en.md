# 2.4 Space Complexity

> **Level**: Level 2 · Foundations of Algorithm Analysis  
> **Status**: Expanded.

## Learning Objectives

- Distinguish input space, auxiliary space and output space;
- Estimate the extra space of arrays, recursion stacks, hash tables and matrices;
- Know that "in place" does not mean "zero space".

## Auxiliary Space

Space complexity usually refers to **auxiliary space**: the memory used in addition to the input and output.

- Reversing an array in place: \(O(1)\) auxiliary space;
- Copying an array: \(O(n)\);
- Recursion depth \(n\): a call stack of \(O(n)\);
- An \(n\times m\) matrix: \(O(nm)\).

## Code Comparison

```python
def reverse_in_place(a: list[int]) -> None:
    i, j = 0, len(a) - 1
    while i < j:
        a[i], a[j] = a[j], a[i]
        i += 1
        j -= 1

def reverse_copy(a: list[int]) -> list[int]:
    return a[::-1]
```

C++:

```cpp
#include <algorithm>
#include <vector>

void reverse_in_place(std::vector<int>& a) {
    int i = 0, j = static_cast<int>(a.size()) - 1;
    while (i < j) std::swap(a[i++], a[j--]);
}

std::vector<int> reverse_copy(const std::vector<int>& a) {
    std::vector<int> b(a.rbegin(), a.rend());
    return b;
}
```

## The Recursion Stack

```python
def sum_recursive(a: list[int], i: int = 0) -> int:
    if i == len(a):
        return 0
    return a[i] + sum_recursive(a, i + 1)
```

With recursion depth \(n\), each level stores its parameters and return address, so the auxiliary space is \(O(n)\). Rewriting it as a loop reduces this to \(O(1)\).

## Hash Tables and Strings

- Python `dict`/`set` use \(O(n)\) extra space on average, with load-factor and object overhead;
- C++ `unordered_map` has bucket-array and node overhead;
- String concatenation creates new objects; concatenating in a loop may accumulate \(O(n^2)\) temporary space.

## Trading Space for Time

A prefix sum uses \(O(n)\) space to reduce a range query from \(O(n)\) to \(O(1)\). This is a typical trade-off; it is not that "less space is always better".

## Boundaries and Pitfalls

| Scenario | Caveat |
|---|---|
| Recursion depth \(10^5\) | Python may raise `RecursionError`; C++ may overflow the stack |
| 2D arrays | `n*m` may be very large; use adjacency lists for sparse data |
| Slicing/copying | Python slicing creates a new list, not a view |
| In-place algorithms | May still use an \(O(\log n)\) stack or \(O(1)\) temporaries |

## Exercises

1. Compare the space usage of the in-place and copying versions of array reversal.
2. Write an \(O(1)\) auxiliary-space "remove duplicates from a sorted array".
3. Analyze the auxiliary space of merge sort and explain why it is not strictly in-place.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## Navigation

[← Previous](03-time-complexity.md) · [Level Overview](index.md) · [Next](05-correctness.md)
