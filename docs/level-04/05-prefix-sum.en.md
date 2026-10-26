# 4.5 Prefix Sum

> **Level**: Level 4 · Basic Algorithms and Techniques  
> **Status**: expanded.

## Learning Objectives

- Use prefix sums to reduce range queries to \(O(1)\);
- Handle one and two dimensions;
- Watch out for indices and empty ranges.

## One-Dimensional Prefix Sum

Definition

\[
S[0]=0,\qquad S[i+1]=S[i]+a[i].
\]

Then

\[
\sum_{i=l}^{r-1}a[i]=S[r]-S[l].
\]

```python
def build_prefix(a: list[int]) -> list[int]:
    s = [0] * (len(a) + 1)
    for i, x in enumerate(a):
        s[i + 1] = s[i] + x
    return s

def range_sum(s: list[int], l: int, r: int) -> int:
    """sum(a[l:r]), 0 <= l <= r <= n"""
    return s[r] - s[l]
```

Building the table costs \(O(n)\), a query costs \(O(1)\), and the space is \(O(n)\).

## Two-Dimensional Prefix Sum

\[
S[i+1][j+1]=S[i][j+1]+S[i+1][j]-S[i][j]+a[i][j].
\]

The sum over the submatrix from \((r_1,c_1)\) to \((r_2,c_2)\) (bottom-right excluded):

\[
S[r_2][c_2]-S[r_1][c_2]-S[r_2][c_1]+S[r_1][c_1].
\]

```python
def build_2d(a: list[list[int]]) -> list[list[int]]:
    n, m = len(a), len(a[0]) if a else 0
    s = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n):
        for j in range(m):
            s[i + 1][j + 1] = s[i][j + 1] + s[i + 1][j] - s[i][j] + a[i][j]
    return s
```

## C++ One-Dimensional

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{3, 1, 4, 1, 5};
    std::vector<long long> s(a.size() + 1, 0);
    for (std::size_t i = 0; i < a.size(); ++i) s[i + 1] = s[i] + a[i];
    int l = 1, r = 4; // [1,4)
    std::cout << s[r] - s[l] << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty array | the prefix sum has length 1; a query returns 0 |
| `l==r` | empty range, returns 0 |
| Negative numbers | the prefix sum is not necessarily monotone, but subtraction still works |
| Large sums | use `long long` in C++ |

## Exercises

1. Use a prefix sum to count the positive numbers in an array.
2. Implement two-dimensional submatrix sums.
3. Use a prefix sum plus hashing to find "the number of subarrays with sum k".

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## Navigation

[← Previous](04-binary-search.md) · [Level Overview](index.md) · [Next](06-difference.md)
