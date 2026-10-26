# 3.10 堆与优先队列

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 维护小根堆/大根堆性质；
- 实现上浮、下沉、建堆；
- 用优先队列解决“动态取最值”。

## 堆性质

小根堆：每个节点不大于其孩子。用数组存储：

- 父节点 `(i-1)//2`；
- 左孩子 `2*i+1`，右孩子 `2*i+2`。

## Python 手写小根堆

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

## 建堆

从最后一个非叶节点向前下沉，时间 \(O(n)\)，不是 \(O(n\log n)\)。

## C++ 优先队列

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

小根堆：`std::priority_queue<int, std::vector<int>, std::greater<int>>`。

## 复杂度

| 操作 | 时间 |
|---|---|
| 查看堆顶 | \(O(1)\) |
| 插入 | \(O(\log n)\) |
| 删除堆顶 | \(O(\log n)\) |
| 建堆 | \(O(n)\) |

## 边界

| 场景 | 注意 |
|---|---|
| 空堆 | `pop/top` 要检查 |
| 重复值 | 堆不要求唯一 |
| 动态修改键 | 标准堆不支持 decrease-key；需额外结构 |

## 练习

1. 实现大根堆。
2. 用堆求数组中第 k 大元素。
3. 用堆合并 \(k\) 个有序链表。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## 导航

[← 上一章](09-bst.md) · [本级总览](index.md) · [下一章](11-dsu.md)
