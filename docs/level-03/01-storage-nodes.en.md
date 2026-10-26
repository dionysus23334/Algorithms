# 3.1 Storage and Nodes

> **Level**: Level 3 · Basic Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Distinguish contiguous storage from linked storage;
- Connect nodes with object references/pointers;
- Understand lifetime, ownership, and resource management in C++.

## Contiguous Storage vs Linked Storage

**Contiguous storage**: elements are adjacent in memory, index access is \(O(1)\), and insertion or deletion may move a large number of elements.  
**Linked storage**: each node stores data and a reference to the next node; insertion and deletion only require changing links, but accessing the \(k\)-th element requires walking \(k\) steps.

| Operation | Contiguous array | Linked list |
|---|---|---|
| Access by index | \(O(1)\) | \(O(n)\) |
| Insert at head | \(O(n)\) | \(O(1)\) |
| Insert after a known node | \(O(n)\) | \(O(1)\) |
| Space overhead | Compact | One extra pointer per node |

## Python: Object References

```python
class Node:
    def __init__(self, value: int, next: "Node | None" = None) -> None:
        self.value = value
        self.next = next

a = Node(1)
b = Node(2)
a.next = b          # a references b
print(a.next.value) # 2
```

Python variables hold object references; `a.next = b` does not copy `b`, it only adds a reference.

## C++: Values, Pointers, and Ownership

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

`std::unique_ptr` expresses exclusive ownership: when `a` is destroyed, the entire chain is released recursively. Do not use a raw `new` and then forget `delete`.

### Raw Pointer Version

```cpp
struct Node {
    int value;
    Node* next;
};
```

A raw pointer does not express ownership, so "who is responsible for freeing" must be made explicit; dangling pointers, double frees, and memory leaks are easy to introduce.

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty chain | The head pointer is `nullptr` / `None` |
| Deleting a node | Save `next` first, then free the current node |
| Shared nodes | C++ requires `shared_ptr` or an explicit statement of non-ownership |
| Cycles | Traversal may loop forever; a visited set or fast/slow pointers are needed |

## Exercises

1. Build a three-node chain in both Python and C++, and print it in forward order.
2. Explain why "inserting at the head of a linked list is \(O(1)\)" but "deleting the node whose value is x" is usually \(O(n)\).
3. Implement a chain with `unique_ptr` and verify that no memory is leaked on destruction (a sanitizer may be used).

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## Navigation

[← Level Overview](index.md) · [Next](02-dynamic-array.md)
