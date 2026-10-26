# 7.6 字符串进阶

> **级别**：第 7 级 · 进阶算法与数据结构  
> **状态**：已展开。

## 学习目标

- 用 AC 自动机做多模式匹配；
- 用 Manacher 求回文半径；
- 了解后缀数组与 LCP。

## AC 自动机

Trie + fail 指针；fail 指向最长真后缀对应的节点。

```python
from collections import deque

class AC:
    def __init__(self) -> None:
        self.next = [{}]
        self.fail = [0]
        self.out = [[]]

    def add(self, word: str, idx: int) -> None:
        u = 0
        for ch in word:
            if ch not in self.next[u]:
                self.next[u][ch] = len(self.next)
                self.next.append({})
                self.fail.append(0)
                self.out.append([])
            u = self.next[u][ch]
        self.out[u].append(idx)

    def build(self) -> None:
        q = deque()
        for v in self.next[0].values():
            q.append(v)
        while q:
            u = q.popleft()
            for ch, v in self.next[u].items():
                f = self.fail[u]
                while f and ch not in self.next[f]:
                    f = self.fail[f]
                self.fail[v] = self.next[f].get(ch, 0)
                self.out[v] += self.out[self.fail[v]]
                q.append(v)
```

时间与总长度/字符集有关。

## Manacher

`d1[i]`：以 `i` 为中心的奇数回文半径；`d2[i]`：偶数回文半径。线性时间。

```python
def manacher(s: str) -> tuple[list[int], list[int]]:
    n = len(s)
    d1 = [0] * n
    l, r = 0, -1
    for i in range(n):
        k = 1 if i > r else min(d1[l + r - i], r - i + 1)
        while i - k >= 0 and i + k < n and s[i-k] == s[i+k]:
            k += 1
        d1[i] = k
        if i + k - 1 > r:
            l, r = i - k + 1, i + k - 1
    d2 = [0] * n
    l, r = 0, -1
    for i in range(n):
        k = 0 if i > r else min(d2[l + r - i + 1], r - i + 1)
        while i - k - 1 >= 0 and i + k < n and s[i-k-1] == s[i+k]:
            k += 1
        d2[i] = k
        if i + k - 1 > r:
            l, r = i - k, i + k - 1
    return d1, d2
```

## 后缀数组

`sa[i]`：第 \(i\) 小的后缀起始位置；`lcp` 相邻后缀最长公共前缀。倍增 + 基数排序 \(O(n\log n)\)。

## 边界

| 场景 | 注意 |
|---|---|
| 空串 | 数组为空 |
| 字符集 | 数组/哈希表 |
| 多模式重叠 | AC 的 out 链 |
| 回文中心 | 奇偶两套数组 |

## 练习

1. 用 AC 自动机统计每个模式出现次数。
2. 用 Manacher 求最长回文子串。
3. 用后缀数组求不同子串数。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](05-network-flow.md) · [本级总览](index.md) · [下一章](07-advanced-trees.md)
