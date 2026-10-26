# 3.3 Linked List

> **Level**: Level 3 · Basic Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Implement singly and doubly linked lists;
- Insert/delete at a known position;
- Reverse a linked list and analyze the pointer operations.

## Singly Linked List Node

```python
class Node:
    def __init__(self, value: int, next: "Node | None" = None) -> None:
        self.value = value
        self.next = next
```

C++:

```cpp
struct Node {
    int value;
    Node* next;
    explicit Node(int v) : value(v), next(nullptr) {}
};
```

## Push Front and Traversal

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

Push front is \(O(1)\); traversal is \(O(n)\); deletion by value is usually \(O(n)\).

## Deleting Nodes

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

The sentinel node `dummy` unifies "deleting the head node" and "deleting an interior node".

## Reversing a Linked List

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

Three steps: save `next`, redirect the link, advance `prev/cur`. Time \(O(n)\), space \(O(1)\).

## Complete C++ Example

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

## Doubly Linked List

A doubly linked list node stores both `prev` and `next`; given a node, deletion is \(O(1)\), at the cost of extra pointers and maintenance overhead. Head and tail sentinels can further unify the boundary cases.

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty chain | Return `nullptr`/`None` |
| Deleting the head | Use a dummy or handle it separately |
| Deleting the tail | A singly linked list must find the predecessor, \(O(n)\) |
| Cycles | Traversal loops forever; detect with fast/slow pointers |

## Exercises

1. Implement insertion and deletion for a doubly linked list.
2. Use fast/slow pointers to find the middle of a linked list.
3. Determine whether a linked list has a cycle, and return the entry point of the cycle.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## Navigation

[← Previous](02-dynamic-array.md) · [Level Overview](index.md) · [Next](04-stack.md)
