# 8.6 动态树

> **级别**：第 8 级 · 高级算法与计算方法  
> **状态**：已展开。

## 学习目标

- 理解 Splay 的伸展操作；
- 用 Link-Cut Tree 维护动态森林；
- 知道 `access`/`makeroot` 的作用。

## Splay

Splay 是自调整二叉搜索树：访问节点后通过旋转把它推到根，均摊 \(O(\log n)\)。

## Link-Cut Tree

LCT 用“实链 + Splay”表示森林，支持：

- `access(x)`：把根到 \(x\) 的路径变为实链；
- `makeroot(x)`：把 \(x\) 设为根；
- `link(u,v)`、`cut(u,v)`；
- 路径查询/修改。

```python
class LCT:
    def __init__(self, n: int) -> None:
        self.ch = [[0, 0] for _ in range(n + 1)]
        self.fa = [0] * (n + 1)
        self.rev = [False] * (n + 1)
        self.val = [0] * (n + 1)
        self.sum = [0] * (n + 1)

    def is_root(self, x: int) -> bool:
        f = self.fa[x]
        return f == 0 or (self.ch[f][0] != x and self.ch[f][1] != x)

    def push_up(self, x: int) -> None:
        self.sum[x] = self.sum[self.ch[x][0]] + self.sum[self.ch[x][1]] + self.val[x]

    def push_rev(self, x: int) -> None:
        if x:
            self.ch[x][0], self.ch[x][1] = self.ch[x][1], self.ch[x][0]
            self.rev[x] ^= True

    def push_down(self, x: int) -> None:
        if self.rev[x]:
            self.push_rev(self.ch[x][0]); self.push_rev(self.ch[x][1])
            self.rev[x] = False

    def rotate(self, x: int) -> None:
        y, z = self.fa[x], self.fa[self.fa[x]]
        k = 1 if self.ch[y][1] == x else 0
        if not self.is_root(y):
            self.ch[z][1 if self.ch[z][1] == y else 0] = x
        self.fa[x] = z
        self.ch[y][k] = self.ch[x][k ^ 1]
        if self.ch[x][k ^ 1]: self.fa[self.ch[x][k ^ 1]] = y
        self.ch[x][k ^ 1] = y
        self.fa[y] = x
        self.push_up(y); self.push_up(x)

    def splay(self, x: int) -> None:
        stack = []
        y = x
        stack.append(y)
        while not self.is_root(y):
            y = self.fa[y]; stack.append(y)
        for node in reversed(stack): self.push_down(node)
        while not self.is_root(x):
            y, z = self.fa[x], self.fa[self.fa[x]]
            if not self.is_root(y):
                if (self.ch[y][1] == x) == (self.ch[z][1] == y): self.rotate(y)
                else: self.rotate(x)
            self.rotate(x)
```

## C++ LCT 核心

```cpp
#include <array>
#include <vector>

struct LCT {
    std::vector<std::array<int,2>> ch;
    std::vector<int> fa, val, sum;
    std::vector<bool> rev;
    explicit LCT(int n) : ch(n + 1), fa(n + 1), val(n + 1), sum(n + 1), rev(n + 1) {}
    bool is_root(int x) {
        int f = fa[x];
        return !f || (ch[f][0] != x && ch[f][1] != x);
    }
};
```

## 边界

| 场景 | 注意 |
|---|---|
| 断开的边 | `cut` 前确认连通 |
| 路径方向 | `makeroot` 改变根 |
| 懒标记 | 先下推再旋转 |
| 递归/迭代 | Splay 用栈下推 |

## 练习

1. 用 LCT 维护路径和。
2. 用 LCT 判断动态连通性。
3. 比较 LCT 与树链剖分的适用场景。

## 来源

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Open Data Structures](https://opendatastructures.org/)

## 导航

[← 上一章](05-advanced-string.md) · [本级总览](index.md) · [下一章](07-fft-ntt.md)
