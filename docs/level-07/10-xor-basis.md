# 7.10 异或线性基

> **级别**：第 7 级 · 进阶算法与数据结构  
> **状态**：已展开。

## 学习目标

- 用线性基表示异或空间；
- 插入、判断可表示性、求最大异或；
- 理解基的维数。

## 线性基

把每个数看作 \(\mathbb F_2\) 上的向量；线性基是一组极大线性无关向量。插入时从高位消元：

```python
class XorBasis:
    def __init__(self, bits: int = 60) -> None:
        self.b = [0] * bits
        self.bits = bits

    def insert(self, x: int) -> bool:
        for i in range(self.bits - 1, -1, -1):
            if not (x >> i) & 1:
                continue
            if self.b[i] == 0:
                self.b[i] = x
                return True
            x ^= self.b[i]
        return False

    def can_represent(self, x: int) -> bool:
        for i in range(self.bits - 1, -1, -1):
            if (x >> i) & 1:
                if self.b[i] == 0:
                    return False
                x ^= self.b[i]
        return True

    def max_xor(self) -> int:
        ans = 0
        for i in range(self.bits - 1, -1, -1):
            ans = max(ans, ans ^ self.b[i])
        return ans
```

插入/查询 \(O(B)\)，\(B\) 是位宽。

## 性质

- 基的大小 = 异或空间的维数；
- 能表示的数个数 \(2^k\)（含 0）；
- 若插入 0，不增加维数；
- 最大异或从高位贪心。

## C++ 线性基

```cpp
#include <array>

struct XorBasis {
    std::array<long long, 61> b{};
    bool insert(long long x) {
        for (int i = 60; i >= 0; --i) {
            if (!((x >> i) & 1)) continue;
            if (!b[i]) { b[i] = x; return true; }
            x ^= b[i];
        }
        return false;
    }
    long long max_xor() const {
        long long ans = 0;
        for (int i = 60; i >= 0; --i) ans = std::max(ans, ans ^ b[i]);
        return ans;
    }
};
```

## 边界

| 场景 | 注意 |
|---|---|
| 0 | 不增加维数 |
| 负数 | 用无符号/固定位宽 |
| 位宽 | 根据值域选择 |
| 最大异或 | 高位优先 |

## 练习

1. 判断一个数能否由给定集合异或得到。
2. 求第 k 小异或值。
3. 用线性基求最大异或子集。

## 来源

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](09-nt-advanced.md) · [本级总览](index.md) · [下一章](11-computational-geometry.md)
