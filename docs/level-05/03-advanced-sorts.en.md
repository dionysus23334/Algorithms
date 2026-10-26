# 5.3 Advanced Sorting

> **Level**: Level 5 · Core Algorithm Design Methods  
> **Status**: Expanded.

## Learning Objectives

- Implement heapsort, counting sort and radix sort;
- Know the comparison-sorting lower bound and when each method applies;
- Distinguish stability from extra space.

## Heapsort

```python
def heap_sort(a: list[int]) -> None:
    n = len(a)
    def sift(i: int, size: int) -> None:
        while True:
            l, r = 2 * i + 1, 2 * i + 2
            largest = i
            if l < size and a[l] > a[largest]: largest = l
            if r < size and a[r] > a[largest]: largest = r
            if largest == i: break
            a[i], a[largest] = a[largest], a[i]
            i = largest

    for i in range(n // 2 - 1, -1, -1):
        sift(i, n)
    for end in range(n - 1, 0, -1):
        a[0], a[end] = a[end], a[0]
        sift(0, end)
```

Time \(O(n\log n)\), space \(O(1)\), not stable.

## Counting Sort

For integers with value range \([0,k]\):

```python
def counting_sort(a: list[int], k: int) -> list[int]:
    count = [0] * (k + 1)
    for x in a:
        count[x] += 1
    for i in range(1, k + 1):
        count[i] += count[i - 1]
    out = [0] * len(a)
    for x in reversed(a):          # filling in reverse order keeps it stable
        count[x] -= 1
        out[count[x]] = x
    return out
```

Time \(O(n+k)\), space \(O(n+k)\); the value range must not be too large.

## Radix Sort

Run a stable counting sort from the least significant digit to the most significant one; for \(d\) digits with base \(B\):

\[
O(d(n+B)).
\]

Suitable for integers or strings with a fixed bit width.

## C++ Counting Sort

```cpp
#include <vector>

std::vector<int> counting_sort(const std::vector<int>& a, int k) {
    std::vector<int> count(k + 1, 0), out(a.size());
    for (int x : a) ++count[x];
    for (int i = 1; i <= k; ++i) count[i] += count[i - 1];
    for (int i = static_cast<int>(a.size()) - 1; i >= 0; --i) {
        out[--count[a[i]]] = a[i];
    }
    return out;
}
```

## Comparison-Sorting Lower Bound

Comparison-based sorting needs at least \(\Omega(n\log n)\) comparisons; counting sort and radix sort exploit the structure of the keys and thereby bypass the comparison model.

## Boundary Cases

| Case | Note |
|---|---|
| Large value range | counting sort blows up in space |
| Negative numbers | offset first, or switch to another sort |
| Stability | counting sort is stable only when filled in reverse order |
| Floating point | counting/radix sort do not directly apply |

## Exercises

1. Implement heapsort and verify the max-heap property.
2. Handle negative numbers with counting sort.
3. Compare the running time of `sort`, heapsort and counting sort on suitable data.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Previous](02-recursion-complexity.md) · [Level Overview](index.md) · [Next](04-backtracking.md)
