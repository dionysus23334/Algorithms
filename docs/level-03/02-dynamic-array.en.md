# 3.2 Dynamic Array

> **Level**: Level 3 · Basic Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Implement a dynamic array with capacity and length;
- Understand resizing and amortized cost;
- Know why insertion/deletion is \(O(n)\).

## Interface

```text
size()       current number of elements
get(i)       access by index
push_back(x) insert at the end
pop_back()   remove the last element
insert(i,x)  insert at position i
erase(i)     remove at position i
```

## Python Teaching Implementation

```python
class DynamicArray:
    def __init__(self, capacity: int = 1) -> None:
        self._data = [None] * capacity
        self._size = 0
        self._capacity = capacity

    def __len__(self) -> int:
        return self._size

    def get(self, i: int) -> int:
        if not 0 <= i < self._size:
            raise IndexError(i)
        return self._data[i]

    def push_back(self, x: int) -> None:
        if self._size == self._capacity:
            self._resize(self._capacity * 2)
        self._data[self._size] = x
        self._size += 1

    def _resize(self, new_cap: int) -> None:
        new_data = [None] * new_cap
        for i in range(self._size):
            new_data[i] = self._data[i]
        self._data = new_data
        self._capacity = new_cap
```

## C++ Teaching Implementation

```cpp
#include <algorithm>
#include <stdexcept>
#include <vector>

class DynamicArray {
    int* data_ = nullptr;
    int size_ = 0;
    int capacity_ = 0;

public:
    explicit DynamicArray(int cap = 1) : data_(new int[cap]), capacity_(cap) {}
    ~DynamicArray() { delete[] data_; }
    DynamicArray(const DynamicArray&) = delete;
    DynamicArray& operator=(const DynamicArray&) = delete;

    int size() const { return size_; }
    int get(int i) const {
        if (i < 0 || i >= size_) throw std::out_of_range("index");
        return data_[i];
    }
    void push_back(int x) {
        if (size_ == capacity_) resize(capacity_ * 2);
        data_[size_++] = x;
    }
    void resize(int cap) {
        int* next = new int[cap];
        std::copy(data_, data_ + size_, next);
        delete[] data_;
        data_ = next;
        capacity_ = cap;
    }
};
```

Real projects use `std::vector` directly; this version demonstrates capacity, copying, and release.

## Amortized Analysis

Starting from capacity 1 and calling `push_back` repeatedly: resizing happens at 1, 2, 4, 8, …, and the total number of copies is

\[
1+2+4+\cdots+n<2n.
\]

The total cost of \(n\) insertions is \(O(n)\), so the amortized cost per insertion is \(O(1)\).

## Insertion and Deletion

Inserting at index \(i\) requires shifting \([i,n)\) one position to the right, which is \(O(n)\) in the worst case; deletion is analogous. Only insertion/deletion at the end is \(O(1)\) amortized.

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty array | `pop_back` must check |
| Zero capacity | Use an initial capacity of at least 1, or handle it separately |
| Resizing failure | C++ `new` may throw `bad_alloc` |
| Iterator invalidation | After a `vector` resize, old iterators/pointers are invalidated |

## Exercises

1. Add `insert` and `erase`, and analyze their worst-case complexity.
2. Implement "shrinking": halve the capacity when the number of elements is below 1/4 of capacity, and explain why the threshold is not 1/2.
3. Compare the resizing strategies of `DynamicArray` and `std::vector`.

## Sources

- [Open Data Structures](https://opendatastructures.org/)
- [Hello Algo](https://www.hello-algo.com/)
- [cppreference](https://en.cppreference.com/)

## Navigation

[← Previous](01-storage-nodes.md) · [Level Overview](index.md) · [Next](03-linked-list.md)
