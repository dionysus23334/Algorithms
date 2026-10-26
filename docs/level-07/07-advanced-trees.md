# 7.7 高级树结构

> **级别**：第 7 级 · 进阶算法与数据结构  
> **状态**：已展开。

## 学习目标

- 理解旋转与平衡；
- 用 Treap 维持期望平衡；
- 了解可持久化线段树与树链剖分。

## 旋转与平衡

AVL 通过左旋/右旋维持高度差 \(\le1\)；插入/删除后回溯更新高度并旋转。每次旋转 \(O(1)\)，总操作 \(O(\log n)\)。

## Treap

每个节点同时满足 BST 与堆性质（随机优先级）。`split` 按 key 分成两棵，`merge` 按优先级合并。

```python
import random

class Node:
    __slots__ = ("key", "prio", "left", "right")
    def __init__(self, key: int) -> None:
        self.key = key
        self.prio = random.random()
        self.left = None
        self.right = None

def split(t: Node | None, key: int) -> tuple[Node | None, Node | None]:
    if not t:
        return None, None
    if t.key < key:
        a, b = split(t.right, key)
        t.right = a
        return t, b
    a, b = split(t.left, key)
    t.left = b
    return a, t

def merge(a: Node | None, b: Node | None) -> Node | None:
    if not a or not b:
        return a or b
    if a.prio > b.prio:
        a.right = merge(a.right, b)
        return a
    b.left = merge(a, b.left)
    return b
```

期望 \(O(\log n)\)，最坏 \(O(n)\)（随机优先级极端）。

## 可持久化线段树

每次修改只复制路径上的 \(O(\log n)\) 个节点，保留历史版本；用于区间第 \(k\) 小、历史查询。

## 树链剖分

把树拆成重链，用线段树维护链上区间；路径查询 \(O(\log^2 n)\)。

## C++ AVL 旋转核心

```cpp
#include <algorithm>

struct Node { int key, height; Node *l = nullptr, *r = nullptr; };

int h(Node* t) { return t ? t->height : 0; }
void pull(Node* t) { t->height = 1 + std::max(h(t->l), h(t->r)); }

Node* rotate_right(Node* y) {
    Node* x = y->l;
    y->l = x->r;
    x->r = y;
    pull(y); pull(x);
    return x;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 重复 key | 计数/拒绝/允许 |
| 随机种子 | 固定种子可复现 |
| 递归深度 | Treap 期望对数，最坏线性 |
| 持久化 | 内存 \(O((n+q)\log n)\) |

## 练习

1. 用 Treap 实现插入/删除/第 k 小。
2. 实现 AVL 的四种旋转。
3. 用可持久化线段树求区间第 k 小。

## 来源

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Open Data Structures](https://opendatastructures.org/)

## 导航

[← 上一章](06-string-advanced.md) · [本级总览](index.md) · [下一章](08-offline-block.md)
