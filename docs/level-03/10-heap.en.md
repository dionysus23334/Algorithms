# 3.10 Heap and Priority Queue

> **Level**: Level 3 · Basic Data Structures  
> **Status**: expanded.

## Learning Objectives

- Maintain the min-heap/max-heap property;
- Implement sift-up, sift-down and heap construction;
- Use a priority queue to solve "dynamically taking the extremum".

## Heap Property

Min-heap: every node is no greater than its children. It is stored in an array:

- parent `(i-1)//2`;
- left child `2*i+1`, right child `2*i+2`.

## Hand-written Min-Heap in Python

```python
class MinHeap:
    def __init__(self) -> None:
        self.a: list[int] = []

    def push(self, x: int) -> None:
        self.a.append(x)
        i = len(self.a) - 1
        while i > 0:
            p = (i - 1) // 2
            if self.a[p] <= self.a[i]:
                break
            self.a[p], self.a[i] = self.a[i], self.a[p]
            i = p

    def pop(self) -> int:
        if not self.a:
            raise IndexError("empty heap")
        top = self.a[0]
        last = self.a.pop()
        if self.a:
            self.a[0] = last
            i = 0
            while True:
                l, r = 2 * i + 1, 2 * i + 2
                small = i
                if l < len(self.a) and self.a[l] < self.a[small]:
                    small = l
                if r < len(self.a) and self.a[r] < self.a[small]:
                    small = r
                if small == i:
                    break
                self.a[i], self.a[small] = self.a[small], self.a[i]
                i = small
        return top
```

## Heap Construction

Sift down from the last non-leaf node backwards; the time is \(O(n)\), not \(O(n\log n)\).

## C++ Priority Queue

```cpp
#include <iostream>
#include <queue>
#include <vector>

int main() {
    std::priority_queue<int> max_heap;
    for (int x : {3, 1, 4, 1, 5}) max_heap.push(x);
    while (!max_heap.empty()) {
        std::cout << max_heap.top() << ' ';
        max_heap.pop();
    }
}
```

Min-heap: `std::priority_queue<int, std::vector<int>, std::greater<int>>`.

## Complexity

| Operation | Time |
|---|---|
| Peek at the top | \(O(1)\) |
| Insert | \(O(\log n)\) |
| Delete the top | \(O(\log n)\) |
| Heap construction | \(O(n)\) |

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty heap | `pop/top` must be checked |
| Duplicate values | a heap does not require uniqueness |
| Dynamically changing keys | the standard heap does not support decrease-key; an additional structure is needed |

## Exercises

1. Implement a max-heap.
2. Use a heap to find the k-th largest element in an array.
3. Use a heap to merge \(k\) sorted linked lists.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## Navigation

[← Previous](09-bst.md) · [Level Overview](index.md) · [Next](11-dsu.md)
