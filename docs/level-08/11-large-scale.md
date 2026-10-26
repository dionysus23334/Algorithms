# 8.11 大规模数据算法

> **级别**：第 8 级 · 高级算法与计算方法  
> **状态**：已展开。

## 学习目标

- 用外部排序处理超内存数据；
- 用 Bloom 过滤器做近似成员查询；
- 用流式统计/Count-Min 估计频率。

## 外部排序

数据分成能放入内存的块，块内排序写回，再多路归并。I/O 次数是主要成本。

## Bloom 过滤器

用 \(k\) 个哈希函数和位数组；查询“可能存在”或“一定不存在”，有假阳性、无假阴性。

```python
import hashlib

class Bloom:
    def __init__(self, m: int = 100000, k: int = 3) -> None:
        self.m, self.k = m, k
        self.bits = bytearray(m)

    def _idx(self, item: str, i: int) -> int:
        h = hashlib.sha256(f"{i}:{item}".encode()).digest()
        return int.from_bytes(h[:8], "little") % self.m

    def add(self, item: str) -> None:
        for i in range(self.k):
            self.bits[self._idx(item, i)] = 1

    def maybe_contains(self, item: str) -> bool:
        return all(self.bits[self._idx(item, i)] for i in range(self.k))
```

## 流式统计

- 均值/方差：维护 count、sum、sum_sq；
- 采样：蓄水池；
- 频率：Count-Min Sketch；
- 不同元素数：HyperLogLog。

## C++ Bloom

```cpp
#include <bitset>
#include <string>

struct Bloom {
    std::bitset<100000> bits;
    void add(const std::string& s) {
        for (int i = 0; i < 3; ++i) {
            std::size_t h = std::hash<std::string>{}(s + std::to_string(i));
            bits[h % bits.size()] = 1;
        }
    }
    bool maybe(const std::string& s) const {
        for (int i = 0; i < 3; ++i) {
            std::size_t h = std::hash<std::string>{}(s + std::to_string(i));
            if (!bits[h % bits.size()]) return false;
        }
        return true;
    }
};
```

## 边界

| 场景 | 注意 |
|---|---|
| Bloom 假阳性 | 不能用于“必须精确”的判断 |
| 位数组大小 | 与误判率、元素数有关 |
| 外部排序 | 块大小与 I/O |
| 流式 | 单遍、有限内存 |

## 练习

1. 用外部排序合并多个大文件。
2. 估计 Bloom 过滤器的假阳性率。
3. 用 Count-Min Sketch 估计词频。

## 来源

- [MMDS](https://www.mmds.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [FNC](https://fncbook.com/)

## 导航

[← 上一章](10-optimization.md) · [本级总览](index.md)
