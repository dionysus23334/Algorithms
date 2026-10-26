# 8.9 Numerical Algorithms

> **Level**: Level 8 · Advanced Algorithms and Computational Methods  
> **Status**: Expanded.

## Learning Objectives

- Use bisection/Newton's method for root finding;
- Solve systems of linear equations with Gaussian elimination;
- Use interpolation and numerical integration.

## Bisection Root Finding

Requires \(f(a)f(b)<0\) and continuity:

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

## Newton's Method

\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}.
\]

Locally quadratically convergent, but it requires the derivative and a good initial value.

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

## Gaussian Elimination

Elimination with partial pivoting avoids small pivots amplifying error.

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

## Bisection in C++

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

## Boundary Cases

| Scenario | Note |
|---|---|
| No root / multiple roots | Requires a bracketing interval and monotonicity |
| Zero derivative | Newton's method fails |
| Singular matrix | Pivot close to 0 |
| Ill-conditioned matrix | Large condition number |

## Exercises

1. Use bisection to compute \(\sqrt2\).
2. Use Newton's method to solve \(x^3-2=0\).
3. Use Gaussian elimination to solve a tridiagonal system.

## Sources

- [FNC](https://fncbook.com/)
- [Boyd & Vandenberghe](https://web.stanford.edu/~boyd/cvxbook/)
- [cppreference](https://en.cppreference.com/)

## Navigation

[← Previous](08-numerical-basics.md) · [Level Overview](index.md) · [Next](10-optimization.md)
