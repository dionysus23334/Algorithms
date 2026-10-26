# 8.11 Large-scale Data Algorithms

> **Level**: Level 8 · Advanced Algorithms and Computational Methods  
> **Status**: Expanded.

## Learning Objectives

- Use external sorting to handle data that does not fit in memory;
- Use Bloom filters for approximate membership queries;
- Use streaming statistics/Count-Min to estimate frequencies.

## External Sorting

The data is split into chunks that fit in memory, each chunk is sorted and written back, and then a multi-way merge is performed. The number of I/O operations is the main cost.

## Bloom Filter

Uses \(k\) hash functions and a bit array; a query answers "possibly present" or "definitely absent", with false positives but no false negatives.

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

## Streaming Statistics

- Mean/variance: maintain count, sum, sum_sq;
- Sampling: reservoir sampling;
- Frequency: Count-Min Sketch;
- Number of distinct elements: HyperLogLog.

## Bloom Filter in C++

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

## Boundary Cases

| Scenario | Note |
|---|---|
| Bloom false positives | Cannot be used for judgments that must be exact |
| Bit array size | Depends on the false-positive rate and the number of elements |
| External sorting | Chunk size and I/O |
| Streaming | Single pass, bounded memory |

## Exercises

1. Use external sorting to merge several large files.
2. Estimate the false-positive rate of a Bloom filter.
3. Use a Count-Min Sketch to estimate word frequencies.

## Sources

- [MMDS](https://www.mmds.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [FNC](https://fncbook.com/)

## Navigation

[← Previous](10-optimization.md) · [Level Overview](index.md)
