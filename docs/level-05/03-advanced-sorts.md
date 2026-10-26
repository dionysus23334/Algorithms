# 5.3 排序进阶

> **级别**：第 5 级 · 核心算法设计方法  
> **状态**：已展开。

## 学习目标

- 实现堆排序、计数排序、基数排序；
- 知道比较排序下界与适用条件；
- 区分稳定性与额外空间。

## 堆排序

```python
def heap_sort(a: list[int]) -> None:
    n = len(a)
    def sift(i: int, size: int) -> None:
        while True:
            l, r = 2 * i + 1, 2 * i + 2
            largest = i
            if l < size and a[l] > a[largest]: largest = l
            if r < size and a[r] > a[largest]: largest = r
            if largest == i: break
            a[i], a[largest] = a[largest], a[i]
            i = largest

    for i in range(n // 2 - 1, -1, -1):
        sift(i, n)
    for end in range(n - 1, 0, -1):
        a[0], a[end] = a[end], a[0]
        sift(0, end)
```

时间 \(O(n\log n)\)，空间 \(O(1)\)，不稳定。

## 计数排序

值域 \([0,k]\) 的整数：

```python
def counting_sort(a: list[int], k: int) -> list[int]:
    count = [0] * (k + 1)
    for x in a:
        count[x] += 1
    for i in range(1, k + 1):
        count[i] += count[i - 1]
    out = [0] * len(a)
    for x in reversed(a):          # 逆序保证稳定
        count[x] -= 1
        out[count[x]] = x
    return out
```

时间 \(O(n+k)\)，空间 \(O(n+k)\)；值域不能太大。

## 基数排序

按低位到高位依次做稳定计数排序；对 \(d\) 位、基 \(B\)：

\[
O(d(n+B)).
\]

适合固定位宽的整数/字符串。

## C++ 计数排序

```cpp
#include <vector>

std::vector<int> counting_sort(const std::vector<int>& a, int k) {
    std::vector<int> count(k + 1, 0), out(a.size());
    for (int x : a) ++count[x];
    for (int i = 1; i <= k; ++i) count[i] += count[i - 1];
    for (int i = static_cast<int>(a.size()) - 1; i >= 0; --i) {
        out[--count[a[i]]] = a[i];
    }
    return out;
}
```

## 比较排序下界

基于比较的排序至少需要 \(\Omega(n\log n)\) 次比较；计数/基数排序利用键的结构，绕开比较模型。

## 边界

| 场景 | 注意 |
|---|---|
| 值域大 | 计数排序空间爆炸 |
| 负数 | 先偏移或改用其他排序 |
| 稳定性 | 计数排序逆序填充才稳定 |
| 浮点 | 计数/基数不直接适用 |

## 练习

1. 实现堆排序并验证大根堆性质。
2. 用计数排序处理负数。
3. 比较 `sort`、堆排序、计数排序在合适数据上的耗时。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 上一章](02-recursion-complexity.md) · [本级总览](index.md) · [下一章](04-backtracking.md)
