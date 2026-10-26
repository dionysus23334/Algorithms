# 3.9 二叉搜索树

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 维护二叉搜索树（BST）性质；
- 实现查找、插入、删除；
- 理解树高与退化。

## BST 性质

对每个节点：

\[
\text{左子树所有值}<\text{节点值}<\text{右子树所有值}.
\]

中序遍历得到升序序列。

## 查找与插入

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

重复值：可以忽略、计数或规定放到某一侧；必须统一。

## 删除

分三种情况：

1. 叶子：直接删；
2. 只有一个孩子：用孩子替代；
3. 两个孩子：用右子树最小值（或左子树最大值）替代，再删那个节点。

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

## C++ 查找

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

## 复杂度

- 平衡时树高 \(O(\log n)\)，查找/插入/删除 \(O(\log n)\)；
- 退化成链时树高 \(O(n)\)，操作 \(O(n)\)；
- 随机插入的期望高度约 \(O(\log n)\)，但不保证。

## 边界

| 场景 | 注意 |
|---|---|
| 空树 | 查找 false；插入创建根 |
| 重复值 | 定义策略 |
| 删除根 | 用后继/前驱替代 |
| 退化 | 考虑平衡树 |

## 练习

1. 实现中序遍历验证 BST 性质。
2. 实现“第 k 小元素”。
3. 构造插入序列使 BST 退化，并说明平衡树如何避免。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 上一章](08-trees-binary.md) · [本级总览](index.md) · [下一章](10-heap.md)
