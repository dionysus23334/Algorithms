# 4.2 Basic Sorting

> **Level**: Level 4 · Basic Algorithms and Techniques  
> **Status**: Expanded.

## Learning Objectives

- Implement selection, bubble and insertion sort;
- Compare the number of swaps and stability;
- Understand why they are \(O(n^2)\).

## Selection Sort

Each round selects the smallest element from the unsorted interval and places it at the front.

```python
def selection_sort(a: list[int]) -> None:
    n = len(a)
    for i in range(n):
        k = i
        for j in range(i + 1, n):
            if a[j] < a[k]:
                k = j
        a[i], a[k] = a[k], a[i]
```

The number of comparisons is fixed at \(n(n-1)/2\), with at most \(n-1\) swaps; not stable.

## Insertion Sort

Insert the current element into the sorted interval in front of it.

```python
def insertion_sort(a: list[int]) -> None:
    for i in range(1, len(a)):
        x = a[i]
        j = i - 1
        while j >= 0 and a[j] > x:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = x
```

\(O(n)\) when already sorted; \(O(n^2)\) in reverse order; stable.

## Bubble Sort

Swap adjacent out-of-order elements, bubbling the maximum element to the end in each round.

```python
def bubble_sort(a: list[int]) -> None:
    n = len(a)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
```

Best case \(O(n)\) (already sorted, with early termination), worst case \(O(n^2)\); stable.

## C++ Insertion Sort

```cpp
#include <vector>

void insertion_sort(std::vector<int>& a) {
    for (int i = 1; i < static_cast<int>(a.size()); ++i) {
        int x = a[i], j = i - 1;
        while (j >= 0 && a[j] > x) {
            a[j + 1] = a[j];
            --j;
        }
        a[j + 1] = x;
    }
}
```

## Stability

Stable: the relative order of equal elements is preserved. Insertion sort and bubble sort are stable; selection sort is usually unstable.

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty array / single element | The loop body does not execute |
| All elements equal | Must still be correct; a stable sort does not change the relative order |
| Large arrays | \(O(n^2)\) is unsuitable |

## Exercises

1. Count the comparisons and swaps of the three sorts.
2. Add "find the minimum and maximum at the same time" to selection sort to reduce comparisons.
3. Construct an example in which selection sort is unstable.

## Sources

- [Hello Algorithms](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Previous](01-enumeration-search.md) · [Level Overview](index.md) · [Next](03-library-sort.md)
