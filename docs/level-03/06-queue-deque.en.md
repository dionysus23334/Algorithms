# 3.6 Queue and Deque

> **Level**: Level 3 · Basic Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Understand first in, first out (FIFO);
- Implement a queue with a circular array;
- Distinguish `queue`, `deque` and priority queue.

## Interface

```text
push_back(x)   enqueue
pop_front()    dequeue
front()        front of the queue
back()         back of the queue
empty()
```

## Circular Queue

Use an array of length `cap`, with `head` pointing at the front and `size` recording the number of elements:

```python
class CircularQueue:
    def __init__(self, capacity: int) -> None:
        if capacity <= 0:
            raise ValueError("capacity must be positive")
        self._data = [0] * capacity
        self._head = 0
        self._size = 0

    def push(self, x: int) -> None:
        if self._size == len(self._data):
            raise OverflowError("queue full")
        tail = (self._head + self._size) % len(self._data)
        self._data[tail] = x
        self._size += 1

    def pop(self) -> int:
        if self._size == 0:
            raise IndexError("queue empty")
        x = self._data[self._head]
        self._head = (self._head + 1) % len(self._data)
        self._size -= 1
        return x
```

Time \(O(1)\), space \(O(\text{capacity})\).

## C++ Circular Queue

```cpp
#include <stdexcept>
#include <vector>

class CircularQueue {
    std::vector<int> data_;
    int head_ = 0;
    int size_ = 0;
public:
    explicit CircularQueue(int cap) : data_(cap) {}
    void push(int x) {
        if (size_ == static_cast<int>(data_.size())) throw std::overflow_error("full");
        int tail = (head_ + size_) % data_.size();
        data_[tail] = x;
        ++size_;
    }
    int pop() {
        if (size_ == 0) throw std::underflow_error("empty");
        int x = data_[head_];
        head_ = (head_ + 1) % data_.size();
        --size_;
        return x;
    }
};
```

## Standard Library

- Python: `collections.deque`, with \(O(1)\) operations at both ends;
- C++: `std::deque` supports insertion and deletion at both ends, and `std::queue` is a container adapter;
- A priority queue is not FIFO; see the heap chapter.

## Deque

A deque supports `push_front`, `push_back`, `pop_front` and `pop_back`, and is often used for sliding windows and for 0-1 shortest paths in BFS.

## Boundary Cases

| Scenario | Note |
|---|---|
| Queue full | Throw an exception, block, or overwrite — the interface must be explicit |
| Queue empty | `pop` is not allowed |
| Capacity 0 | Illegal |
| Circular indices | Use `% capacity`; do not go out of bounds |

## Exercises

1. Implement a queue using two stacks.
2. Implement a fixed-capacity circular queue and write full/empty tests.
3. Implement the sliding-window maximum with a `deque`.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## Navigation

[← Previous](05-recursion-stack.md) · [Level Overview](index.md) · [Next](07-hash-table.md)
