# 3.3 链表

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 实现单链表与双链表；
- 在已知位置插入/删除；
- 反转链表并分析指针操作。

## 单链表节点

```python
class Node:
    def __init__(self, value: int, next: "Node | None" = None) -> None:
        self.value = value
        self.next = next
```

C++：

```cpp
struct Node {
    int value;
    Node* next;
    explicit Node(int v) : value(v), next(nullptr) {}
};
```

## 头插与遍历

```python
def push_front(head: Node | None, x: int) -> Node:
    return Node(x, head)

def to_list(head: Node | None) -> list[int]:
    out = []
    while head:
        out.append(head.value)
        head = head.next
    return out
```

头插 \(O(1)\)；遍历 \(O(n)\)；按值删除通常 \(O(n)\)。

## 删除节点

```python
def remove_value(head: Node | None, x: int) -> Node | None:
    dummy = Node(0, head)
    cur = dummy
    while cur.next:
        if cur.next.value == x:
            cur.next = cur.next.next
        else:
            cur = cur.next
    return dummy.next
```

哨兵节点 `dummy` 统一了“删除头节点”和“删除中间节点”。

## 反转链表

```python
def reverse(head: Node | None) -> Node | None:
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev
```

三步：保存 `next`、改指向、前移 `prev/cur`。时间 \(O(n)\)，空间 \(O(1)\)。

## C++ 完整示例

```cpp
#include <iostream>

struct Node {
    int value;
    Node* next;
    explicit Node(int v) : value(v), next(nullptr) {}
};

Node* reverse(Node* head) {
    Node* prev = nullptr;
    while (head) {
        Node* next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}

int main() {
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head = reverse(head);
    for (Node* p = head; p; p = p->next) std::cout << p->value << ' ';
    while (head) { Node* n = head->next; delete head; head = n; }
}
```

## 双链表

双链表节点同时保存 `prev` 与 `next`，已知节点时删除是 \(O(1)\)，代价是额外指针与维护成本。头尾哨兵可以进一步统一边界。

## 边界

| 场景 | 注意 |
|---|---|
| 空链 | 返回 `nullptr`/`None` |
| 删除头 | 用 dummy 或单独处理 |
| 删除尾 | 单链表要找到前驱，\(O(n)\) |
| 环 | 遍历会死循环；用快慢指针检测 |

## 练习

1. 实现双链表的插入与删除。
2. 用快慢指针找链表中点。
3. 判断链表是否有环，并返回环入口。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## 导航

[← 上一章](02-dynamic-array.md) · [本级总览](index.md) · [下一章](04-stack.md)
