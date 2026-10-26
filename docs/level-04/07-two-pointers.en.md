# 4.7 Two Pointers

> **Level**: Level 4 · Basic Algorithms and Techniques  
> **Status**: expanded.

## Learning Objectives

- Use converging two pointers to find pairs in a sorted array;
- Use same-direction two pointers for deduplication/merging;
- Explain why the pointer movements do not miss any solution.

## Converging Two Pointers: Two Sum

Find two numbers in a sorted array whose sum is target:

```python
def two_sum_sorted(a: list[int], target: int) -> tuple[int,int] | None:
    i, j = 0, len(a) - 1
    while i < j:
        s = a[i] + a[j]
        if s == target:
            return i, j
        if s < target:
            i += 1
        else:
            j -= 1
    return None
```

If \(a_i+a_j<target\), then pairing \(a_i\) with any smaller index yields an even smaller sum, so \(i\) can move right; otherwise \(j\) moves left.

## Same-Direction Two Pointers: Removing Duplicates

```python
def remove_duplicates(a: list[int]) -> int:
    if not a:
        return 0
    write = 1
    for read in range(1, len(a)):
        if a[read] != a[write - 1]:
            a[write] = a[read]
            write += 1
    return write
```

Returns the new length; the first `write` elements are the deduplicated result.

## Merging Two Sorted Arrays

```python
def merge(a: list[int], b: list[int]) -> list[int]:
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out
```

## C++ Two Sum

```cpp
#include <iostream>
#include <vector>

bool two_sum_sorted(const std::vector<int>& a, int target) {
    int i = 0, j = static_cast<int>(a.size()) - 1;
    while (i < j) {
        int s = a[i] + a[j];
        if (s == target) return true;
        if (s < target) ++i; else --j;
    }
    return false;
}

int main() {
    std::cout << two_sum_sorted({1, 2, 3, 4, 6}, 7) << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty / single element | no pair exists |
| Duplicate values | whether to return all pairs |
| Unsorted | converging two pointers require sorted input |
| Negative numbers | the movement logic still holds |

## Exercises

1. Return all distinct pairs whose sum is target.
2. Merge two sorted arrays into the tail of the first array (in place).
3. Determine whether a string is a palindrome (two pointers).

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](06-difference.md) · [Level Overview](index.md) · [Next](08-sliding-window.md)
