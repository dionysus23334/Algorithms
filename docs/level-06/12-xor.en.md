# 6.12 XOR Applications

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: expanded.

## Learning Objectives

- Use a prefix XOR to obtain the XOR of a range;
- Use a binary trie to find the maximum XOR pair;
- Represent an XOR space with a linear basis.

## Prefix XOR

```python
def xor_prefix(a: list[int]) -> list[int]:
    p = [0] * (len(a) + 1)
    for i, x in enumerate(a):
        p[i+1] = p[i] ^ x
    return p

# XOR of the range [l, r): p[r] ^ p[l]
```

## Maximum XOR Pair

Insert all numbers into a binary trie and, bit by bit, follow the opposite bit whenever possible.

```python
class Node:
    def __init__(self) -> None:
        self.child = [None, None]

def insert(root: Node, x: int, bits: int = 30) -> None:
    cur = root
    for b in range(bits, -1, -1):
        bit = (x >> b) & 1
        if cur.child[bit] is None:
            cur.child[bit] = Node()
        cur = cur.child[bit]

def max_xor(root: Node, x: int, bits: int = 30) -> int:
    cur = root
    ans = 0
    for b in range(bits, -1, -1):
        bit = (x >> b) & 1
        want = bit ^ 1
        if cur.child[want] is not None:
            ans |= 1 << b
            cur = cur.child[want]
        else:
            cur = cur.child[bit]
    return ans
```

## Linear Basis

A set of numbers is used to represent all their XOR combinations; on insertion, elimination is performed starting from the highest bit. This supports maximum XOR and representability tests.

## C++ Prefix XOR

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{1, 2, 3, 4};
    std::vector<int> p(a.size() + 1, 0);
    for (std::size_t i = 0; i < a.size(); ++i) p[i+1] = p[i] ^ a[i];
    int l = 1, r = 4;
    std::cout << (p[r] ^ p[l]) << '\n';
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Negative numbers | fixed bit width / unsigned |
| Bit width | choose 30/60 according to the value range |
| Empty range | returns 0 |
| Linear basis | inserting 0 has no effect |

## Exercises

1. Find the number that occurs only once in an array (all others occur twice).
2. Use a trie to find the maximum XOR pair.
3. Use a linear basis to decide whether a number can be represented as an XOR.

## Sources

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](11-combinatorics.md) · [Level Overview](index.md)
