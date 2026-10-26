# 5.2 递归复杂度

> **级别**：第 5 级 · 核心算法设计方法  
> **状态**：已展开。

## 学习目标

- 从代码写递推式；
- 用递归树/代入法估计；
- 使用主定理的三种情形。

## 递推式

```python
def f(n: int) -> int:
    if n <= 1:
        return 1
    return f(n // 2) + f(n // 2) + n
```

\[
T(n)=2T(n/2)+O(n).
\]

## 递归树

每层总代价：

- 第 0 层：\(n\)
- 第 1 层：\(n/2+n/2=n\)
- 第 2 层：\(4\cdot n/4=n\)
- 共 \(\log_2 n+1\) 层

总和 \(O(n\log n)\)。

## 主定理

对 \(T(n)=aT(n/b)+f(n)\)，令 \(c=\log_b a\)：

1. 若 \(f(n)=O(n^{c-\varepsilon})\)，则 \(T(n)=\Theta(n^c)\)；
2. 若 \(f(n)=\Theta(n^c)\)，则 \(T(n)=\Theta(n^c\log n)\)；
3. 若 \(f(n)=\Omega(n^{c+\varepsilon})\) 且正则条件成立，则 \(T(n)=\Theta(f(n))\)。

例：

- \(T(n)=2T(n/2)+n\)：\(c=1\)，情形 2，\(O(n\log n)\)；
- \(T(n)=T(n/2)+1\)：\(c=0\)，情形 2，\(O(\log n)\)；
- \(T(n)=2T(n/2)+n^2\)：\(c=1\)，情形 3，\(O(n^2)\)。

## 代入法

猜 \(T(n)\le cn\log n\)，代入：

\[
T(n)\le 2c(n/2)\log(n/2)+n=cn\log n-cn+n\le cn\log n
\]

当 \(c\ge1\)。再验证基本情况。

## 代码计数

```python
def calls(n: int) -> int:
    if n <= 1:
        return 1
    return 1 + calls(n // 2) + calls(n // 2)
```

对 \(n=2^k\)，调用数 \(2n-1\)，符合 \(O(n)\)。

## 边界

| 情况 | 注意 |
|---|---|
| \(n\) 不是 \(b\) 的幂 | 用上下取整，阶不变 |
| 递归深度 | 空间 \(O(\log n)\) 或 \(O(n)\) |
| 主定理不适用 | 子问题规模不等、\(f\) 不满足条件时用递归树/代入 |

## 练习

1. 分析 \(T(n)=4T(n/2)+n\)。
2. 分析 \(T(n)=T(n-1)+n\)。
3. 用递归树验证 \(T(n)=2T(n/2)+n\log n\) 的阶。

## 来源

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Open Data Structures](https://opendatastructures.org/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](01-divide-conquer.md) · [本级总览](index.md) · [下一章](03-advanced-sorts.md)
