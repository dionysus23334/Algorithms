# 7.1 Advanced Dynamic Programming

> **Level**: Level 7 · Advanced Algorithms and Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Identify interval DP, bitmask DP, digit DP, and rerooting DP;
- Design states and transitions;
- Handle dimensions and initialization.

## Interval DP

Take the "longest palindromic subsequence" as an example:

`dp[l][r]`: the LPS length of `s[l:r+1]`.

\[
dp[l][r]=
\begin{cases}
dp[l+1][r-1]+2,&s[l]=s[r],\\
\max(dp[l+1][r],dp[l][r-1]),&s[l]\ne s[r].
\end{cases}
\]

```python
def lps(s: str) -> int:
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    for i in range(n):
        dp[i][i] = 1
    for length in range(2, n + 1):
        for l in range(n - length + 1):
            r = l + length - 1
            if s[l] == s[r]:
                dp[l][r] = 2 if length == 2 else dp[l+1][r-1] + 2
            else:
                dp[l][r] = max(dp[l+1][r], dp[l][r-1])
    return dp[0][n-1] if n else 0
```

Time/space \(O(n^2)\).

## Bitmask DP

Set states are represented by bitmasks. TSP:

`dp[mask][i]`: the minimum cost when `mask` has been visited and we are currently at `i`.

```python
def tsp(dist: list[list[int]]) -> int:
    n = len(dist)
    INF = 10**18
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1][0] = 0
    for mask in range(1 << n):
        for i in range(n):
            if dp[mask][i] == INF:
                continue
            for j in range(n):
                if mask >> j & 1:
                    continue
                nm = mask | (1 << j)
                dp[nm][j] = min(dp[nm][j], dp[mask][i] + dist[i][j])
    return min(dp[(1 << n) - 1][i] for i in range(n))
```

\(O(2^n n^2)\), with \(n\le20\) or so.

## Digit DP

Count the numbers in \([0,N]\) that satisfy a digit condition: state `pos, tight, started, ...`, with memoization.

## Rerooting DP

First compute subtree information, then obtain global information by rerooting through the parent vertex; two DFS passes, \(O(n)\).

## C++ Interval DP

```cpp
#include <algorithm>
#include <string>
#include <vector>

int lps(const std::string& s) {
    int n = s.size();
    std::vector<std::vector<int>> dp(n, std::vector<int>(n, 0));
    for (int i = 0; i < n; ++i) dp[i][i] = 1;
    for (int len = 2; len <= n; ++len)
        for (int l = 0; l + len - 1 < n; ++l) {
            int r = l + len - 1;
            if (s[l] == s[r]) dp[l][r] = (len == 2 ? 2 : dp[l+1][r-1] + 2);
            else dp[l][r] = std::max(dp[l+1][r], dp[l][r-1]);
        }
    return n ? dp[0][n-1] : 0;
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty string | Return 0 |
| \(n>20\) | Bitmask DP is infeasible |
| Digit DP leading zeros | `started` flag |
| Rerooting | Direction of parent/child information |

## Exercises

1. Use interval DP to find the minimum number of multiplications in matrix-chain multiplication.
2. Use bitmask DP to find the minimum cost of a set partition.
3. Count the integers in \([0,N]\) that do not contain the digit 4.

## Sources

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Level Overview](index.md) · [Next](02-dp-optimization.md)
