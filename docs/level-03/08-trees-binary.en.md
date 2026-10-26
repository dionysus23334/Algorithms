# 3.8 Trees and Binary Trees

> **Level**: Level 3 · Basic Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Represent a binary tree with nodes and left/right children;
- Write preorder, inorder, postorder and level-order traversals;
- Compute the depth and the number of nodes.

## Definition

Each node of a binary tree has at most two children: `left` and `right`.  
**Depth**: the number of edges from the root to the node; **height**: the longest number of edges from the node down to a leaf.

```python
class TreeNode:
    def __init__(self, value: int, left=None, right=None) -> None:
        self.value = value
        self.left = left
        self.right = right
```

## Recursive Traversal

```python
def preorder(root: TreeNode | None) -> list[int]:
    if not root:
        return []
    return [root.value] + preorder(root.left) + preorder(root.right)

def inorder(root: TreeNode | None) -> list[int]:
    if not root:
        return []
    return inorder(root.left) + [root.value] + inorder(root.right)

def postorder(root: TreeNode | None) -> list[int]:
    if not root:
        return []
    return postorder(root.left) + postorder(root.right) + [root.value]
```

## Level-order Traversal

```python
from collections import deque

def level_order(root: TreeNode | None) -> list[list[int]]:
    if not root:
        return []
    q = deque([root])
    out = []
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.value)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        out.append(level)
    return out
```

## C++ Node and In-order Traversal

```cpp
#include <iostream>

struct TreeNode {
    int value;
    TreeNode* left = nullptr;
    TreeNode* right = nullptr;
    explicit TreeNode(int v) : value(v) {}
};

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    std::cout << root->value << ' ';
    inorder(root->right);
}
```

## Depth

```python
def depth(root: TreeNode | None) -> int:
    if not root:
        return 0
    return 1 + max(depth(root.left), depth(root.right))
```

Time \(O(n)\); the recursive space is \(O(n)\) in the worst case (a degenerate chain) and \(O(\log n)\) when balanced.

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty tree | Return an empty list/0 |
| Only a left/right child | Traversal must not assume a full binary tree |
| Degenerate tree | The recursion depth may be \(n\) |
| Duplicate values | Traversal keeps duplicates; a BST needs extra rules |

## Exercises

1. Implement preorder/inorder traversal iteratively.
2. Count the leaf nodes and the nodes at a given level.
3. Decide whether two binary trees are identical.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Previous](07-hash-table.md) · [Level Overview](index.md) · [Next](09-bst.md)
