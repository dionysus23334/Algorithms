# 5.5 Pruning and Deduplication

> **Level**: Level 5 · Core Algorithm Design Methods  
> **Status**: expanded.

## Learning Objectives

- Use feasibility/optimality pruning to reduce the search;
- Handle duplicate solutions caused by repeated elements;
- Arrange the search order to make pruning more effective.

## Feasibility Pruning

Combination-sum problem: choose several numbers so that their sum equals `target`; return immediately once the sum exceeds `target`.

```python
def combination_sum(a: list[int], target: int) -> list[list[int]]:
    a.sort()
    out, path = [], []
    def dfs(start: int, remain: int) -> None:
        if remain == 0:
            out.append(path.copy())
            return
        for i in range(start, len(a)):
            if a[i] > remain:
                break                 # feasibility pruning after sorting
            if i > start and a[i] == a[i - 1]:
                continue              # deduplication within the same level
            path.append(a[i])
            dfs(i + 1, remain - a[i]) # each number is used at most once
            path.pop()
    dfs(0, target)
    return out
```

## The Two Levels of Deduplication

- **Duplicates within the same level**: `i > start and a[i] == a[i-1]`, which avoids choosing the same value at the same level;
- **Reuse of the same element**: whether this is allowed is determined by `dfs(i)` versus `dfs(i+1)`.

## Optimality Pruning

When minimizing cost, if the current cost is already no smaller than the best known cost, prune the branch.

## Search Order

Prefer the branch with the strongest constraints (for example, fill the cell with the fewest candidates first); this usually makes failures show up earlier.

## C++ Combination Sum

```cpp
#include <algorithm>
#include <vector>

void dfs(int start, int remain, const std::vector<int>& a,
         std::vector<int>& path, std::vector<std::vector<int>>& out) {
    if (remain == 0) { out.push_back(path); return; }
    for (int i = start; i < static_cast<int>(a.size()); ++i) {
        if (a[i] > remain) break;
        if (i > start && a[i] == a[i - 1]) continue;
        path.push_back(a[i]);
        dfs(i + 1, remain - a[i], a, path, out);
        path.pop_back();
    }
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Negative numbers present | after sorting, "break once `remain` is exceeded" no longer holds |
| Duplicate elements | sort first, then skip within the same level |
| Empty target | whether the empty combination counts as a solution |
| Incorrect pruning | may miss solutions; a proof is required |

## Exercises

1. Generate all distinct combination sums.
2. Add a "diagonal occupancy" pruning rule to N-Queens.
3. Explain why a simple `break` is invalid when negative numbers are present.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](04-backtracking.md) · [Level Overview](index.md) · [Next](06-greedy.md)
