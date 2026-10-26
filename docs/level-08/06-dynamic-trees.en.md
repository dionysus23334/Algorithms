# 8.6 Dynamic Trees

> **Level**: Level 8 · Advanced Algorithms and Computational Methods  
> **Status**: Expanded.

## Learning Objectives

- Understand the splaying operation of a Splay tree;
- Maintain a dynamic forest with a Link-Cut Tree;
- Know what `access`/`makeroot` do.

## Splay

A Splay tree is a self-adjusting binary search tree: after a node is accessed it is rotated up to the root, giving \(O(\log n)\) amortized time.

## Link-Cut Tree

An LCT represents a forest as "preferred paths + Splay trees" and supports:

- `access(x)`: turn the path from the root to \(x\) into a preferred path;
- `makeroot(x)`: make \(x\) the root;
- `link(u,v)`, `cut(u,v)`;
- path queries / updates.

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

## C++ LCT Core

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

## Boundary Cases

| Scenario | Note |
|---|---|
| Disconnected edge | Confirm connectivity before `cut` |
| Path direction | `makeroot` changes the root |
| Lazy tags | Push down before rotating |
| Recursion / iteration | Splay pushes down with a stack |

## Exercises

1. Maintain path sums with an LCT.
2. Decide dynamic connectivity with an LCT.
3. Compare the scenarios where an LCT and heavy-light decomposition apply.

## Sources

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Open Data Structures](https://opendatastructures.org/)

## Navigation

[← Previous](05-advanced-string.md) · [Level Overview](index.md) · [Next](07-fft-ntt.md)
