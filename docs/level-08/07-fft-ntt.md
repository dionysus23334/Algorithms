# 8.7 快速变换

> **级别**：第 8 级 · 高级算法与计算方法  
> **状态**：已展开。

## 学习目标

- 理解卷积与点值表示；
- 用 NTT 在模素数下做卷积；
- 知道 FFT 的浮点误差。

## 卷积

\[
c_k=\sum_{i+j=k}a_i b_j.
\]

直接计算 \(O(n^2)\)；FFT/NTT 用点值乘法做到 \(O(n\log n)\)。

## NTT

在模 \(p=998244353=119\cdot2^{23}+1\)、原根 \(g=3\) 下，用单位根 \(g^{(p-1)/n}\) 做变换。

```python
MOD = 998244353
G = 3

def ntt(a: list[int], invert: bool = False) -> None:
    n = len(a)
    j = 0
    for i in range(1, n):
        bit = n >> 1
        while j & bit:
            j ^= bit
            bit >>= 1
        j ^= bit
        if i < j:
            a[i], a[j] = a[j], a[i]

    length = 2
    while length <= n:
        wlen = pow(G, (MOD - 1) // length, MOD)
        if invert:
            wlen = pow(wlen, MOD - 2, MOD)
        for i in range(0, n, length):
            w = 1
            for j in range(i, i + length // 2):
                u, v = a[j], a[j + length // 2] * w % MOD
                a[j] = (u + v) % MOD
                a[j + length // 2] = (u - v) % MOD
                w = w * wlen % MOD
        length <<= 1
    if invert:
        inv_n = pow(n, MOD - 2, MOD)
        for i in range(n):
            a[i] = a[i] * inv_n % MOD
```

## 卷积流程

1. 补零到 \(2\) 的幂；
2. 两个数组分别 NTT；
3. 点乘；
4. 逆 NTT。

## C++ NTT 核心

```cpp
#include <vector>

constexpr int MOD = 998244353, G = 3;

long long mod_pow(long long a, long long e) {
    long long r = 1;
    while (e) { if (e & 1) r = r * a % MOD; a = a * a % MOD; e >>= 1; }
    return r;
}

void ntt(std::vector<int>& a, bool invert) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; ++i) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) std::swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        int wlen = mod_pow(G, (MOD - 1) / len);
        if (invert) wlen = mod_pow(wlen, MOD - 2);
        for (int i = 0; i < n; i += len) {
            long long w = 1;
            for (int j = 0; j < len / 2; ++j) {
                int u = a[i+j], v = a[i+j+len/2] * w % MOD;
                a[i+j] = (u + v) % MOD;
                a[i+j+len/2] = (u - v + MOD) % MOD;
                w = w * wlen % MOD;
            }
        }
    }
    if (invert) {
        long long inv_n = mod_pow(n, MOD - 2);
        for (int& x : a) x = x * inv_n % MOD;
    }
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 长度不是 2 的幂 | 补零 |
| 浮点 FFT | 误差、舍入 |
| 模数 | 必须支持足够大的 \(2^k\) |
| 负数系数 | 先取模 |

## 练习

1. 用 NTT 计算两个多项式的卷积。
2. 比较大整数乘法与 NTT 卷积。
3. 说明 FFT 与 NTT 的取舍。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [FNC](https://fncbook.com/)

## 导航

[← 上一章](06-dynamic-trees.md) · [本级总览](index.md) · [下一章](08-numerical-basics.md)
