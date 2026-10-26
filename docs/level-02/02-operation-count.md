# 2.2 操作次数

> **级别**：第 2 级 · 算法分析基础  
> **状态**：已展开。

## 学习目标

- 用“基本操作次数”比较算法；
- 区分输入规模 \(n\)、循环次数与实际耗时；
- 理解规模减半为什么产生 \(\log n\)。

## 基本操作

先约定什么算一次操作：比较、赋值、算术、数组访问。不同约定会改变常数，但不改变增长阶。

```python
def linear_search(a: list[int], x: int) -> int:
    ops = 0
    for i, value in enumerate(a):
        ops += 1          # comparison
        if value == x:
            return i, ops
    return -1, ops
```

最坏情况比较 \(n\) 次；最好情况 1 次；平均约 \(n/2\) 次（假设等概率且存在）。

## 规模减半

```python
def binary_search(a: list[int], x: int) -> tuple[int, int]:
    lo, hi = 0, len(a)
    ops = 0
    while lo < hi:
        mid = (lo + hi) // 2
        ops += 1
        if a[mid] < x:
            lo = mid + 1
        else:
            hi = mid
    return lo, ops
```

每轮区间长度约减半：\(n,n/2,n/4,\dots,1\)，最多 \(\lceil\log_2(n+1)\rceil\) 轮。

## C++ 操作计数

```cpp
#include <iostream>
#include <vector>

std::pair<int,int> linear_search(const std::vector<int>& a, int x) {
    int ops = 0;
    for (int i = 0; i < static_cast<int>(a.size()); ++i) {
        ++ops;
        if (a[i] == x) return {i, ops};
    }
    return {-1, ops};
}

int main() {
    std::vector<int> a{1, 3, 5, 7, 9};
    auto [i, ops] = linear_search(a, 7);
    std::cout << i << ' ' << ops << '\n';
}
```

## 常见循环次数

| 代码形状 | 次数 | 增长 |
|---|---|---|
| `for i in range(n)` | \(n\) | 线性 |
| 双重 `for` | \(n^2\) | 平方 |
| `while n > 1: n //= 2` | \(\log_2 n\) | 对数 |
| 每轮 `i *= 2` 直到 \(n\) | \(\log_2 n\) | 对数 |
| 递归 \(T(n)=2T(n/2)+n\) | \(n\log n\) | 线性对数 |

## 边界与注意

- 操作计数是**模型**，不等于真实时间；缓存、分支预测、解释器开销都会影响常数；
- 最好/最坏/平均情况要分别说明；
- 小 \(n\) 时低增长算法不一定更快；
- 计数代码本身会增加开销，只用于分析，不要放进生产路径。

## 练习

1. 给二分查找加计数，验证 \(n=10^3,10^6\) 时操作数约为 \(\log_2 n\)。
2. 写出三重循环 \(\sum_{i<j<k}1\) 的操作次数公式。
3. 比较“每轮 \(i+=1\)”与“每轮 \(i*=2\)”的循环次数。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](01-problem-definition.md) · [本级总览](index.md) · [下一章](03-time-complexity.md)
