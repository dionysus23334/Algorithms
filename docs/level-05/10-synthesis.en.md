# 5.10 Synthesis of Methods

> **Level**: Level 5 · Core Algorithm Design Methods  
> **Status**: expanded.

## Learning Objectives

- Combine binary search on the answer, prefix sums, hashing, sorting and greedy;
- Decide which method a problem calls for;
- Write down the correctness argument and the complexity clearly.

## Binary Search on the Answer

"Minimize the maximum" / "maximize the minimum" problems are common: decide whether \(x\) is feasible, then binary search.

```python
def min_capacity(weights: list[int], days: int) -> int:
    def feasible(cap: int) -> bool:
        used, cur = 1, 0
        for w in weights:
            if w > cap:
                return False
            if cur + w > cap:
                used += 1
                cur = 0
            cur += w
        return used <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

Time \(O(n\log \sum w)\).

## Prefix Sums + Hashing

Count the subarrays whose sum is \(k\):

```python
from collections import defaultdict

def subarray_sum(a: list[int], k: int) -> int:
    count = defaultdict(int)
    count[0] = 1
    prefix = 0
    ans = 0
    for x in a:
        prefix += x
        ans += count[prefix - k]
        count[prefix] += 1
    return ans
```

Time \(O(n)\), space \(O(n)\).

## Sorting + Greedy

Interval scheduling, maximum compatible set, minimum number of meeting rooms:

```python
def min_rooms(intervals: list[tuple[int,int]]) -> int:
    events = []
    for l, r in intervals:
        events.append((l, 1))
        events.append((r, 0))
    events.sort(key=lambda e: (e[0], e[1]))  # earlier end first
    cur = best = 0
    for _, typ in events:
        if typ == 1:
            cur += 1
            best = max(best, cur)
        else:
            cur -= 1
    return best
```

## C++ Binary Search on the Answer

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> w{1,2,3,4,5,6,7,8,9,10};
    int days = 5;
    auto ok = [&](int cap) {
        int used = 1, cur = 0;
        for (int x : w) {
            if (x > cap) return false;
            if (cur + x > cap) { ++used; cur = 0; }
            cur += x;
        }
        return used <= days;
    };
    int lo = *std::max_element(w.begin(), w.end());
    int hi = std::accumulate(w.begin(), w.end(), 0);
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (ok(mid)) hi = mid; else lo = mid + 1;
    }
    std::cout << lo << '\n';
}
```

## Choosing a Method

| Characteristic | Method |
|---|---|
| Monotone predicate + minimize/maximize | binary search on the answer |
| Range sums / subarray counting | prefix sums + hashing |
| Interval overlap / scheduling | sorting + greedy |
| Overlapping subproblems + optimal substructure | DP |
| Enumeration + constraints | backtracking + pruning |

## Boundary Cases

| Scenario | Note |
|---|---|
| Upper bound of the binary search | it must be feasible |
| Empty array | handle it separately |
| Negative values | prefix-sum hashing still works; sliding window may not |
| Interval endpoints | keep open/closed intervals consistent |

## Exercises

1. Use binary search on the answer for the "minimize the maximum" partition problem.
2. Use prefix sums + hashing to find the subarray whose sum is closest to 0.
3. Design a comprehensive problem that needs "sorting + two pointers + binary search".

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Previous](09-sequence-dp.md) · [Level Overview](index.md)
