# 8.8 Foundations of Numerical Computation

> **Level**: Level 8 · Advanced Algorithms and Computational Methods  
> **Status**: Expanded.

## Learning Objectives

- Understand floating-point error and machine precision;
- Distinguish absolute error from relative error;
- Know the difference between condition number and stability.

## Floating-Point Numbers

An IEEE 754 double has about 53 significant binary digits, and machine epsilon is about \(2.2\times10^{-16}\).

```python
eps = 2.0 ** -52
print(eps)                 # 2.220446049250313e-16
print(0.1 + 0.2 == 0.3)    # False
print(abs(0.1 + 0.2 - 0.3) < 1e-12)
```

## Error

- Absolute error: \(|\hat x-x|\);
- Relative error: \(|\hat x-x|/|x|\) (\(x\ne0\));
- Rounding error, truncation error, data error.

## Condition Number

The sensitivity of the problem itself to perturbations of the input. For the solution of \(Ax=b\):

\[
\kappa(A)=\|A\|\|A^{-1}\|.
\]

A large condition number ≠ an unstable algorithm; it says the problem itself is hard.

## Stability

An algorithm is stable if it does not amplify error during computation. For example:

- Subtracting two close numbers loses significant digits;
- When summing, adding the small numbers first may be more stable (Kahan summation).

```python
def kahan_sum(a: list[float]) -> float:
    s = 0.0
    c = 0.0
    for x in a:
        y = x - c
        t = s + y
        c = (t - s) - y
        s = t
    return s
```

## C++ Machine Precision

```cpp
#include <iostream>
#include <limits>

int main() {
    std::cout << std::numeric_limits<double>::epsilon() << '\n';
    std::cout << (0.1 + 0.2 == 0.3) << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Comparing floats | Use a tolerance |
| Subtracting close numbers | May cause catastrophic cancellation |
| Large condition number | The result is extremely sensitive to the input |
| Iteration stopping | Absolute + relative criteria |

## Exercises

1. Compute \(\sum_{i=1}^n 1/i\) with different summation orders.
2. Improve the accuracy with Kahan summation.
3. Estimate the condition number of a matrix and explain it.

## Sources

- [FNC](https://fncbook.com/)
- [Boyd & Vandenberghe](https://web.stanford.edu/~boyd/cvxbook/)
- [cppreference](https://en.cppreference.com/)

## Navigation

[← Previous](07-fft-ntt.md) · [Level Overview](index.md) · [Next](09-numerical-algorithms.md)
