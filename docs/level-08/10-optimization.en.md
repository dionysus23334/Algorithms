# 8.10 Optimization Algorithms

> **Level**: Level 8 · Advanced Algorithms and Computational Methods  
> **Status**: Expanded.

## Learning Objectives

- Distinguish convex from non-convex problems;
- Use gradient descent and Newton's method;
- Understand the basic form of linear programming.

## Convexity

A convex function satisfies

\[
f(\lambda x+(1-\lambda)y)\le\lambda f(x)+(1-\lambda)f(y).
\]

For convex optimization, a local optimum is a global optimum; non-convex problems offer no such guarantee.

## Gradient Descent

\[
x_{k+1}=x_k-\eta\nabla f(x_k).
\]

A learning rate that is too large diverges; one that is too small converges slowly.

```python
def gradient_descent(grad, x0: list[float], lr: float = 0.1, steps: int = 1000):
    x = x0[:]
    for _ in range(steps):
        g = grad(x)
        x = [xi - lr * gi for xi, gi in zip(x, g)]
    return x
```

## Newton's Method

\[
x_{k+1}=x_k-H(x_k)^{-1}\nabla f(x_k).
\]

Quadratic convergence, but it requires the Hessian and its inverse; expensive in high dimensions.

## Linear Programming

Standard form:

\[
\min c^{\mathsf T}x\quad\text{s.t. }Ax\le b,\ x\ge0.
\]

Simplex method, interior-point methods; in practice, mature solvers are usually used.

## Gradient Descent in C++

```cpp
#include <vector>

std::vector<double> gradient_descent(
    std::vector<double> (*grad)(const std::vector<double>&),
    std::vector<double> x, double lr = 0.1, int steps = 1000) {
    for (int t = 0; t < steps; ++t) {
        auto g = grad(x);
        for (std::size_t i = 0; i < x.size(); ++i) x[i] -= lr * g[i];
    }
    return x;
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Non-convex | Only local guarantees |
| Learning rate | Requires tuning / line search |
| Scale differences | Normalization / preconditioning |
| Constraints | Projection / penalty / interior point |

## Exercises

1. Use gradient descent to minimize \(x^2+y^2\).
2. Compare convergence for different learning rates.
3. Use Newton's method to solve a two-dimensional convex problem.

## Sources

- [Boyd & Vandenberghe](https://web.stanford.edu/~boyd/cvxbook/)
- [FNC](https://fncbook.com/)
- [MMDS](https://www.mmds.org/)

## Navigation

[← Previous](09-numerical-algorithms.md) · [Level Overview](index.md) · [Next](11-large-scale.md)
