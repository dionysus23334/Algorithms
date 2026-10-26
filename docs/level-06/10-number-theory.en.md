# 6.10 Basic Number Theory

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: expanded.

## Learning Objectives

- Compute the GCD with the Euclidean algorithm;
- Use the extended GCD to find modular inverses / solve linear congruences;
- Use fast exponentiation and sieves.

## GCD

```python
def gcd(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return abs(a)
```

Time \(O(\log \min(a,b))\).

## Extended GCD

Find \(ax+by=\gcd(a,b)\):

```python
def egcd(a: int, b: int) -> tuple[int,int,int]:
    if b == 0:
        return a, 1, 0
    g, x1, y1 = egcd(b, a % b)
    return g, y1, x1 - (a // b) * y1
```

If \(\gcd(a,m)=1\), the inverse of \(a\) modulo \(m\) is `egcd(a,m)[1] % m`.

## Fast Exponentiation

```python
def power(a: int, e: int, mod: int) -> int:
    res = 1
    a %= mod
    while e:
        if e & 1:
            res = res * a % mod
        a = a * a % mod
        e >>= 1
    return res
```

Time \(O(\log e)\).

## Sieve of Eratosthenes

```python
def primes(n: int) -> list[int]:
    is_prime = [True] * (n + 1)
    is_prime[0:2] = [False, False]
    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, n + 1, i):
                is_prime[j] = False
    return [i for i, v in enumerate(is_prime) if v]
```

Time \(O(n\log\log n)\).

## C++ Fast Exponentiation

```cpp
long long power(long long a, long long e, long long mod) {
    long long r = 1 % mod;
    a %= mod;
    while (e) {
        if (e & 1) r = r * a % mod;
        a = a * a % mod;
        e >>= 1;
    }
    return r;
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| \(a=0\) | `gcd(0,0)=0` by definition |
| Negative modulus | normalize to a non-negative remainder |
| Inverse does not exist | \(\gcd\ne1\) |
| Overflow | use `__int128` for the multiplication, or reduce modulo first |

## Exercises

1. Use the extended GCD to solve \(ax\equiv b\pmod m\).
2. Compute Euler's totient function with a linear sieve.
3. Compute a modular inverse with fast exponentiation.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](09-trie-hash.md) · [Level Overview](index.md) · [Next](11-combinatorics.md)
