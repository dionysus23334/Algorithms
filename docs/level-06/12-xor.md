# 6.12 XOR 应用

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 用异或前缀求区间异或；
- 用二进制 Trie 求最大异或对；
- 用线性基表示异或空间。

## 异或前缀

```python
def xor_prefix(a: list[int]) -> list[int]:
    p = [0] * (len(a) + 1)
    for i, x in enumerate(a):
        p[i+1] = p[i] ^ x
    return p

# 区间 [l, r) 的异或：p[r] ^ p[l]
```

## 最大异或对

把所有数插入二进制 Trie，逐位尽量走相反位。

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

## 线性基

用一组数表示所有异或组合；插入时从高位消元，可用于最大异或、可表示性判断。

## C++ 异或前缀

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

## 边界

| 场景 | 注意 |
|---|---|
| 负数 | 固定位宽/无符号 |
| 位宽 | 根据值域选择 30/60 |
| 空区间 | 返回 0 |
| 线性基 | 插入 0 无影响 |

## 练习

1. 求数组中唯一出现一次的数（其余两次）。
2. 用 Trie 求最大异或对。
3. 用线性基判断一个数能否被异或表示。

## 来源

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](11-combinatorics.md) · [本级总览](index.md)
