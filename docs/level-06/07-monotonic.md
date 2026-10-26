# 6.7 单调结构

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 用单调栈求“下一个更大元素”；
- 用单调队列求滑动窗口最值；
- 说明为什么每个元素最多进出一次。

## 下一个更大元素

```python
def next_greater(a: list[int]) -> list[int]:
    n = len(a)
    ans = [-1] * n
    st = []
    for i, x in enumerate(a):
        while st and a[st[-1]] < x:
            ans[st.pop()] = x
        st.append(i)
    return ans
```

时间 \(O(n)\)：每个下标最多入栈/出栈一次。

## 滑动窗口最大值

```python
from collections import deque

def max_sliding_window(a: list[int], k: int) -> list[int]:
    if k <= 0 or k > len(a):
        raise ValueError("invalid k")
    q = deque()  # indices, values decreasing
    out = []
    for i, x in enumerate(a):
        while q and a[q[-1]] <= x:
            q.pop()
        q.append(i)
        if q[0] <= i - k:
            q.popleft()
        if i >= k - 1:
            out.append(a[q[0]])
    return out
```

## C++ 单调栈

```cpp
#include <iostream>
#include <stack>
#include <vector>

int main() {
    std::vector<int> a{2, 1, 3, 5, 4};
    std::vector<int> ans(a.size(), -1);
    std::stack<int> st;
    for (int i = 0; i < static_cast<int>(a.size()); ++i) {
        while (!st.empty() && a[st.top()] < a[i]) {
            ans[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }
    for (int x : ans) std::cout << x << ' ';
}
```

## 适用条件

- 需要找“左/右第一个更大/更小”；
- 窗口最值；
- 直方图最大矩形；
- 单调队列优化 DP。

## 边界

| 场景 | 注意 |
|---|---|
| 空数组 | 返回空 |
| 全部相等 | 是否算“更大”按严格/非严格 |
| 窗口 \(k=1\) | 输出原数组 |
| 窗口 \(k>n\) | 非法 |

## 练习

1. 求下一个更小元素。
2. 用单调栈求直方图最大矩形。
3. 用单调队列优化多重背包。

## 来源

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](06-range-ds.md) · [本级总览](index.md) · [下一章](08-string-matching.md)
