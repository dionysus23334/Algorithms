# 7.7 Advanced Tree Structures

> **Level**: Level 7 · Advanced Algorithms and Data Structures  
> **Status**: expanded.

## Learning Objectives

- Understand rotations and balancing;
- Use a Treap to maintain expected balance;
- Understand persistent segment trees and heavy-light decomposition.

## Rotations and Balancing

AVL maintains a height difference of \(\le1\) through left and right rotations; after an insertion or deletion, it walks back up updating the heights and rotating. Each rotation is \(O(1)\), and the total cost of an operation is \(O(\log n)\).

## Treap

Each node satisfies both the BST property and the heap property (random priority). `split` divides a tree into two by key, and `merge` merges two trees by priority.

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

Expected \(O(\log n)\), worst case \(O(n)\) (when the random priorities are extreme).

## Persistent Segment Tree

Each modification copies only the \(O(\log n)\) nodes on the path and keeps the historical versions; used for the \(k\)-th smallest in a range and for historical queries.

## Heavy-Light Decomposition

Split the tree into heavy chains and maintain intervals on the chains with a segment tree; a path query costs \(O(\log^2 n)\).

## C++ AVL Rotation Core

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

## Boundary Cases

| Scenario | Note |
|---|---|
| Duplicate keys | Count / reject / allow |
| Random seed | A fixed seed makes the behavior reproducible |
| Recursion depth | A Treap is expected logarithmic, worst case linear |
| Persistence | Memory \(O((n+q)\log n)\) |

## Exercises

1. Implement insertion, deletion, and the \(k\)-th smallest element with a Treap.
2. Implement the four AVL rotations.
3. Find the \(k\)-th smallest element in a range with a persistent segment tree.

## Sources

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Open Data Structures](https://opendatastructures.org/)

## Navigation

[← Previous](06-string-advanced.md) · [Level Overview](index.md) · [Next](08-offline-block.md)
