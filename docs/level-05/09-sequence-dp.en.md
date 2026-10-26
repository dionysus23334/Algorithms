# 5.9 Sequence Dynamic Programming

> **Level**: Level 5 · Core Algorithm Design Methods  
> **Status**: expanded.

## Learning Objectives

- Design a DP whose state is "the first i elements";
- Write LIS, LCS and edit distance;
- Reconstruct the solution, not just the length.

## Longest Increasing Subsequence (LIS)

`dp[i]`: the length of the LIS ending at `a[i]`.

```python
def lis(a: list[int]) -> int:
    if not a:
        return 0
    dp = [1] * len(a)
    for i in range(len(a)):
        for j in range(i):
            if a[j] < a[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)
```

Time \(O(n^2)\); with greedy + binary search this becomes \(O(n\log n)\) (patience sorting).

## Longest Common Subsequence (LCS)

`dp[i][j]`: the length of the LCS of `a[:i]` and `b[:j]`.

```python
def lcs(a: str, b: str) -> int:
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[n][m]
```

## Edit Distance

Insertion, deletion and substitution each cost 1:

```python
def edit_distance(a: str, b: str) -> int:
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n + 1): dp[i][0] = i
    for j in range(m + 1): dp[0][j] = j
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            cost = 0 if a[i-1] == b[j-1] else 1
            dp[i][j] = min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + cost)
    return dp[n][m]
```

## C++ LCS

```cpp
#include <algorithm>
#include <string>
#include <vector>

int lcs(const std::string& a, const std::string& b) {
    int n = a.size(), m = b.size();
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(m + 1, 0));
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            dp[i][j] = (a[i-1] == b[j-1]) ? dp[i-1][j-1] + 1
                                           : std::max(dp[i-1][j], dp[i][j-1]);
    return dp[n][m];
}
```

## Reconstructing the Solution

Backtrack from `dp[n][m]`: on a match take the diagonal step, otherwise move to the larger adjacent state. Either store the choices or read them off the DP table.

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty string | LCS/edit distance are still defined |
| Repeated characters | is the LIS strictly increasing or non-decreasing |
| Space | a two-dimensional table takes \(O(nm)\); it can be rolled to \(O(m)\) |
| Solution reconstruction | a rolling array loses the path |

## Exercises

1. Compute the LIS in \(O(n\log n)\).
2. Output one LCS, not only its length.
3. Give edit distance different insertion/deletion/substitution costs.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Previous](08-knapsack.md) · [Level Overview](index.md) · [Next](10-synthesis.md)
