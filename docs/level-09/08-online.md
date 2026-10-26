# 9.8 在线算法

> **级别**：第 9 级 · 算法理论与计算边界  
> **状态**：已展开。

## 学习目标

- 理解在线决策与竞争比；
- 分析 ski rental；
- 了解缓存替换。

## 竞争比

在线算法 \(ALG\) 与离线最优 \(OPT\) 满足

\[
ALG\le c\cdot OPT
\]

称 \(c\)-竞争。输入顺序未知，不能回退。

## Ski rental

滑雪者每次租雪板花 1，买雪板花 \(B\)。不知道会滑几次。

策略：先租 \(B-1\) 次，之后买。

- 若总次数 \(<B\)：花费 \(k\le B-1\)，最优也是 \(k\)；
- 若总次数 \(\ge B\)：花费 \((B-1)+B=2B-1\)，最优 \(B\)；
- 竞争比 \(<2\)。

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

## 缓存替换

- FIFO/LRU：确定性；
- 随机标记算法：\(O(\log k)\) 竞争；
- 离线最优需要知道未来。

## C++ LRU 简化

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

## 边界

| 场景 | 注意 |
|---|---|
| 输入顺序 | 在线算法不能重排 |
| 竞争比 | 最坏情况 |
| 随机化 | 期望竞争比 |
| 缓存大小 | \(k=0\) 特判 |

## 练习

1. 证明 ski rental 的竞争比。
2. 比较 FIFO/LRU 的最坏情况。
3. 设计一个在线调度策略并分析竞争比。

## 来源

- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)

## 导航

[← 上一章](07-approximation.md) · [本级总览](index.md) · [下一章](09-parameterized.md)
