# 6.11 组合计算

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 预处理阶乘与逆元求组合数；
- 用容斥处理“至少/至多”；
- 注意模数与溢出。

## 组合数

\[
\binom nk=\frac{n!}{k!(n-k)!}.
\]

模素数 \(p\) 且 \(n<p\) 时，预处理阶乘与逆元：

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

要求 \(p\) 为素数且 \(n<p\)（否则用 Lucas）。

## 容斥

\[
|A\cup B|=|A|+|B|-|A\cap B|.
\]

多个集合用二进制枚举符号。

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

## C++ 阶乘

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

## 边界

| 场景 | 注意 |
|---|---|
| \(k<0\) 或 \(k>n\) | 返回 0 |
| \(n\ge p\) | Lucas 定理 |
| 模数非素数 | 不能用费马逆元 |
| 容斥溢出 | 中间乘积取模 |

## 练习

1. 预处理组合数并回答多次询问。
2. 用容斥求 \(1..n\) 中至少被一个给定素数整除的个数。
3. 用 Lucas 求 \(\binom nk\bmod p\)。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](10-number-theory.md) · [本级总览](index.md) · [下一章](12-xor.md)
