# 5.6 Greedy

> **Level**: Level 5 · Core Algorithm Design Methods  
> **Status**: expanded.

## Learning Objectives

- Recognize the greedy-choice property;
- Prove correctness with an exchange argument;
- Know when greedy fails.

## Interval Scheduling

Choose the maximum number of non-overlapping intervals: sort by right endpoint and take an interval whenever it fits.

```python
def max_intervals(intervals: list[tuple[int,int]]) -> int:
    intervals.sort(key=lambda x: x[1])
    count = 0
    end = float("-inf")
    for l, r in intervals:
        if l >= end:
            count += 1
            end = r
    return count
```

Time \(O(n\log n)\).

**Exchange argument**: the first interval of an optimal solution can be replaced by the feasible interval with the smallest right endpoint without reducing the number of intervals that can still be chosen afterwards.

## Huffman Coding

Repeatedly merge the two trees with the smallest frequencies, using a priority queue:

```python
import heapq

def huffman_cost(freq: list[int]) -> int:
    heapq.heapify(freq)
    total = 0
    while len(freq) > 1:
        a = heapq.heappop(freq)
        b = heapq.heappop(freq)
        total += a + b
        heapq.heappush(freq, a + b)
    return total
```

Time \(O(n\log n)\).

## An Example Where Greedy Fails

With coin denominations `{1,3,4}` and a target of 6: greedy picks 4+1+1 (3 coins), while the optimum is 3+3 (2 coins). So greedy requires a proof; intuition is not enough.

## C++ Interval Scheduling

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<std::pair<int,int>> a{{1,3},{2,4},{3,5},{5,6}};
    std::sort(a.begin(), a.end(), [](auto& x, auto& y) { return x.second < y.second; });
    int count = 0, end = -1;
    for (auto [l, r] : a) if (l >= end) { ++count; end = r; }
    std::cout << count << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty set of intervals | return 0 |
| Touching endpoints | whether this counts as overlapping depends on the problem statement |
| Different weights | greedy interval scheduling does not guarantee maximum weight |
| Coin denominations | fails when the greedy-choice property does not hold |

## Exercises

1. Prove interval scheduling with an exchange argument.
2. Construct a minimal counterexample on which greedy fails.
3. Compare the cost of Huffman coding with that of fixed-length codes.

## Sources

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Previous](05-pruning-dedup.md) · [Level Overview](index.md) · [Next](07-dp-intro.md)
