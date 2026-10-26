# 8.7 Fast Transforms

> **Level**: Level 8 · Advanced Algorithms and Computational Methods  
> **Status**: Expanded.

## Learning Objectives

- Understand convolution and the point-value representation;
- Do convolution modulo a prime with NTT;
- Know the floating-point error of FFT.

## Convolution

\[
c_k=\sum_{i+j=k}a_i b_j.
\]

Direct computation costs \(O(n^2)\); FFT/NTT use pointwise multiplication to achieve \(O(n\log n)\).

## NTT

Modulo \(p=998244353=119\cdot2^{23}+1\) with primitive root \(g=3\), the transform uses the root of unity \(g^{(p-1)/n}\).

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

## Convolution Pipeline

1. Zero-pad to a power of \(2\);
2. Apply the NTT to both arrays separately;
3. Multiply pointwise;
4. Apply the inverse NTT.

## C++ NTT Core

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

## Boundary Cases

| Scenario | Note |
|---|---|
| Length not a power of 2 | Zero-pad |
| Floating-point FFT | Error, rounding |
| Modulus | Must support a large enough \(2^k\) |
| Negative coefficients | Reduce modulo first |

## Exercises

1. Compute the convolution of two polynomials with NTT.
2. Compare big-integer multiplication with NTT convolution.
3. Explain the trade-off between FFT and NTT.

## Sources

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [FNC](https://fncbook.com/)

## Navigation

[← Previous](06-dynamic-trees.md) · [Level Overview](index.md) · [Next](08-numerical-basics.md)
