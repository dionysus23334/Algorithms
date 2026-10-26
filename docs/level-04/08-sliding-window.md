# 4.8 滑动窗口

> **级别**：第 4 级 · 基础算法与常用技巧  
> **状态**：已展开。

## 学习目标

- 维护定长/变长窗口；
- 用计数或前缀和快速更新状态；
- 判断窗口收缩条件。

## 定长窗口

长度为 \(k\) 的子数组最大和：

```python
def max_sum_fixed(a: list[int], k: int) -> int:
    if k <= 0 or k > len(a):
        raise ValueError("invalid k")
    window = sum(a[:k])
    best = window
    for i in range(k, len(a)):
        window += a[i] - a[i - k]
        best = max(best, window)
    return best
```

时间 \(O(n)\)，空间 \(O(1)\)。

## 变长窗口：无重复字符的最长子串

```python
def longest_unique(s: str) -> int:
    last = {}
    left = 0
    best = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        best = max(best, right - left + 1)
    return best
```

窗口 `[left, right]` 始终无重复；右端扩展，左端跳到重复字符之后。

## C++ 版本

```cpp
#include <algorithm>
#include <string>
#include <unordered_map>

int longest_unique(const std::string& s) {
    std::unordered_map<char,int> last;
    int left = 0, best = 0;
    for (int right = 0; right < static_cast<int>(s.size()); ++right) {
        char ch = s[right];
        auto it = last.find(ch);
        if (it != last.end() && it->second >= left) left = it->second + 1;
        last[ch] = right;
        best = std::max(best, right - left + 1);
    }
    return best;
}
```

## 适用条件

- 窗口扩张/收缩时，状态可以 \(O(1)\) 更新；
- 问题具有单调性：右端扩张后，左端只需要向右移动，不需要回退。

## 边界

| 场景 | 注意 |
|---|---|
| \(k=0\) 或 \(k>n\) | 非法/空窗口 |
| 空串 | 返回 0 |
| 全相同字符 | 窗口长度 1 |
| 负数数组 | 最大子段和不一定能用滑动窗口（不满足单调性） |

## 练习

1. 求长度最小的子数组，其和 \(\ge\) target（正数数组）。
2. 求至多包含 \(k\) 种不同字符的最长子串。
3. 用滑动窗口统计固定长度窗口的最大值（配合单调队列）。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## 导航

[← 上一章](07-two-pointers.md) · [本级总览](index.md) · [下一章](09-bitwise.md)
