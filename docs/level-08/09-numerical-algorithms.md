# 8.9 数值算法

> **级别**：第 8 级 · 高级算法与计算方法  
> **状态**：已展开。

## 学习目标

- 用二分/Newton 求根；
- 用高斯消元解线性方程组；
- 用插值与数值积分。

## 二分求根

要求 \(f(a)f(b)<0\) 且连续：

```python
def bisect(f, a: float, b: float, eps: float = 1e-12) -> float:
    if f(a) * f(b) > 0:
        raise ValueError("no sign change")
    while b - a > eps:
        m = (a + b) / 2
        if f(a) * f(m) <= 0:
            b = m
        else:
            a = m
    return (a + b) / 2
```

## Newton 法

\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}.
\]

局部二次收敛，但需要导数与好的初值。

```python
def newton(f, df, x0: float, eps: float = 1e-12, it: int = 100) -> float:
    x = x0
    for _ in range(it):
        fx = f(x)
        if abs(fx) < eps:
            return x
        d = df(x)
        if d == 0:
            raise ZeroDivisionError("zero derivative")
        x -= fx / d
    return x
```

## 高斯消元

列主元消元，避免小主元放大误差。

```python
def gauss(a: list[list[float]], b: list[float]) -> list[float]:
    n = len(a)
    for col in range(n):
        piv = max(range(col, n), key=lambda r: abs(a[r][col]))
        if abs(a[piv][col]) < 1e-12:
            raise ValueError("singular")
        a[col], a[piv] = a[piv], a[col]
        b[col], b[piv] = b[piv], b[col]
        for r in range(col + 1, n):
            f = a[r][col] / a[col][col]
            for c in range(col, n):
                a[r][c] -= f * a[col][c]
            b[r] -= f * b[col]
    x = [0.0] * n
    for i in range(n - 1, -1, -1):
        x[i] = (b[i] - sum(a[i][j] * x[j] for j in range(i + 1, n))) / a[i][i]
    return x
```

## C++ 二分

```cpp
#include <cmath>

double bisect(double (*f)(double), double a, double b, double eps = 1e-12) {
    while (b - a > eps) {
        double m = (a + b) / 2;
        if (f(a) * f(m) <= 0) b = m; else a = m;
    }
    return (a + b) / 2;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 无根/多根 | 需要区间与单调性 |
| 导数为 0 | Newton 失败 |
| 奇异矩阵 | 主元接近 0 |
| 病态矩阵 | 条件数大 |

## 练习

1. 用二分求 \(\sqrt2\)。
2. 用 Newton 求 \(x^3-2=0\)。
3. 用高斯消元解三对角方程组。

## 来源

- [FNC](https://fncbook.com/)
- [Boyd & Vandenberghe](https://web.stanford.edu/~boyd/cvxbook/)
- [cppreference](https://en.cppreference.com/)

## 导航

[← 上一章](08-numerical-basics.md) · [本级总览](index.md) · [下一章](10-optimization.md)
