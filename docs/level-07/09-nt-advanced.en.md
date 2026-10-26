# 7.9 Advanced Number Theory

> **Level**: Level 7 · Advanced Algorithms and Data Structures  
> **Status**: expanded.

## Learning Objectives

- Merge congruences with the CRT;
- Compute Euler's totient function and the order;
- Use Miller–Rabin and Pollard rho for primality testing and factorization.

## Chinese Remainder Theorem (CRT)

Pairwise coprime:

\[
x\equiv a_i\pmod{m_i}.
\]

```python
def crt(a: list[int], m: list[int]) -> tuple[int,int]:
    x, mod = 0, 1
    for ai, mi in zip(a, m):
        g, p, _ = egcd(mod, mi)
        if (ai - x) % g:
            raise ValueError("no solution")
        t = ((ai - x) // g * p) % (mi // g)
        x += mod * t
        mod *= mi // g
        x %= mod
    return x, mod
```

(`egcd` is covered in 6.10.)

## Euler's Totient Function

\(\varphi(n)=n\prod_{p\mid n}(1-1/p)\).

```python
def phi(n: int) -> int:
    res, x, p = n, n, 2
    while p * p <= x:
        if x % p == 0:
            while x % p == 0:
                x //= p
            res -= res // p
        p += 1
    if x > 1:
        res -= res // x
    return res
```

## Order and Primitive Roots

The smallest \(d>0\) such that \(a^d\equiv1\pmod m\) is the order of \(a\); a primitive root generates the entire multiplicative group.

## Miller–Rabin

A probabilistic primality test; for 64-bit integers, fixed bases make it deterministic.

```python
def is_prime(n: int) -> bool:
    if n < 2:
        return False
    for p in (2,3,5,7,11,13,17,19,23,29,31,37):
        if n % p == 0:
            return n == p
    d, s = n - 1, 0
    while d % 2 == 0:
        d //= 2; s += 1
    for a in (2, 325, 9375, 28178, 450775, 9780504, 1795265022):
        if a % n == 0:
            continue
        x = pow(a, d, n)
        if x in (1, n - 1):
            continue
        for _ in range(s - 1):
            x = x * x % n
            if x == n - 1:
                break
        else:
            return False
    return True
```

## Pollard rho

Find a nontrivial factor with a randomized function and recurse together with Miller–Rabin; the expected number of iterations is \(O(n^{1/4})\).

## Boundary Cases

| Scenario | Note |
|---|---|
| CRT moduli not coprime | merge with the extended GCD; a solution may not exist |
| Large integers | Python is convenient; C++ uses `__int128` |
| Probabilistic test | fixed bases or a number of rounds are required |
| Factorization | test primality first, then recurse |

## Exercises

1. Merge three congruences with the CRT.
2. Compute \(\varphi(n)\) and verify the result.
3. Decide a 64-bit integer with Miller–Rabin.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](08-offline-block.md) · [Level Overview](index.md) · [Next](10-xor-basis.md)
