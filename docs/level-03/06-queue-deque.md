# 3.6 队列与双端队列

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 理解先进先出（FIFO）；
- 用循环数组实现队列；
- 区分 `queue`、`deque` 与优先队列。

## 接口

```text
push_back(x)   入队
pop_front()    出队
front()        队首
back()         队尾
empty()
```

## 循环队列

用长度为 `cap` 的数组，`head` 指向队首，`size` 记录元素个数：

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

时间 \(O(1)\)，空间 \(O(\text{capacity})\)。

## C++ 循环队列

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

## 标准库

- Python：`collections.deque`，两端 \(O(1)\)；
- C++：`std::deque` 两端插入删除，`std::queue` 是容器适配器；
- 优先队列不是 FIFO，见堆章节。

## 双端队列

双端队列支持 `push_front`、`push_back`、`pop_front`、`pop_back`，常用于滑动窗口、BFS 的 0-1 最短路。

## 边界

| 场景 | 注意 |
|---|---|
| 队列满 | 抛异常或阻塞/覆盖，接口要明确 |
| 队列空 | 不能 `pop` |
| 容量 0 | 非法 |
| 循环下标 | 用 `% capacity`，不要越界 |

## 练习

1. 用两个栈实现队列。
2. 实现固定容量循环队列，并写满/空测试。
3. 用 `deque` 实现滑动窗口最大值。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## 导航

[← 上一章](05-recursion-stack.md) · [本级总览](index.md) · [下一章](07-hash-table.md)
