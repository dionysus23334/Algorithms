# 3.7 哈希表与集合

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 用哈希函数把键映射到桶；
- 处理冲突与负载因子；
- 区分平均 \(O(1)\) 与最坏 \(O(n)\)。

## 模型

哈希表由桶数组与哈希函数组成：

```text
index = hash(key) mod m
```

不同键可能落到同一个桶，称为**冲突**。常见处理：

- **链地址法**：每个桶挂一个链表；
- **开放寻址**：线性探测、二次探测、双重哈希。

## Python 链地址法

```python
class HashTable:
    def __init__(self, buckets: int = 8) -> None:
        self._buckets: list[list[tuple[int, int]]] = [[] for _ in range(buckets)]
        self._size = 0

    def _index(self, key: int) -> int:
        return hash(key) % len(self._buckets)

    def put(self, key: int, value: int) -> None:
        bucket = self._buckets[self._index(key)]
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))
        self._size += 1

    def get(self, key: int) -> int | None:
        for k, v in self._buckets[self._index(key)]:
            if k == key:
                return v
        return None
```

平均 \(O(1)\)，最坏所有键冲突时 \(O(n)\)。

## C++ 标准库

```cpp
#include <iostream>
#include <string>
#include <unordered_map>

int main() {
    std::unordered_map<std::string, int> freq;
    for (std::string w : {"a", "b", "a"}) ++freq[w];
    std::cout << freq["a"] << '\n'; // 2
}
```

`unordered_map` 不保持顺序；需要有序时用 `std::map`（\(O(\log n)\)）。

## 负载因子与扩容

负载因子 \(\alpha=n/m\)。链地址法通常 \(\alpha\) 超过 1 左右就扩容；开放寻址通常保持 \(\alpha<0.7\)。扩容需要重新哈希所有键，单次 \(O(n)\)，摊还仍可 \(O(1)\)。

## 哈希函数要求

- 同一键每次哈希结果相同；
- 分布尽量均匀；
- 与相等性一致：`a == b` 则 `hash(a) == hash(b)`；
- 不要用可变字段参与哈希。

## 边界

| 场景 | 注意 |
|---|---|
| 键不存在 | 返回 `None`/`end()`，不要默认插入 |
| 大量冲突 | 最坏 \(O(n)\)，可被恶意输入利用 |
| 扩容 | 迭代器/引用可能失效 |
| 浮点/自定义类型 | 需要定义哈希与相等 |

## 练习

1. 给 `HashTable` 加扩容与重新哈希。
2. 统计数组中第一个只出现一次的元素。
3. 比较 `dict`、`set`、`unordered_map`、`map` 的平均/最坏复杂度。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## 导航

[← 上一章](06-queue-deque.md) · [本级总览](index.md) · [下一章](08-trees-binary.md)
