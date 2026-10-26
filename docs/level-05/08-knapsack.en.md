# 5.8 Knapsack Problems

> **Level**: Level 5 · Core Algorithm Design Methods  
> **Status**: expanded.

## Learning Objectives

- Write the 0/1 knapsack and the unbounded knapsack;
- Understand the iteration order of the one-dimensional space optimization;
- Handle unreachable states and boundaries.

## 0/1 Knapsack

Each item can be chosen at most once, with capacity \(W\), value \(v_i\), and weight \(w_i\).

State `dp[j]`: the maximum value with capacity not exceeding \(j\).

```python
def knapsack_01(weights: list[int], values: list[int], W: int) -> int:
    dp = [0] * (W + 1)
    for w, v in zip(weights, values):
        for j in range(W, w - 1, -1):   # reverse order: each item is used only once
            dp[j] = max(dp[j], dp[j - w] + v)
    return dp[W]
```

Time \(O(nW)\), space \(O(W)\).

## Unbounded Knapsack

Each item can be used infinitely many times, so the inner loop runs in forward order:

```python
def knapsack_complete(weights: list[int], values: list[int], W: int) -> int:
    dp = [0] * (W + 1)
    for w, v in zip(weights, values):
        for j in range(w, W + 1):       # forward order: items may be chosen repeatedly
            dp[j] = max(dp[j], dp[j - w] + v)
    return dp[W]
```

## Initialization and Unreachable States

If "exactly filled" is required, set `dp[0]=0` and the rest to `-inf`; a negative final `dp[W]` then means unreachable.

```python
NEG = float("-inf")
dp = [NEG] * (W + 1)
dp[0] = 0
```

## C++ 0/1 Knapsack

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> w{1, 3, 4}, v{15, 20, 30};
    int W = 4;
    std::vector<int> dp(W + 1, 0);
    for (int i = 0; i < static_cast<int>(w.size()); ++i)
        for (int j = W; j >= w[i]; --j)
            dp[j] = std::max(dp[j], dp[j - w[i]] + v[i]);
    std::cout << dp[W] << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| \(W=0\) | only items of weight 0 can be chosen |
| Weight 0 | both forward and reverse orders must avoid unbounded profit |
| Exactly filled | initialize with `-inf` |
| Large \(W\) | \(O(nW)\) may be infeasible; consider other models |

## Exercises

1. Output the chosen items, not only the maximum value.
2. Implement the knapsack with two-dimensional costs.
3. Compare the iteration order of the 0/1 and unbounded knapsacks.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](07-dp-intro.md) · [Level Overview](index.md) · [Next](09-sequence-dp.md)
