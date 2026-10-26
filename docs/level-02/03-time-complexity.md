# 2.3 时间复杂度

> **级别**：第 2 级 · 算法分析基础  
> **状态**：已展开。

## 学习目标

- 用 \(O,\Omega,\Theta\) 描述增长上界、下界与紧确界；
- 识别常数、对数、线性、线性对数、平方、指数；
- 知道复杂度省略常数但不省略输入规模。

## 定义

对非负函数 \(f,g\)：

- \(f(n)=O(g(n))\)：存在 \(c>0,n_0\)，使 \(n\ge n_0\) 时 \(f(n)\le cg(n)\)；
- \(f(n)=\Omega(g(n))\)：存在 \(c>0,n_0\)，使 \(f(n)\ge cg(n)\)；
- \(f(n)=\Theta(g(n))\)：同时是 \(O\) 与 \(\Omega\)。

\(O\) 是上界，不是“精确时间”。说“这个算法是 \(O(n^2)\)”并不排除它其实是 \(O(n)\)。

## 常见增长

| 复杂度 | 典型来源 | \(n=10^6\) 的直觉 |
|---|---|---|
| \(O(1)\) | 数组下标、哈希平均 | 极快 |
| \(O(\log n)\) | 二分、平衡树 | 约 20 次 |
| \(O(n)\) | 一次遍历 | \(10^6\) |
| \(O(n\log n)\) | 归并/堆排序 | 约 \(2\times10^7\) |
| \(O(n^2)\) | 双重循环 | \(10^{12}\)，通常不可接受 |
| \(O(2^n)\) | 子集枚举 | 只能很小 |

## 代码对照

```python
def constant(a: list[int]) -> int:
    return a[0] if a else -1

def linear(a: list[int]) -> int:
    total = 0
    for x in a:
        total += x
    return total

def quadratic(a: list[int]) -> int:
    count = 0
    for i in range(len(a)):
        for j in range(i + 1, len(a)):
            count += 1
    return count

def logarithmic(n: int) -> int:
    steps = 0
    while n > 1:
        n //= 2
        steps += 1
    return steps
```

C++：

```cpp
#include <vector>

long long linear(const std::vector<int>& a) {
    long long total = 0;
    for (int x : a) total += x;
    return total;
}

long long quadratic(const std::vector<int>& a) {
    long long count = 0;
    for (int i = 0; i < static_cast<int>(a.size()); ++i)
        for (int j = i + 1; j < static_cast<int>(a.size()); ++j)
            ++count;
    return count;
}
```

## 嵌套循环怎么算

```text
for i in 1..n:
    for j in 1..i:
        op
```

次数 \(\sum_{i=1}^n i=n(n+1)/2=\Theta(n^2)\)。

```text
for i in 1..n:
    for j in 1..n step i:
        op
```

次数 \(n\sum_{i=1}^n 1/i=\Theta(n\log n)\)（调和级数）。

## 递归复杂度

- \(T(n)=T(n-1)+O(1)\)：\(O(n)\)；
- \(T(n)=T(n/2)+O(1)\)：\(O(\log n)\)；
- \(T(n)=2T(n/2)+O(n)\)：\(O(n\log n)\)；
- \(T(n)=2T(n-1)+O(1)\)：\(O(2^n)\)。

## 边界与陷阱

- 不要把“循环层数”直接当复杂度；要看每层次数；
- 平均情况需要概率假设，不能默认；
- 递归的空间要算调用栈；
- 常数很大的 \(O(n)\) 可能比小常数 \(O(n\log n)\) 慢；
- 复杂度是渐近的，小规模要实测。

## 练习

1. 判断 \(3n^2+5n+7\) 的 \(O,\Omega,\Theta\)。
2. 分析 `for i in range(n): for j in range(0,n,i+1)` 的复杂度。
3. 证明 \(n!=\Omega(2^n)\)，并说明这对枚举算法意味着什么。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](02-operation-count.md) · [本级总览](index.md) · [下一章](04-space-complexity.md)
