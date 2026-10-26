# 2.1 Problem Definition

> **Level**: Level 2 · Foundations of Algorithm Analysis  
> **Status**: Expanded.

## Learning Objectives

- Write a natural-language problem as inputs, outputs, constraints and valid results;
- Describe a function contract with preconditions/postconditions;
- Find ambiguities and boundary cases before implementation.

## A Complete Problem Definition

Take "range sum" as an example:

- **Input**: an integer array \(a\) and indices \(l,r\) with \(0\le l\le r<n\);
- **Output**: \(\sum_{i=l}^{r} a_i\);
- **Constraints**: \(n\le 10^5\), \(|a_i|\le 10^9\);
- **Valid results**: the range sum, which may exceed a 32-bit integer;
- **Invalid inputs**: an empty array, \(l>r\), out of bounds.

Without these conventions, a program that merely "runs" still does not show that it is correct.

## Function Contract

```text
range_sum(a, l, r)
pre:  0 <= l <= r < len(a)
post: returns sum(a[l:r+1])
```

When a precondition is violated, the function may choose to:

1. throw an exception;
2. return an error code/`None`;
3. fail an assertion (development only).

The choice must be consistent and documented clearly.

## Python Implementation

```python
def range_sum(a: list[int], l: int, r: int) -> int:
    """Return sum(a[l:r+1]); raise ValueError on invalid bounds."""
    if not (0 <= l <= r < len(a)):
        raise ValueError(f"invalid range [{l}, {r}] for length {len(a)}")
    total = 0
    for i in range(l, r + 1):
        total += a[i]
    return total


if __name__ == "__main__":
    a = [3, -1, 4, 1, 5]
    print(range_sum(a, 1, 3))  # 4
```

## C++ Implementation

```cpp
#include <iostream>
#include <stdexcept>
#include <vector>

long long range_sum(const std::vector<int>& a, int l, int r) {
    if (!(0 <= l && l <= r && r < static_cast<int>(a.size()))) {
        throw std::out_of_range("invalid range");
    }
    long long total = 0;
    for (int i = l; i <= r; ++i) total += a[i];
    return total;
}

int main() {
    std::vector<int> a{3, -1, 4, 1, 5};
    std::cout << range_sum(a, 1, 3) << '\n'; // 4
}
```

## How Constraints Affect the Implementation

- If \(n\le 10^5\), a single \(O(n)\) sum is acceptable;
- If \(10^5\) range queries are needed, a single \(O(n)\) sum becomes \(O(nq)\), so a prefix sum should be used;
- If \(|a_i|\le10^9\) and \(n\le10^5\), a range sum can reach \(10^{14}\), so C++ must use `long long`.

## Boundary Cases

| Input | Expected |
|---|---|
| `l=r` | sum of a single element |
| `a=[]` | invalid, throw an exception |
| `l<0` or `r>=n` | invalid |
| `l>r` | invalid; must not silently return 0 |

## Exercises

1. Write a complete problem definition for "find the k-th smallest element", specifying duplicate values and the range of \(k\).
2. Change `range_sum` to return `(sum, ok)`, and compare the exception style with the return-code style.
3. Design a case where the input is valid but the result overflows, and explain why constraints must be written down.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)

## Navigation

[← Level Overview](index.md) · [Next](02-operation-count.md)
