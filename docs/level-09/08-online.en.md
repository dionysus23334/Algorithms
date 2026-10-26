# 9.8 Online Algorithms

> **Level**: Level 9 · Algorithm Theory and Computational Limits  
> **Status**: Expanded.

## Learning Objectives

- Understand online decisions and the competitive ratio;
- Analyse ski rental;
- Understand cache replacement.

## Competitive Ratio

An online algorithm \(ALG\) and the offline optimum \(OPT\) satisfy

\[
ALG\le c\cdot OPT
\]

which is called \(c\)-competitive. The input order is unknown and there is no going back.

## Ski Rental

A skier pays 1 each time to rent skis and \(B\) to buy them. They do not know how many times they will ski.

Strategy: rent first \(B-1\) times, then buy.

- If the total number of times is \(<B\): the cost is \(k\le B-1\), and the optimum is also \(k\);
- If the total number of times is \(\ge B\): the cost is \((B-1)+B=2B-1\), and the optimum is \(B\);
- The competitive ratio is \(<2\).

```python
def ski_rental(days: int, buy: int) -> int:
    cost = 0
    for _ in range(days):
        if cost < buy - 1:
            cost += 1
        else:
            return cost + buy
    return cost
```

## Cache Replacement

- FIFO/LRU: deterministic;
- Random marking algorithm: \(O(\log k)\)-competitive;
- The offline optimum needs knowledge of the future.

## Simplified LRU in C++

```cpp
#include <list>
#include <unordered_map>

class LRU {
    int cap;
    std::list<int> order;
    std::unordered_map<int, std::list<int>::iterator> pos;
public:
    explicit LRU(int c) : cap(c) {}
    void access(int x) {
        if (pos.count(x)) order.erase(pos[x]);
        else if (static_cast<int>(order.size()) == cap) { pos.erase(order.back()); order.pop_back(); }
        order.push_front(x);
        pos[x] = order.begin();
    }
};
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Input order | An online algorithm cannot reorder the input |
| Competitive ratio | Worst case |
| Randomization | Expected competitive ratio |
| Cache size | Special-case \(k=0\) |

## Exercises

1. Prove the competitive ratio of ski rental.
2. Compare the worst cases of FIFO and LRU.
3. Design an online scheduling strategy and analyse its competitive ratio.

## Sources

- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)

## Navigation

[← Previous](07-approximation.md) · [Level Overview](index.md) · [Next](09-parameterized.md)
