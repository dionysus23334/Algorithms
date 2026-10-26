# 9.1 计算模型

> **级别**：第 9 级 · 算法理论与计算边界  
> **状态**：已展开。

## 学习目标

- 区分 RAM 模型与图灵机；
- 理解输入编码与输入长度；
- 区分单位代价与位代价。

## 为什么需要计算模型

“算法需要多少时间”必须先说清机器模型。比较排序的 \(\Omega(n\log n)\) 是在**比较模型**下；图灵机的复杂度按纸带操作计。

## RAM 模型

- 无限寄存器，算术/访存 \(O(1)\)；
- 适合分析数组、指针、哈希；
- 大整数运算不应默认 \(O(1)\)。

## 图灵机

- 有限状态控制器 + 无限纸带；
- 每一步读/写一个格子、移动一格；
- 是定义可计算性与复杂性的标准模型。

```python
# 一个只做二元加法的“纸带”模拟：一元表示过于低效，这里仅演示读写头。
def tm_add_unary(a: int, b: int) -> int:
    tape = ["1"] * a + ["+"] + ["1"] * b
    head = 0
    while tape[head] != "+":
        head += 1
    tape[head] = "1"
    return sum(1 for x in tape if x == "1")
```

真实图灵机需要状态转移表；这里用 Python 模拟纸带思想。

## 输入长度

- 整数 \(n\) 的输入长度是 \(\lceil\log_2(n+1)\rceil\)，不是 1；
- “多项式时间”指输入位数/图规模的多项式；
- 伪多项式算法（如 \(O(nW)\) 背包）在 \(W\) 的二进制长度下可能指数。

## 位复杂度

大整数加/乘、矩阵运算的代价取决于位宽；密码学中尤其重要。

## C++ 位宽

```cpp
#include <iostream>
#include <limits>

int main() {
    std::cout << sizeof(int) * 8 << ' ' << sizeof(long long) * 8 << '\n';
    std::cout << std::numeric_limits<unsigned long long>::max() << '\n';
}
```

## 边界

| 场景 | 注意 |
|---|---|
| 大整数 | 位代价 |
| 哈希 | RAM 假设 |
| 图灵机 | 常数因子巨大 |
| 输入编码 | 一元 vs 二进制 |

## 练习

1. 说明为什么“\(n\) 位整数的加法是 \(O(n)\)”。
2. 把冒泡排序放到图灵机上，估计复杂度。
3. 解释伪多项式时间与多项式时间的区别。

## 来源

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Foundations of Computation](https://math.hws.edu/FoundationsOfComputation/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 本级总览](index.md) · [下一章](02-computability.md)
