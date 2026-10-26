# 6.8 字符串匹配

> **级别**：第 6 级 · 常用专题算法  
> **状态**：已展开。

## 学习目标

- 写朴素匹配；
- 理解前缀函数与 KMP；
- 用 Z 算法找重复结构。

## 朴素匹配

```python
def naive_find(text: str, pat: str) -> int:
    n, m = len(text), len(pat)
    for i in range(n - m + 1):
        if text[i:i+m] == pat:
            return i
    return -1
```

最坏 \(O(nm)\)。

## KMP 前缀函数

`pi[i]`：`pat[:i+1]` 的最长相等真前缀/后缀长度。

```python
def prefix_function(p: str) -> list[int]:
    pi = [0] * len(p)
    j = 0
    for i in range(1, len(p)):
        while j > 0 and p[i] != p[j]:
            j = pi[j - 1]
        if p[i] == p[j]:
            j += 1
        pi[i] = j
    return pi

def kmp_find(text: str, pat: str) -> int:
    if not pat:
        return 0
    pi = prefix_function(pat)
    j = 0
    for i, ch in enumerate(text):
        while j > 0 and ch != pat[j]:
            j = pi[j - 1]
        if ch == pat[j]:
            j += 1
        if j == len(pat):
            return i - len(pat) + 1
    return -1
```

时间 \(O(n+m)\)。

## Z 算法

`z[i]`：`s` 与 `s[i:]` 的最长公共前缀长度。可用于找所有匹配、周期。

## C++ KMP

```cpp
#include <string>
#include <vector>

std::vector<int> prefix_function(const std::string& p) {
    std::vector<int> pi(p.size(), 0);
    for (int i = 1, j = 0; i < static_cast<int>(p.size()); ++i) {
        while (j > 0 && p[i] != p[j]) j = pi[j - 1];
        if (p[i] == p[j]) ++j;
        pi[i] = j;
    }
    return pi;
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 空模式 | 通常返回 0 |
| 模式比文本长 | 返回 -1 |
| 重叠匹配 | KMP 可继续找下一个 |
| Unicode | 按字节/码点，需统一 |

## 练习

1. 返回所有匹配位置。
2. 用前缀函数求字符串的最小周期。
3. 用 Z 算法实现匹配。

## 来源

- [cp-algorithms](https://cp-algorithms.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](07-monotonic.md) · [本级总览](index.md) · [下一章](09-trie-hash.md)
