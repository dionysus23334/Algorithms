# 8.5 高级字符串结构

> **级别**：第 8 级 · 高级算法与计算方法  
> **状态**：已展开。

## 学习目标

- 建后缀自动机（SAM）；
- 理解后缀树的等价信息；
- 用 SAM 统计不同子串/出现次数。

## 后缀自动机

SAM 接受字符串的所有后缀；每个状态代表一组 endpos 相同的子串。

```python
class SAM:
    def __init__(self) -> None:
        self.next = [{}]
        self.link = [-1]
        self.len = [0]
        self.last = 0

    def extend(self, ch: str) -> None:
        cur = len(self.next)
        self.next.append({})
        self.link.append(0)
        self.len.append(self.len[self.last] + 1)
        p = self.last
        while p != -1 and ch not in self.next[p]:
            self.next[p][ch] = cur
            p = self.link[p]
        if p == -1:
            self.link[cur] = 0
        else:
            q = self.next[p][ch]
            if self.len[p] + 1 == self.len[q]:
                self.link[cur] = q
            else:
                clone = len(self.next)
                self.next.append(self.next[q].copy())
                self.link.append(self.link[q])
                self.len.append(self.len[p] + 1)
                while p != -1 and self.next[p].get(ch) == q:
                    self.next[p][ch] = clone
                    p = self.link[p]
                self.link[q] = self.link[cur] = clone
        self.last = cur
```

不同子串数：

\[
\sum_v (\operatorname{len}(v)-\operatorname{len}(\operatorname{link}(v))).
\]

## 后缀树

后缀树是后缀 trie 的压缩；可用 SAM/后缀数组构造。支持子串出现次数、最长公共子串等。

## C++ SAM 状态

```cpp
#include <array>
#include <string>
#include <vector>

struct State {
    std::array<int, 26> next{};
    int link = -1, len = 0;
    State() { next.fill(-1); }
};

void extend(std::vector<State>& st, int& last, char ch) {
    int cur = st.size();
    st.emplace_back();
    st[cur].len = st[last].len + 1;
    int p = last;
    while (p != -1 && st[p].next[ch - 'a'] == -1) {
        st[p].next[ch - 'a'] = cur;
        p = st[p].link;
    }
    if (p == -1) st[cur].link = 0;
    else {
        int q = st[p].next[ch - 'a'];
        if (st[p].len + 1 == st[q].len) st[cur].link = q;
        else {
            int clone = st.size();
            st.push_back(st[q]);
            st[clone].len = st[p].len + 1;
            while (p != -1 && st[p].next[ch - 'a'] == q) {
                st[p].next[ch - 'a'] = clone;
                p = st[p].link;
            }
            st[q].link = st[cur].link = clone;
        }
    }
    last = cur;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 空串 | 只有初始状态 |
| 字符集 | 数组/哈希表 |
| 克隆状态 | 长度与 link 正确 |
| 出现次数 | 按 parent 树累加 |

## 练习

1. 用 SAM 统计不同子串数。
2. 统计每个子串出现次数。
3. 用后缀树求最长公共子串。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](04-advanced-graph.md) · [本级总览](index.md) · [下一章](06-dynamic-trees.md)
