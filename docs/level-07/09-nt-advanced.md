# 7.9 数论进阶

> **级别**：第 7 级 · 进阶算法与数据结构  
> **状态**：已展开。

## 学习目标

- 用 CRT 合并同余；
- 求欧拉函数/阶；
- 用 Miller–Rabin 与 Pollard rho 做素性测试/分解。

## 中国剩余定理（CRT）

两两互素：

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

（`egcd` 见 6.10。）

## 欧拉函数

\(\varphi(n)=n\prod_{p\mid n}(1-1/p)\)。

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

## 阶与原根

最小的 \(d>0\) 使 \(a^d\equiv1\pmod m\) 为 \(a\) 的阶；原根生成整个乘法群。

## Miller–Rabin

概率素性测试；对 64 位整数用固定底数可确定。

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

用随机函数找非平凡因子，配合 Miller–Rabin 递归分解；期望 \(O(n^{1/4})\) 次迭代。

## C++ 实现

```cpp
#include <iostream>

using u64 = unsigned long long;

u64 mul_mod(u64 a, u64 b, u64 mod) {
    return static_cast<u64>((__int128)a * b % mod);
}

u64 pow_mod(u64 a, u64 e, u64 mod) {
    u64 r = 1 % mod;
    while (e) { if (e & 1) r = mul_mod(r, a, mod); a = mul_mod(a, a, mod); e >>= 1; }
    return r;
}

bool is_prime(u64 n) {
    if (n < 2) return false;
    for (u64 p : {2ULL,3ULL,5ULL,7ULL,11ULL,13ULL,17ULL,19ULL,23ULL,29ULL,31ULL,37ULL})
        if (n % p == 0) return n == p;
    u64 d = n - 1; int s = 0;
    while ((d & 1) == 0) { d >>= 1; ++s; }
    for (u64 a : {2ULL,325ULL,9375ULL,28178ULL,450775ULL,9780504ULL,1795265022ULL}) {
        if (a % n == 0) continue;
        u64 x = pow_mod(a, d, n);
        if (x == 1 || x == n - 1) continue;
        bool ok = false;
        for (int r = 1; r < s; ++r) {
            x = mul_mod(x, x, n);
            if (x == n - 1) { ok = true; break; }
        }
        if (!ok) return false;
    }
    return true;
}

int main() { std::cout << is_prime(1000000007ULL) << '\n'; }
```

## 边界

| 场景 | 注意 |
|---|---|
| CRT 模不互素 | 用扩展 GCD 合并，可能无解 |
| 大整数 | Python 方便；C++ 用 `__int128` |
| 概率测试 | 需要固定底数/重复轮数 |
| 分解 | 先判素再递归 |

## 练习

1. 用 CRT 合并三个同余式。
2. 求 \(\varphi(n)\) 并验证。
3. 用 Miller–Rabin 判断 64 位整数。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](08-offline-block.md) · [本级总览](index.md) · [下一章](10-xor-basis.md)
