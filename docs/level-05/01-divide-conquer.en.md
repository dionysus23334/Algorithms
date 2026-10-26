# 5.1 Divide and Conquer

> **Level**: Level 5 · Core Algorithm Design Methods  
> **Status**: Expanded.

## Learning Objectives

- Split a problem into subproblems, solve them recursively, and merge the results;
- Get the boundary and merge steps of divide and conquer right;
- Analyze the recursive complexity of divide and conquer.

## Three Steps

1. **Divide**: split an instance of size \(n\) into several subproblems of smaller size;
2. **Recurse**: solve each of them separately;
3. **Merge**: combine the subproblem results into the result for the original problem.

Divide and conquer is not "recursing however you like"; the key is that the subproblems are independent, the size strictly decreases, and the merge is correct.

## Merge Sort

```python
def merge_sort(a: list[int]) -> list[int]:
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    return merge(left, right)

def merge(a: list[int], b: list[int]) -> list[int]:
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:]); out.extend(b[j:])
    return out
```

Time \(T(n)=2T(n/2)+O(n)=O(n\log n)\), space \(O(n)\).

## Quicksort

```python
def quick_sort(a: list[int], lo: int, hi: int) -> None:
    if lo >= hi:
        return
    p = partition(a, lo, hi)
    quick_sort(a, lo, p - 1)
    quick_sort(a, p + 1, hi)

def partition(a: list[int], lo: int, hi: int) -> int:
    pivot = a[hi]
    i = lo
    for j in range(lo, hi):
        if a[j] <= pivot:
            a[i], a[j] = a[j], a[i]
            i += 1
    a[i], a[hi] = a[hi], a[i]
    return i
```

Average \(O(n\log n)\), worst case \(O(n^2)\) (already sorted with a fixed last-element pivot).

## Quickselect

Find the \(k\)-th smallest element: recurse only into the side that contains \(k\); average \(O(n)\), worst case \(O(n^2)\).

## C++ Merge

```cpp
#include <vector>

std::vector<int> merge_sort(const std::vector<int>& a) {
    if (a.size() <= 1) return a;
    auto mid = a.begin() + a.size() / 2;
    std::vector<int> left(a.begin(), mid), right(mid, a.end());
    left = merge_sort(left);
    right = merge_sort(right);
    std::vector<int> out;
    std::merge(left.begin(), left.end(), right.begin(), right.end(), std::back_inserter(out));
    return out;
}
```

## Boundary Cases

| Case | Note |
|---|---|
| Empty / single element | return directly |
| Many duplicates | three-way partitioning avoids degeneration |
| Recursion depth | worst case \(O(n)\) |
| Merge space | merge sort needs an extra \(O(n)\) |

## Exercises

1. Find the maximum value of an array with divide and conquer.
2. Implement three-way quicksort.
3. Use quickselect to find the k-th smallest element, and analyze the worst case.

## Sources

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)

## Navigation

[← Level Overview](index.md) · [Next](02-recursion-complexity.md)
