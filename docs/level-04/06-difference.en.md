# 4.6 Difference Arrays

> **Level**: Level 4 · Basic Algorithms and Techniques  
> **Status**: expanded.

## Learning Objectives

- Use difference arrays for range addition;
- Recover the array via prefix sums;
- Handle one-dimensional and two-dimensional range updates.

## One-Dimensional Difference

To add \(v\) to the range \([l,r)\):

```text
diff[l] += v
diff[r] -= v
```

Finally take the prefix sum to obtain the total increment at each position.

```python
def range_add(n: int, ops: list[tuple[int,int,int]]) -> list[int]:
    diff = [0] * (n + 1)
    for l, r, v in ops:
        diff[l] += v
        diff[r] -= v
    out = [0] * n
    cur = 0
    for i in range(n):
        cur += diff[i]
        out[i] = cur
    return out
```

The \(q\) updates cost \(O(q)\), and recovery costs \(O(n)\).

## Two-Dimensional Difference

To add \(v\) to the submatrix from \((r_1,c_1)\) to \((r_2,c_2)\) (bottom-right excluded):

```text
diff[r1][c1] += v
diff[r2][c1] -= v
diff[r1][c2] -= v
diff[r2][c2] += v
```

Then take the two-dimensional prefix sum.

## C++ One-Dimensional

```cpp
#include <iostream>
#include <vector>

int main() {
    int n = 5;
    std::vector<int> diff(n + 1, 0);
    auto add = [&](int l, int r, int v) { diff[l] += v; diff[r] -= v; };
    add(1, 4, 2);
    add(2, 5, 3);
    int cur = 0;
    for (int i = 0; i < n; ++i) {
        cur += diff[i];
        std::cout << cur << ' ';
    }
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| \(r=n\) | the difference array must be allocated with size \(n+1\) |
| Empty range | when \(l==r\) the addition and the subtraction cancel out |
| Multiple updates | record them all first, then recover everything at once |
| Large values | use `long long` |

## Exercises

1. Implement the two-dimensional difference array and output the final matrix.
2. Use a difference array to count how many ranges cover each position.
3. Compare the trade-offs between difference arrays and segment trees for range addition with point queries.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## Navigation

[← Previous](05-prefix-sum.md) · [Level Overview](index.md) · [Next](07-two-pointers.md)
