# 4.9 位运算

> **级别**：第 4 级 · 基础算法与常用技巧  
> **状态**：已展开。

## 学习目标

- 掌握 AND、OR、XOR、移位、掩码；
- 用 `x & -x` 取最低位 1；
- 用位掩码枚举子集。

## 基本运算

| 运算 | 含义 |
|---|---|
| `a & b` | 按位与 |
| `a | b` | 按位或 |
| `a ^ b` | 按位异或 |
| `~a` | 按位取反 |
| `a << k` | 左移 \(k\) 位，等价于乘 \(2^k\)（无溢出时） |
| `a >> k` | 右移 \(k\) 位 |

优先级：移位低于加减，高于比较；不确定时加括号。

## 常用技巧

```python
x = 0b101100
print(x & 1)          # 最低位
print(x & -x)         # 最低位的 1
print(x ^ x)          # 0
print(x.bit_length()) # 位数
```

### 统计 1 的个数

```python
def popcount(x: int) -> int:
    count = 0
    while x:
        x &= x - 1
        count += 1
    return count
```

每次消掉最低位的 1，时间 \(O(\text{popcount})\)。

### 判断奇偶

`x & 1` 比 `x % 2` 更直接；对负数要确认语言语义。

## 子集枚举

```python
n = 4
for mask in range(1 << n):
    subset = [i for i in range(n) if mask >> i & 1]
    print(mask, subset)
```

共 \(2^n\) 个子集；\(n\le20\) 左右才可行。

## C++ 位运算

```cpp
#include <iostream>

int main() {
    unsigned x = 0b101100u;
    std::cout << (x & 1u) << '\n';
    std::cout << (x & (~x + 1u)) << '\n'; // lowest set bit
    std::cout << __builtin_popcount(x) << '\n';
}
```

C++20 可用 `std::popcount`；无符号移位定义明确，有符号右移依赖实现。

## 异或前缀

区间异或 \([l,r)\)：

```python
def xor_prefix(a: list[int]) -> list[int]:
    p = [0] * (len(a) + 1)
    for i, x in enumerate(a):
        p[i + 1] = p[i] ^ x
    return p
```

查询 `p[r] ^ p[l]`。

## 边界

| 场景 | 注意 |
|---|---|
| 负数 | Python 无限位补码语义；C++ 有符号移位需谨慎 |
| 移位位数 | 超过位宽是未定义行为 |
| 溢出 | 左移可能溢出 |
| 位宽 | 用 `unsigned` / 固定宽度类型明确 |

## 练习

1. 判断一个数是否为 2 的幂。
2. 用异或找出数组中唯一出现一次的数（其余出现两次）。
3. 枚举 \(n=20\) 的所有子集，统计满足某条件的子集数。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cppreference](https://en.cppreference.com/)

## 导航

[← 上一章](08-sliding-window.md) · [本级总览](index.md) · [下一章](10-discretization.md)
