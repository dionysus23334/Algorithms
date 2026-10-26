# 5.4 Backtracking

> **Level**: Level 5 · Core Algorithm Design Methods  
> **Status**: Expanded.

## Learning Objectives

- Search the solution space with "choose—recurse—undo";
- Write templates for subsets, permutations and combinations;
- Analyze the size of the search tree.

## Template

```python
def backtrack(state, choices, path, result):
    if is_goal(state):
        result.append(path.copy())
        return
    for choice in choices:
        if not valid(state, choice):
            continue
        apply(state, choice)
        path.append(choice)
        backtrack(state, next_choices(choice), path, result)
        path.pop()
        undo(state, choice)
```

The key point: **the undo must be symmetric to the choice**.

## Subsets

```python
def subsets(a: list[int]) -> list[list[int]]:
    out = []
    path = []
    def dfs(i: int) -> None:
        if i == len(a):
            out.append(path.copy())
            return
        dfs(i + 1)          # do not choose
        path.append(a[i])   # choose
        dfs(i + 1)
        path.pop()
    dfs(0)
    return out
```

There are \(2^n\) results in total, and the time is \(O(n2^n)\).

## Permutations

```python
def permutations(a: list[int]) -> list[list[int]]:
    out = []
    used = [False] * len(a)
    path = []
    def dfs() -> None:
        if len(path) == len(a):
            out.append(path.copy())
            return
        for i, x in enumerate(a):
            if used[i]:
                continue
            used[i] = True
            path.append(x)
            dfs()
            path.pop()
            used[i] = False
    dfs()
    return out
```

\(n!\) results.

## N-Queens

Place the queens row by row, checking the column and the two diagonals:

```python
def solve_n_queens(n: int) -> int:
    cols, diag1, diag2 = set(), set(), set()
    count = 0
    def dfs(r: int) -> None:
        nonlocal count
        if r == n:
            count += 1
            return
        for c in range(n):
            if c in cols or (r - c) in diag1 or (r + c) in diag2:
                continue
            cols.add(c); diag1.add(r - c); diag2.add(r + c)
            dfs(r + 1)
            cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)
    dfs(0)
    return count
```

## C++ Subsets

```cpp
#include <iostream>
#include <vector>

void dfs(int i, const std::vector<int>& a, std::vector<int>& path) {
    if (i == static_cast<int>(a.size())) {
        for (int x : path) std::cout << x << ' ';
        std::cout << '\n';
        return;
    }
    dfs(i + 1, a, path);
    path.push_back(a[i]);
    dfs(i + 1, a, path);
    path.pop_back();
}

int main() {
    std::vector<int> a{1, 2, 3}, path;
    dfs(0, a, path);
}
```

## Boundary Cases

| Case | Note |
|---|---|
| Duplicate elements | need sorting plus skipping duplicates at the same level |
| Deduplicating results | use a set or impose an order |
| Large search space | pruning / memoization |
| Recursion depth | stack overflow |

## Exercises

1. Generate all combinations \(C(n,k)\).
2. Handle subsets that contain duplicate elements.
3. Enumerate subsets with bitmasks, and compare the difference from backtracking.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Previous](03-advanced-sorts.md) · [Level Overview](index.md) · [Next](05-pruning-dedup.md)
