# 7.10 XOR Linear Basis

> **Level**: Level 7 · Advanced Algorithms and Data Structures  
> **Status**: expanded.

## Learning Objectives

- Represent the XOR space with a linear basis;
- Insert, test representability, and compute the maximum XOR;
- Understand the dimension of a basis.

## Linear Basis

Treat each number as a vector over \(\mathbb F_2\); a linear basis is a maximal set of linearly independent vectors. Insertion eliminates starting from the highest bit:

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

Insertion/query takes \(O(B)\), where \(B\) is the bit width.

## Properties

- The size of the basis equals the dimension of the XOR space;
- The number of representable values is \(2^k\) (including 0);
- Inserting 0 does not increase the dimension;
- The maximum XOR is computed greedily from the highest bit.

## C++ Linear Basis

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

## Boundary Cases

| Scenario | Note |
|---|---|
| 0 | does not increase the dimension |
| Negative numbers | use unsigned values or a fixed bit width |
| Bit width | choose according to the value range |
| Maximum XOR | highest bit first |

## Exercises

1. Decide whether a number can be obtained by XORing elements of a given set.
2. Compute the k-th smallest XOR value.
3. Use a linear basis to find the maximum-XOR subset.

## Sources

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](09-nt-advanced.md) · [Level Overview](index.md) · [Next](11-computational-geometry.md)
