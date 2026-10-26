# 7.11 Computational Geometry

> **Level**: Level 7 · Advanced Algorithms and Data Structures  
> **Status**: expanded.

## Learning Objectives

- Use the vector dot product / cross product to determine orientation;
- Determine whether two line segments intersect;
- Compute the convex hull with Andrew's monotone chain.

## Vectors and Cross Products

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

The sign of the cross product indicates the turn: positive is a left turn, negative is a right turn, and 0 means collinear.

## Segment Intersection

Bounding-box rejection + straddle test:

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

## Convex Hull (Andrew)

Sort by x/y and maintain the lower and upper hulls:

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

Time \(O(n\log n)\).

## C++ Cross Product

```cpp
#include <iostream>

struct P { long long x, y; };
long long cross(P a, P b) { return a.x * b.y - a.y * b.x; }

int main() {
    P a{1, 0}, b{0, 1};
    std::cout << cross(a, b) << '\n'; // 1
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Collinear points | whether to keep them depends on the problem |
| Floating-point error | use eps or an integer cross product |
| Duplicate points | deduplicate first |
| Degenerate convex hull | fewer than 2 points |

## Exercises

1. Determine whether a point lies inside a polygon.
2. Compute the perimeter of a convex hull.
3. Find the diameter of a convex hull with rotating calipers.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](10-xor-basis.md) · [Level Overview](index.md)
