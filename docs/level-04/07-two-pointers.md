# 4.7 双指针

> **级别**：第 4 级 · 基础算法与常用技巧  
> **状态**：已展开。

## 学习目标

- 用相向双指针在有序数组中找配对；
- 用同向双指针去重/合并；
- 说明指针移动为什么不漏解。

## 相向双指针：两数之和

有序数组中找两个数，和为 target：

```python
def two_sum_sorted(a: list[int], target: int) -> tuple[int,int] | None:
    i, j = 0, len(a) - 1
    while i < j:
        s = a[i] + a[j]
        if s == target:
            return i, j
        if s < target:
            i += 1
        else:
            j -= 1
    return None
```

若 \(a_i+a_j<target\)，则 \(a_i\) 与任何更小下标配对都更小，所以 \(i\) 可以右移；反之 \(j\) 左移。

## 同向双指针：删除重复项

```python
def remove_duplicates(a: list[int]) -> int:
    if not a:
        return 0
    write = 1
    for read in range(1, len(a)):
        if a[read] != a[write - 1]:
            a[write] = a[read]
            write += 1
    return write
```

返回新长度；前 `write` 个元素是去重结果。

## 合并两个有序数组

```python
def merge(a: list[int], b: list[int]) -> list[int]:
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out
```

## C++ 两数之和

```cpp
#include <iostream>
#include <vector>

bool two_sum_sorted(const std::vector<int>& a, int target) {
    int i = 0, j = static_cast<int>(a.size()) - 1;
    while (i < j) {
        int s = a[i] + a[j];
        if (s == target) return true;
        if (s < target) ++i; else --j;
    }
    return false;
}

int main() {
    std::cout << two_sum_sorted({1, 2, 3, 4, 6}, 7) << '\n';
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 空/单元素 | 无配对 |
| 重复值 | 是否返回所有配对 |
| 未排序 | 相向双指针的前提是有序 |
| 负数 | 移动逻辑仍成立 |

## 练习

1. 返回所有和为 target 的不重复数对。
2. 合并两个有序数组到第一个数组的尾部（原地）。
3. 判断字符串是否为回文（双指针）。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](06-difference.md) · [本级总览](index.md) · [下一章](08-sliding-window.md)
