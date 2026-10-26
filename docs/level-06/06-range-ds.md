# 6.6 区间数据结构

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 用树状数组做前缀和/单点修改；
- 用线段树做区间查询/懒标记；
- 知道稀疏表的适用条件。

## 树状数组（Fenwick）

维护前缀和，单点加、前缀查询 \(O(\log n)\)。

```python
class Fenwick:
    def __init__(self, n: int) -> None:
        self.n = n
        self.t = [0] * (n + 1)

    def add(self, i: int, delta: int) -> None:
        while i <= self.n:
            self.t[i] += delta
            i += i & -i

    def sum(self, i: int) -> int:
        s = 0
        while i > 0:
            s += self.t[i]
            i -= i & -i
        return s

    def range_sum(self, l: int, r: int) -> int:
        return self.sum(r) - self.sum(l - 1)
```

`i & -i` 取最低位 1。

## 线段树

支持区间查询与区间修改；懒标记把修改推迟到必要时。

```python
class SegTree:
    def __init__(self, a: list[int]) -> None:
        self.n = len(a)
        self.t = [0] * (4 * self.n)
        self._build(1, 0, self.n - 1, a)

    def _build(self, p: int, l: int, r: int, a: list[int]) -> None:
        if l == r:
            self.t[p] = a[l]
            return
        m = (l + r) // 2
        self._build(2*p, l, m, a)
        self._build(2*p+1, m+1, r, a)
        self.t[p] = self.t[2*p] + self.t[2*p+1]

    def query(self, ql: int, qr: int, p: int = 1, l: int = 0, r: int = -1) -> int:
        if r == -1:
            r = self.n - 1
        if ql <= l and r <= qr:
            return self.t[p]
        m = (l + r) // 2
        res = 0
        if ql <= m:
            res += self.query(ql, qr, 2*p, l, m)
        if qr > m:
            res += self.query(ql, qr, 2*p+1, m+1, r)
        return res
```

## C++ 树状数组

```cpp
#include <vector>

struct Fenwick {
    int n;
    std::vector<long long> t;
    explicit Fenwick(int n) : n(n), t(n + 1, 0) {}
    void add(int i, long long x) {
        for (; i <= n; i += i & -i) t[i] += x;
    }
    long long sum(int i) {
        long long s = 0;
        for (; i > 0; i -= i & -i) s += t[i];
        return s;
    }
};
```

## 稀疏表

静态数组的区间最值：预处理 \(O(n\log n)\)，查询 \(O(1)\)，不支持修改。

## 选择

| 需求 | 结构 |
|---|---|
| 前缀和/单点改 | 树状数组 |
| 区间和/区间改 | 线段树 + 懒标记 |
| 静态 RMQ | 稀疏表 |
| 区间第 k 小 | 可持久化线段树/分块 |

## 边界

| 场景 | 注意 |
|---|---|
| 下标 1-based | 树状数组常用 1..n |
| 空区间 | 查询返回 0 |
| 懒标记 | 下推顺序不能错 |
| 大值 | `long long` |

## 练习

1. 用树状数组求逆序对。
2. 给线段树加区间加与区间和。
3. 用稀疏表求区间最大值。

## 来源

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](05-tree-algorithms.md) · [本级总览](index.md) · [下一章](07-monotonic.md)
