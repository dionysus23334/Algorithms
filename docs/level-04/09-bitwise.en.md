# 4.9 Bitwise Operations

> **Level**: Level 4 · Basic Algorithms and Techniques  
> **Status**: Expanded.

## Learning Objectives

- Master AND, OR, XOR, shifts and masks;
- Use `x & -x` to isolate the lowest set bit;
- Enumerate subsets with bitmasks.

## Basic Operations

| Operation | Meaning |
|---|---|
| `a & b` | bitwise AND |
| `a | b` | bitwise OR |
| `a ^ b` | bitwise XOR |
| `~a` | bitwise NOT |
| `a << k` | shift left by \(k\) bits, equivalent to multiplying by \(2^k\) (when there is no overflow) |
| `a >> k` | shift right by \(k\) bits |

Precedence: shifts bind less tightly than addition and subtraction but more tightly than comparison; add parentheses when unsure.

## Common Techniques

```python
x = 0b101100
print(x & 1)          # lowest bit
print(x & -x)         # lowest set bit
print(x ^ x)          # 0
print(x.bit_length()) # number of bits
```

### Counting the Number of 1 Bits

```python
def popcount(x: int) -> int:
    count = 0
    while x:
        x &= x - 1
        count += 1
    return count
```

Each step clears the lowest set bit; time \(O(\text{popcount})\).

### Parity Check

`x & 1` is more direct than `x % 2`; for negative numbers, confirm the language semantics.

## Subset Enumeration

```python
n = 4
for mask in range(1 << n):
    subset = [i for i in range(n) if mask >> i & 1]
    print(mask, subset)
```

There are \(2^n\) subsets in total; this is feasible only for roughly \(n\le20\).

## Bitwise Operations in C++

```cpp
#include <iostream>

int main() {
    unsigned x = 0b101100u;
    std::cout << (x & 1u) << '\n';
    std::cout << (x & (~x + 1u)) << '\n'; // lowest set bit
    std::cout << __builtin_popcount(x) << '\n';
}
```

C++20 provides `std::popcount`; unsigned shifts are well defined, while signed right shift is implementation-defined.

## XOR Prefix

Range XOR over \([l,r)\):

```python
def xor_prefix(a: list[int]) -> list[int]:
    p = [0] * (len(a) + 1)
    for i, x in enumerate(a):
        p[i + 1] = p[i] ^ x
    return p
```

Query with `p[r] ^ p[l]`.

## Boundaries

| Scenario | Note |
|---|---|
| Negative numbers | Python has infinite-width two's-complement semantics; C++ signed shifts need care |
| Shift amount | shifting by more than the bit width is undefined behavior |
| Overflow | a left shift may overflow |
| Bit width | make it explicit with `unsigned` / fixed-width types |

## Exercises

1. Determine whether a number is a power of 2.
2. Use XOR to find the only number that appears once in an array (all the others appear twice).
3. Enumerate all subsets for \(n=20\) and count the subsets that satisfy some condition.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cppreference](https://en.cppreference.com/)

## Navigation

[← Previous](08-sliding-window.md) · [Level Overview](index.md) · [Next](10-discretization.md)
