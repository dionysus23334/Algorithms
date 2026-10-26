# 4.5 前缀和

> **级别**：第 4 级 · 基础算法与常用技巧  
> **状态**：已展开。

## 学习目标

- 用前缀和把区间查询降到 \(O(1)\)；
- 处理一维与二维；
- 注意下标与空区间。

## 一维前缀和

定义

\[
S[0]=0,\qquad S[i+1]=S[i]+a[i].
\]

则

\[
\sum_{i=l}^{r-1}a[i]=S[r]-S[l].
\]

```python
def build_prefix(a: list[int]) -> list[int]:
    s = [0] * (len(a) + 1)
    for i, x in enumerate(a):
        s[i + 1] = s[i] + x
    return s

def range_sum(s: list[int], l: int, r: int) -> int:
    """sum(a[l:r]), 0 <= l <= r <= n"""
    return s[r] - s[l]
```

建表 \(O(n)\)，查询 \(O(1)\)，空间 \(O(n)\)。

## 二维前缀和

\[
S[i+1][j+1]=S[i][j+1]+S[i+1][j]-S[i][j]+a[i][j].
\]

子矩阵 \((r_1,c_1)\) 到 \((r_2,c_2)\)（不含右下）的和：

\[
S[r_2][c_2]-S[r_1][c_2]-S[r_2][c_1]+S[r_1][c_1].
\]

```python
def build_2d(a: list[list[int]]) -> list[list[int]]:
    n, m = len(a), len(a[0]) if a else 0
    s = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n):
        for j in range(m):
            s[i + 1][j + 1] = s[i][j + 1] + s[i + 1][j] - s[i][j] + a[i][j]
    return s
```

## C++ 一维

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{3, 1, 4, 1, 5};
    std::vector<long long> s(a.size() + 1, 0);
    for (std::size_t i = 0; i < a.size(); ++i) s[i + 1] = s[i] + a[i];
    int l = 1, r = 4; // [1,4)
    std::cout << s[r] - s[l] << '\n';
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 空数组 | 前缀和长度 1，查询返回 0 |
| `l==r` | 空区间，返回 0 |
| 负数 | 前缀和不一定单调，但仍可相减 |
| 大和 | C++ 用 `long long` |

## 练习

1. 用前缀和求数组中正数个数。
2. 实现二维子矩阵和。
3. 用前缀和 + 哈希求“和为 k 的子数组个数”。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## 导航

[← 上一章](04-binary-search.md) · [本级总览](index.md) · [下一章](06-difference.md)
