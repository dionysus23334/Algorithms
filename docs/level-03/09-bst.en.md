# 3.9 Binary Search Tree

> **Level**: Level 3 · Basic Data Structures  
> **Status**: expanded.

## Learning Objectives

- Maintain the binary search tree (BST) property;
- Implement search, insertion and deletion;
- Understand tree height and degeneration.

## BST Property

For every node:

\[
\text{all values in the left subtree}<\text{node value}<\text{all values in the right subtree}.
\]

An inorder traversal produces an ascending sequence.

## Search and Insertion

```python
class Node:
    def __init__(self, value: int) -> None:
        self.value = value
        self.left: "Node | None" = None
        self.right: "Node | None" = None

def search(root: Node | None, x: int) -> bool:
    while root:
        if x == root.value:
            return True
        root = root.left if x < root.value else root.right
    return False

def insert(root: Node | None, x: int) -> Node:
    if not root:
        return Node(x)
    if x < root.value:
        root.left = insert(root.left, x)
    elif x > root.value:
        root.right = insert(root.right, x)
    return root
```

Duplicate values: they may be ignored, counted, or assigned to one fixed side; the choice must be consistent.

## Deletion

Three cases:

1. Leaf: delete it directly;
2. Only one child: replace the node with that child;
3. Two children: replace it with the minimum of the right subtree (or the maximum of the left subtree), then delete that node.

```python
def delete(root: Node | None, x: int) -> Node | None:
    if not root:
        return None
    if x < root.value:
        root.left = delete(root.left, x)
    elif x > root.value:
        root.right = delete(root.right, x)
    else:
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        succ = root.right
        while succ.left:
            succ = succ.left
        root.value = succ.value
        root.right = delete(root.right, succ.value)
    return root
```

## C++ Search

```cpp
struct Node {
    int value;
    Node* left = nullptr;
    Node* right = nullptr;
    explicit Node(int v) : value(v) {}
};

bool search(Node* root, int x) {
    while (root) {
        if (x == root->value) return true;
        root = (x < root->value) ? root->left : root->right;
    }
    return false;
}
```

## Complexity

- When balanced, the tree height is \(O(\log n)\), and search/insertion/deletion cost \(O(\log n)\);
- When degenerate into a chain, the tree height is \(O(n)\), and the operations cost \(O(n)\);
- The expected height under random insertion is about \(O(\log n)\), but it is not guaranteed.

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty tree | search returns false; insertion creates the root |
| Duplicate values | define a policy |
| Deleting the root | replace it with the successor/predecessor |
| Degeneration | consider a balanced tree |

## Exercises

1. Implement an inorder traversal to verify the BST property.
2. Implement "the k-th smallest element".
3. Construct an insertion sequence that degenerates the BST, and explain how a balanced tree avoids this.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Previous](08-trees-binary.md) · [Level Overview](index.md) · [Next](10-heap.md)
