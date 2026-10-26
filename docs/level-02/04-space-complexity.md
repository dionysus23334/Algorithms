# 2.4 空间复杂度

> **级别**：第 2 级 · 算法分析基础  
> **状态**：已展开。

## 学习目标

- 区分输入空间、辅助空间、输出空间；
- 估算数组、递归栈、哈希表、矩阵的额外空间；
- 知道“原地”不等于“零空间”。

## 辅助空间

空间复杂度通常指**辅助空间**：除输入输出外额外使用的内存。

- 原地反转数组：\(O(1)\) 辅助空间；
- 复制一份数组：\(O(n)\)；
- 递归深度 \(n\)：调用栈 \(O(n)\)；
- \(n\times m\) 矩阵：\(O(nm)\)。

## 代码对照

```python
def reverse_in_place(a: list[int]) -> None:
    i, j = 0, len(a) - 1
    while i < j:
        a[i], a[j] = a[j], a[i]
        i += 1
        j -= 1

def reverse_copy(a: list[int]) -> list[int]:
    return a[::-1]
```

C++：

```cpp
#include <algorithm>
#include <vector>

void reverse_in_place(std::vector<int>& a) {
    int i = 0, j = static_cast<int>(a.size()) - 1;
    while (i < j) std::swap(a[i++], a[j--]);
}

std::vector<int> reverse_copy(const std::vector<int>& a) {
    std::vector<int> b(a.rbegin(), a.rend());
    return b;
}
```

## 递归栈

```python
def sum_recursive(a: list[int], i: int = 0) -> int:
    if i == len(a):
        return 0
    return a[i] + sum_recursive(a, i + 1)
```

递归深度 \(n\)，每层保存参数与返回地址，辅助空间 \(O(n)\)。改成循环可降到 \(O(1)\)。

## 哈希表与字符串

- Python `dict`/`set` 平均 \(O(n)\) 额外空间，有负载因子与对象开销；
- C++ `unordered_map` 有桶数组与节点开销；
- 字符串拼接会产生新对象，循环拼接可能累计 \(O(n^2)\) 临时空间。

## 空间换时间

前缀和用 \(O(n)\) 空间把区间查询从 \(O(n)\) 降到 \(O(1)\)。这是典型的 trade-off，不是“空间越小越好”。

## 边界与陷阱

| 场景 | 注意 |
|---|---|
| 递归深度 \(10^5\) | Python 可能 `RecursionError`；C++ 可能栈溢出 |
| 二维数组 | `n*m` 可能很大；稀疏数据用邻接表 |
| 切片/拷贝 | Python 切片产生新列表，不是视图 |
| 原地算法 | 仍可能有 \(O(\log n)\) 栈或 \(O(1)\) 临时变量 |

## 练习

1. 比较反转数组的原地版与复制版的空间。
2. 写一个 \(O(1)\) 辅助空间的“删除有序数组重复项”。
3. 分析归并排序的辅助空间；说明为什么它不是严格原地排序。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## 导航

[← 上一章](03-time-complexity.md) · [本级总览](index.md) · [下一章](05-correctness.md)
