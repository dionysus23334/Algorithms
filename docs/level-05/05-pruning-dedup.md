# 5.5 剪枝与去重

> **级别**：第 5 级 · 核心算法设计方法  
> **状态**：已展开。

## 学习目标

- 用可行性/最优性剪枝减少搜索；
- 处理重复元素导致的重复解；
- 安排搜索顺序提高剪枝效率。

## 可行性剪枝

组合和问题：选若干数使和为 target，超过 target 立即返回。

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
                break                 # 排序后的可行性剪枝
            if i > start and a[i] == a[i - 1]:
                continue              # 同层去重
            path.append(a[i])
            dfs(i + 1, remain - a[i]) # 每个数最多一次
            path.pop()
    dfs(0, target)
    return out
```

## 去重的两种层次

- **同层重复**：`i > start and a[i] == a[i-1]`，避免同一层选相同值；
- **同一元素重复使用**：是否允许由 `dfs(i)` 还是 `dfs(i+1)` 决定。

## 最优性剪枝

求最小代价时，若当前代价已不小于已知最优，剪掉。

## 搜索顺序

优先选择约束最强的分支（例如先填候选少的格子），通常能更早发现失败。

## C++ 组合和

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

## 边界

| 场景 | 注意 |
|---|---|
| 有负数 | 排序后“超过 remain 就 break”不成立 |
| 重复元素 | 先排序，再同层跳过 |
| 空目标 | 空组合是否算解 |
| 剪枝错误 | 可能漏解，必须证明 |

## 练习

1. 生成所有不重复的组合和。
2. 给 N 皇后加“对角线占用”剪枝。
3. 说明为什么有负数时不能简单 `break`。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](04-backtracking.md) · [本级总览](index.md) · [下一章](06-greedy.md)
