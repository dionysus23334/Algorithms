# 6.10 基础数论

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 用欧几里得算法求 GCD；
- 用扩展 GCD 求逆元/解线性同余；
- 用快速幂与筛法。

## GCD

```python
def gcd(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return abs(a)
```

时间 \(O(\log \min(a,b))\)。

## 扩展 GCD

求 \(ax+by=\gcd(a,b)\)：

```python
def egcd(a: int, b: int) -> tuple[int,int,int]:
    if b == 0:
        return a, 1, 0
    g, x1, y1 = egcd(b, a % b)
    return g, y1, x1 - (a // b) * y1
```

若 \(\gcd(a,m)=1\)，\(a\) 在模 \(m\) 下的逆元是 `egcd(a,m)[1] % m`。

## 快速幂

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

时间 \(O(\log e)\)。

## 埃氏筛

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

时间 \(O(n\log\log n)\)。

## C++ 快速幂

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

## 边界

| 场景 | 注意 |
|---|---|
| \(a=0\) | `gcd(0,0)=0` 按定义 |
| 负模 | 统一非负余数 |
| 逆元不存在 | \(\gcd\ne1\) |
| 溢出 | 乘法用 `__int128` 或先取模 |

## 练习

1. 用扩展 GCD 解 \(ax\equiv b\pmod m\)。
2. 线性筛求欧拉函数。
3. 用快速幂求逆元。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](09-trie-hash.md) · [本级总览](index.md) · [下一章](11-combinatorics.md)
