# 5.4 回溯

> **级别**：第 5 级 · 核心算法设计方法  
> **状态**：已展开。

## 学习目标

- 用“选择—递归—撤销”搜索解空间；
- 写子集、排列、组合模板；
- 分析搜索树的规模。

## 模板

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

关键：**撤销必须与选择对称**。

## 子集

```python
def subsets(a: list[int]) -> list[list[int]]:
    out = []
    path = []
    def dfs(i: int) -> None:
        if i == len(a):
            out.append(path.copy())
            return
        dfs(i + 1)          # 不选
        path.append(a[i])   # 选
        dfs(i + 1)
        path.pop()
    dfs(0)
    return out
```

共 \(2^n\) 个结果，时间 \(O(n2^n)\)。

## 排列

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

\(n!\) 个结果。

## N 皇后

逐行放皇后，检查列与两条对角线：

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

## C++ 子集

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

## 边界

| 场景 | 注意 |
|---|---|
| 重复元素 | 需要排序 + 跳过同层重复 |
| 结果去重 | 用集合或规定顺序 |
| 搜索空间大 | 剪枝/记忆化 |
| 递归深度 | 栈溢出 |

## 练习

1. 生成所有组合 \(C(n,k)\)。
2. 处理含重复元素的子集。
3. 用位掩码实现子集枚举，比较与回溯的差异。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 上一章](03-advanced-sorts.md) · [本级总览](index.md) · [下一章](05-pruning-dedup.md)
