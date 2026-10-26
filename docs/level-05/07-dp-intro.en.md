# 5.7 Introduction to Dynamic Programming

> **Level**: Level 5 · Core Algorithm Design Methods  
> **Status**: expanded.

## Learning Objectives

- Define states and transitions;
- Write memoized and bottom-up solutions;
- Determine the traversal order and the boundaries.

## State Design

Take grid paths as an example: from \((0,0)\) to \((n-1,m-1)\), moving only right or down, count the number of paths.

State `dp[i][j]`: the number of paths reaching \((i,j)\).

Transition:

\[
dp[i][j]=dp[i-1][j]+dp[i][j-1].
\]

Boundary: the first row and the first column each have only 1 path.

```python
def grid_paths(n: int, m: int) -> int:
    dp = [[0] * m for _ in range(n)]
    for i in range(n):
        for j in range(m):
            if i == 0 or j == 0:
                dp[i][j] = 1
            else:
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[n-1][m-1]
```

Time/space \(O(nm)\); a rolling array can reduce the space to \(O(m)\).

## Memoization

```python
from functools import lru_cache

@lru_cache(None)
def climb(n: int) -> int:
    if n <= 1:
        return 1
    return climb(n - 1) + climb(n - 2)
```

Top-down: only the needed states are computed; watch out for the recursion depth.

## C++ Grid

```cpp
#include <iostream>
#include <vector>

long long grid_paths(int n, int m) {
    std::vector<std::vector<long long>> dp(n, std::vector<long long>(m, 0));
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j)
            dp[i][j] = (i == 0 || j == 0) ? 1 : dp[i-1][j] + dp[i][j-1];
    return dp[n-1][m-1];
}

int main() { std::cout << grid_paths(3, 4) << '\n'; }
```

## The Four Questions of DP

1. What is the state?
2. Which old states does the transition come from?
3. What are the boundaries?
4. In what order is the table computed?

## Boundary Cases

| Scenario | Note |
|---|---|
| \(n=0\) or \(m=0\) | definition of the number of paths |
| Large numbers | the result may overflow; take a modulus or use big integers |
| Recursive memoization | depth and cache space |
| Repeated states | ensure the no-aftereffect property |

## Exercises

1. Optimize grid paths with a rolling array.
2. Count grid paths with obstacles.
3. Compare the time/space of memoization and bottom-up.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Previous](06-greedy.md) · [Level Overview](index.md) · [Next](08-knapsack.md)
