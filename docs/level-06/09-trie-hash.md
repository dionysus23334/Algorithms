# 6.9 字符串组织

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 用 Trie 做前缀查询；
- 用滚动哈希做子串比较；
- 知道哈希碰撞与验证。

## Trie

```python
class TrieNode:
    def __init__(self) -> None:
        self.child: dict[str, "TrieNode"] = {}
        self.end = False

class Trie:
    def __init__(self) -> None:
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        cur = self.root
        for ch in word:
            cur = cur.child.setdefault(ch, TrieNode())
        cur.end = True

    def search(self, word: str) -> bool:
        cur = self.root
        for ch in word:
            if ch not in cur.child:
                return False
            cur = cur.child[ch]
        return cur.end

    def starts_with(self, prefix: str) -> bool:
        cur = self.root
        for ch in prefix:
            if ch not in cur.child:
                return False
            cur = cur.child[ch]
        return True
```

时间 \(O(L)\)，空间与字符集和总长度有关。

## 滚动哈希

\[
H[i]=\sum_{k=0}^{i-1}s[k]B^{i-1-k}\bmod M.
\]

子串哈希用前缀差乘逆元/幂。

```python
def rolling_hash(s: str, base: int = 131, mod: int = 10**9 + 7) -> list[int]:
    h = [0] * (len(s) + 1)
    for i, ch in enumerate(s):
        h[i + 1] = (h[i] * base + ord(ch)) % mod
    return h
```

单模有碰撞风险；可用双模或直接验证。

## C++ Trie

```cpp
#include <array>
#include <string>
#include <vector>

struct TrieNode {
    std::array<int, 26> next{};
    bool end = false;
    TrieNode() { next.fill(-1); }
};

void insert(std::vector<TrieNode>& t, const std::string& s) {
    int u = 0;
    for (char ch : s) {
        int c = ch - 'a';
        if (t[u].next[c] == -1) {
            t[u].next[c] = static_cast<int>(t.size());
            t.emplace_back();
        }
        u = t[u].next[c];
    }
    t[u].end = true;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 空串 | 根节点；`end` 语义 |
| 大小写 | 统一或区分 |
| 哈希碰撞 | 验证或双哈希 |
| 字符集大 | 用哈希表代替数组 |

## 练习

1. 统计 Trie 中单词数。
2. 用滚动哈希判断两个子串是否相等。
3. 构造一个哈希碰撞例子并说明验证的重要性。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](08-string-matching.md) · [本级总览](index.md) · [下一章](10-number-theory.md)
