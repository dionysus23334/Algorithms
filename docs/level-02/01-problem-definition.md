# 2.1 问题定义

> **级别**：第 2 级 · 算法分析基础  
> **状态**：已展开。

## 学习目标

- 把自然语言问题写成输入、输出、约束与合法结果；
- 用前置条件/后置条件描述函数契约；
- 在实现前发现歧义与边界。

## 一个完整的问题定义

以“区间求和”为例：

- **输入**：整数数组 \(a\)，下标 \(l,r\)，满足 \(0\le l\le r<n\)；
- **输出**：\(\sum_{i=l}^{r} a_i\)；
- **约束**：\(n\le 10^5\)，\(|a_i|\le 10^9\)；
- **合法结果**：区间和，可能超过 32 位整数；
- **非法输入**：空数组、\(l>r\)、越界。

没有这些约定，程序“能跑”也不能说明正确。

## 函数契约

```text
range_sum(a, l, r)
pre:  0 <= l <= r < len(a)
post: returns sum(a[l:r+1])
```

前置条件不满足时，函数可以选择：

1. 抛出异常；
2. 返回错误码/`None`；
3. 断言失败（仅用于开发期）。

必须统一，并在文档里写清楚。

## Python 实现

```python
def range_sum(a: list[int], l: int, r: int) -> int:
    """Return sum(a[l:r+1]); raise ValueError on invalid bounds."""
    if not (0 <= l <= r < len(a)):
        raise ValueError(f"invalid range [{l}, {r}] for length {len(a)}")
    total = 0
    for i in range(l, r + 1):
        total += a[i]
    return total


if __name__ == "__main__":
    a = [3, -1, 4, 1, 5]
    print(range_sum(a, 1, 3))  # 4
```

## C++ 实现

```cpp
#include <iostream>
#include <stdexcept>
#include <vector>

long long range_sum(const std::vector<int>& a, int l, int r) {
    if (!(0 <= l && l <= r && r < static_cast<int>(a.size()))) {
        throw std::out_of_range("invalid range");
    }
    long long total = 0;
    for (int i = l; i <= r; ++i) total += a[i];
    return total;
}

int main() {
    std::vector<int> a{3, -1, 4, 1, 5};
    std::cout << range_sum(a, 1, 3) << '\n'; // 4
}
```

## 约束如何影响实现

- 若 \(n\le 10^5\)，单次 \(O(n)\) 求和可以接受；
- 若需要 \(10^5\) 次区间查询，单次 \(O(n)\) 会变成 \(O(nq)\)，应使用前缀和；
- 若 \(|a_i|\le10^9\)、\(n\le10^5\)，区间和可达 \(10^{14}\)，C++ 必须用 `long long`。

## 边界用例

| 输入 | 期望 |
|---|---|
| `l=r` | 单元素和 |
| `a=[]` | 非法，抛异常 |
| `l<0` 或 `r>=n` | 非法 |
| `l>r` | 非法，不能返回 0 混过去 |

## 练习

1. 为“求第 k 小元素”写完整问题定义，明确重复值、\(k\) 的范围。
2. 把 `range_sum` 改成返回 `(sum, ok)`，比较异常与返回码两种风格。
3. 设计一个“输入合法但结果溢出”的用例，说明约束为什么要写。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)

## 导航

[← 本级总览](index.md) · [下一章](02-operation-count.md)
