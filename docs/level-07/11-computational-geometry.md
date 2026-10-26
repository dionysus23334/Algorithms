# 7.11 计算几何

> **级别**：第 7 级 · 进阶算法与数据结构  
> **状态**：已展开。

## 学习目标

- 用向量点积/叉积判断方向；
- 判断线段相交；
- 用 Andrew 单调链求凸包。

## 向量与叉积

```python
class P:
    __slots__ = ("x", "y")
    def __init__(self, x: float, y: float) -> None:
        self.x, self.y = x, y
    def __sub__(self, o: "P") -> "P":
        return P(self.x - o.x, self.y - o.y)

def cross(a: P, b: P) -> float:
    return a.x * b.y - a.y * b.x

def dot(a: P, b: P) -> float:
    return a.x * b.x + a.y * b.y
```

叉积符号表示转向：正为左转，负为右转，0 共线。

## 线段相交

快速排斥 + 跨立实验：

```python
def on_segment(a: P, b: P, p: P) -> bool:
    return min(a.x,b.x) <= p.x <= max(a.x,b.x) and min(a.y,b.y) <= p.y <= max(a.y,b.y) \
        and abs(cross(b - a, p - a)) < 1e-9

def segments_intersect(a: P, b: P, c: P, d: P) -> bool:
    ab, cd = b - a, d - c
    o1, o2 = cross(ab, c - a), cross(ab, d - a)
    o3, o4 = cross(cd, a - c), cross(cd, b - c)
    if o1 * o2 < 0 and o3 * o4 < 0:
        return True
    return (abs(o1) < 1e-9 and on_segment(a,b,c)) or \
           (abs(o2) < 1e-9 and on_segment(a,b,d)) or \
           (abs(o3) < 1e-9 and on_segment(c,d,a)) or \
           (abs(o4) < 1e-9 and on_segment(c,d,b))
```

## 凸包（Andrew）

按 x/y 排序，维护下凸壳与上凸壳：

```python
def convex_hull(points: list[P]) -> list[P]:
    pts = sorted(points, key=lambda p: (p.x, p.y))
    if len(pts) <= 1:
        return pts
    def build(seq):
        h = []
        for p in seq:
            while len(h) >= 2 and cross(h[-1] - h[-2], p - h[-2]) <= 0:
                h.pop()
            h.append(p)
        return h
    lower = build(pts)
    upper = build(reversed(pts))
    return lower[:-1] + upper[:-1]
```

时间 \(O(n\log n)\)。

## C++ 叉积

```cpp
#include <iostream>

struct P { long long x, y; };
long long cross(P a, P b) { return a.x * b.y - a.y * b.x; }

int main() {
    P a{1, 0}, b{0, 1};
    std::cout << cross(a, b) << '\n'; // 1
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 共线点 | 是否保留，按题意 |
| 浮点误差 | 用 eps 或整数叉积 |
| 重复点 | 先去重 |
| 凸包退化 | 点数 < 2 |

## 练习

1. 判断点是否在多边形内。
2. 求凸包周长。
3. 用旋转卡壳求凸包直径。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](10-xor-basis.md) · [本级总览](index.md)
