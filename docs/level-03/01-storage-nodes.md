# 3.1 存储与节点

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 区分连续存储与链式存储；
- 用对象引用/指针连接节点；
- 理解 C++ 中的生命周期、所有权与资源管理。

## 连续存储 vs 链式存储

**连续存储**：元素在内存中相邻，下标访问 \(O(1)\)，插入删除可能移动大量元素。  
**链式存储**：每个节点保存数据和到下一个节点的引用，插入删除改变链接即可，但访问第 \(k\) 个元素需要走 \(k\) 步。

| 操作 | 连续数组 | 链表 |
|---|---|---|
| 按下标访问 | \(O(1)\) | \(O(n)\) |
| 头部插入 | \(O(n)\) | \(O(1)\) |
| 已知节点后插入 | \(O(n)\) | \(O(1)\) |
| 空间开销 | 紧凑 | 每节点额外指针 |

## Python：对象引用

```python
class Node:
    def __init__(self, value: int, next: "Node | None" = None) -> None:
        self.value = value
        self.next = next

a = Node(1)
b = Node(2)
a.next = b          # a 引用 b
print(a.next.value) # 2
```

Python 变量保存对象引用；`a.next = b` 不会复制 `b`，只增加一个引用。

## C++：值、指针与所有权

```cpp
#include <iostream>
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> next;
    explicit Node(int v) : value(v) {}
};

int main() {
    auto a = std::make_unique<Node>(1);
    a->next = std::make_unique<Node>(2);
    std::cout << a->next->value << '\n'; // 2
}
```

`std::unique_ptr` 表达独占所有权：`a` 销毁时，整条链递归释放。不要用裸 `new` 后再忘记 `delete`。

### 裸指针版本

```cpp
struct Node {
    int value;
    Node* next;
};
```

裸指针不表达所有权，必须明确“谁负责释放”；容易出现悬空指针、重复释放和内存泄漏。

## 边界

| 场景 | 注意 |
|---|---|
| 空链 | 头指针为 `nullptr` / `None` |
| 删除节点 | 先保存 `next`，再释放当前节点 |
| 共享节点 | C++ 需要 `shared_ptr` 或明确不拥有 |
| 环 | 遍历可能死循环；需要 visited 或快慢指针 |

## 练习

1. 用 Python 与 C++ 各建一个三节点链，并正序输出。
2. 说明为什么“链表头部插入 \(O(1)\)”但“删除值为 x 的节点”通常是 \(O(n)\)。
3. 用 `unique_ptr` 实现一条链，验证析构时没有内存泄漏（可用 sanitizer）。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## 导航

[← 本级总览](index.md) · [下一章](02-dynamic-array.md)
