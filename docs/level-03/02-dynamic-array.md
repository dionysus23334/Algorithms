# 3.2 动态数组

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 实现一个带容量与长度的动态数组；
- 理解扩容与摊还代价；
- 知道插入/删除为什么是 \(O(n)\)。

## 接口

```text
size()       当前元素个数
get(i)       下标访问
push_back(x) 末尾插入
pop_back()   删除末尾
insert(i,x)  在 i 处插入
erase(i)     删除 i
```

## Python 教学实现

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

## C++ 教学实现

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

实际工程直接用 `std::vector`；这里展示容量、复制与释放。

## 摊还分析

从容量 1 开始连续 `push_back`：扩容发生在 1,2,4,8,…，总复制次数

\[
1+2+4+\cdots+n<2n.
\]

\(n\) 次插入总代价 \(O(n)\)，摊还每次 \(O(1)\)。

## 插入与删除

在下标 \(i\) 插入需要把 \([i,n)\) 右移一位，最坏 \(O(n)\)；删除同理。末尾插入/删除才是 \(O(1)\) 摊还。

## 边界

| 场景 | 注意 |
|---|---|
| 空数组 | `pop_back` 要检查 |
| 容量为 0 | 初始容量至少 1，或单独处理 |
| 扩容失败 | C++ `new` 可能抛 `bad_alloc` |
| 迭代器失效 | `vector` 扩容后旧迭代器/指针失效 |

## 练习

1. 增加 `insert` 与 `erase`，并分析最坏复杂度。
2. 实现“缩容”：元素少于容量 1/4 时减半，说明为什么阈值不是 1/2。
3. 比较 `DynamicArray` 与 `std::vector` 的扩容策略。

## 来源

- [Open Data Structures](https://opendatastructures.org/)
- [Hello 算法](https://www.hello-algo.com/)
- [cppreference](https://en.cppreference.com/)

## 导航

[← 上一章](01-storage-nodes.md) · [本级总览](index.md) · [下一章](03-linked-list.md)
