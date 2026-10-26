# 3.8 树与二叉树

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 用节点与左右孩子表示二叉树；
- 写前序、中序、后序、层序遍历；
- 计算深度与节点数。

## 定义

二叉树每个节点最多有两个孩子：`left`、`right`。  
**深度**：从根到节点的边数；**高度**：从节点到叶子的最长边数。

```python
class TreeNode:
    def __init__(self, value: int, left=None, right=None) -> None:
        self.value = value
        self.left = left
        self.right = right
```

## 递归遍历

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

## 层序遍历

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

## C++ 节点与中序遍历

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

## 深度

```python
def depth(root: TreeNode | None) -> int:
    if not root:
        return 0
    return 1 + max(depth(root.left), depth(root.right))
```

时间 \(O(n)\)，递归空间最坏 \(O(n)\)（退化链），平衡时 \(O(\log n)\)。

## 边界

| 场景 | 注意 |
|---|---|
| 空树 | 返回空列表/0 |
| 只有左/右孩子 | 遍历不能假设满二叉树 |
| 退化树 | 递归深度可能 \(n\) |
| 重复值 | 遍历保留重复；BST 需额外规则 |

## 练习

1. 用迭代实现前序/中序遍历。
2. 统计叶子节点数与某一层的节点数。
3. 判断两棵二叉树是否相同。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 上一章](07-hash-table.md) · [本级总览](index.md) · [下一章](09-bst.md)
