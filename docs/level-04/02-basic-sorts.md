# 4.2 基础排序

> **级别**：第 4 级 · 基础算法与常用技巧  
> **状态**：已展开。

## 学习目标

- 实现选择、冒泡、插入排序；
- 比较交换次数与稳定性；
- 知道它们为什么是 \(O(n^2)\)。

## 选择排序

每轮从未排序区间选最小元素，放到前面。

```python
def selection_sort(a: list[int]) -> None:
    n = len(a)
    for i in range(n):
        k = i
        for j in range(i + 1, n):
            if a[j] < a[k]:
                k = j
        a[i], a[k] = a[k], a[i]
```

比较次数固定 \(n(n-1)/2\)，交换最多 \(n-1\) 次；不稳定。

## 插入排序

把当前元素插入前面已排序区间。

```python
def insertion_sort(a: list[int]) -> None:
    for i in range(1, len(a)):
        x = a[i]
        j = i - 1
        while j >= 0 and a[j] > x:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = x
```

已排序时 \(O(n)\)；逆序时 \(O(n^2)\)；稳定。

## 冒泡排序

相邻逆序交换，每轮把最大元素“冒”到末尾。

```python
def bubble_sort(a: list[int]) -> None:
    n = len(a)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
```

最好 \(O(n)\)（已排序且提前结束），最坏 \(O(n^2)\)；稳定。

## C++ 插入排序

```cpp
#include <vector>

void insertion_sort(std::vector<int>& a) {
    for (int i = 1; i < static_cast<int>(a.size()); ++i) {
        int x = a[i], j = i - 1;
        while (j >= 0 && a[j] > x) {
            a[j + 1] = a[j];
            --j;
        }
        a[j + 1] = x;
    }
}
```

## 稳定性

稳定：相等元素的相对顺序不变。插入、冒泡稳定；选择排序通常不稳定。

## 边界

| 场景 | 注意 |
|---|---|
| 空数组/单元素 | 循环不执行 |
| 全部相等 | 仍要正确；稳定排序不改变相对顺序 |
| 大数组 | \(O(n^2)\) 不适合 |

## 练习

1. 统计三种排序的比较与交换次数。
2. 给选择排序加“同时找最小/最大”，减少比较。
3. 构造一个选择排序不稳定的例子。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 上一章](01-enumeration-search.md) · [本级总览](index.md) · [下一章](03-library-sort.md)
