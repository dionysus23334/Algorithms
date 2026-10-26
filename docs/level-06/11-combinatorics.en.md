# 6.11 Combinatorial Computation

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: expanded.

## Learning Objectives

- Preprocess factorials and inverses to compute binomial coefficients;
- Use inclusion–exclusion to handle "at least" / "at most";
- Watch out for the modulus and overflow.

## Binomial Coefficients

\[
\binom nk=\frac{n!}{k!(n-k)!}.
\]

For a prime modulus \(p\) with \(n<p\), preprocess the factorials and their inverses:

```python
def prepare(n: int, mod: int) -> tuple[list[int], list[int]]:
    fact = [1] * (n + 1)
    for i in range(1, n + 1):
        fact[i] = fact[i-1] * i % mod
    inv_fact = [1] * (n + 1)
    inv_fact[n] = pow(fact[n], mod - 2, mod)
    for i in range(n, 0, -1):
        inv_fact[i-1] = inv_fact[i] * i % mod
    return fact, inv_fact

def comb(n: int, k: int, fact: list[int], inv_fact: list[int], mod: int) -> int:
    if k < 0 or k > n:
        return 0
    return fact[n] * inv_fact[k] % mod * inv_fact[n-k] % mod
```

This requires \(p\) to be prime and \(n<p\) (otherwise use Lucas' theorem).

## Inclusion–Exclusion

\[
|A\cup B|=|A|+|B|-|A\cap B|.
\]

For several sets, enumerate the signs with a bitmask.

```python
def count_divisible(n: int, primes: list[int]) -> int:
    total = 0
    m = len(primes)
    for mask in range(1, 1 << m):
        prod = 1
        bits = 0
        for i in range(m):
            if mask >> i & 1:
                prod *= primes[i]
                bits += 1
        term = n // prod
        total += term if bits % 2 else -term
    return total
```

## C++ Factorials

```cpp
#include <vector>

long long power(long long a, long long e, long long mod) {
    long long r = 1 % mod;
    while (e) { if (e & 1) r = r * a % mod; a = a * a % mod; e >>= 1; }
    return r;
}

std::vector<long long> factorial(int n, long long mod) {
    std::vector<long long> f(n + 1, 1);
    for (int i = 1; i <= n; ++i) f[i] = f[i-1] * i % mod;
    return f;
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| \(k<0\) or \(k>n\) | return 0 |
| \(n\ge p\) | Lucas' theorem |
| Composite modulus | Fermat inverses cannot be used |
| Inclusion–exclusion overflow | reduce the intermediate products modulo |

## Exercises

1. Preprocess binomial coefficients and answer several queries.
2. Use inclusion–exclusion to count how many numbers in \(1..n\) are divisible by at least one of the given primes.
3. Use Lucas' theorem to compute \(\binom nk\bmod p\).

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](10-number-theory.md) · [Level Overview](index.md) · [Next](12-xor.md)
