# 9.2 可计算性

> **级别**：第 9 级 · 算法理论与计算边界  
> **状态**：已展开。

## 学习目标

- 区分可判定与可识别；
- 理解停机问题不可判定；
- 用对角线法构造反例。

## 可判定与可识别

- **可判定**：存在算法，对每个输入在有限步内输出是/否；
- **可识别**：存在算法，对“是”实例最终停机接受；对“否”可能不停。

停机问题是可识别但不可判定的典型例子。

## 停机问题

假设存在 `halt(P, x)` 判定程序 `P` 在输入 `x` 上是否停机。构造：

```python
def paradox(P):
    if halt(P, P):
        while True:
            pass
    else:
        return
```

调用 `paradox(paradox)` 导出矛盾：若停机则不停，若不停则停机。

## 对角线法

把所有程序按输入编号排成表，构造一行与对角线相反的程序，证明不存在覆盖所有函数的可计算枚举。

## C++ 不可判定性演示

无法用 C++ 写一个“对所有程序都正确”的停机判定器；任何实现都会在某类输入上失败或不停。下面的“模拟”只对有限步有效：

```cpp
#include <iostream>

int main() {
    // 有限步模拟不能判定“永远不停”。
    for (int step = 0; step < 1000; ++step) {
        // simulate one step
    }
    std::cout << "unknown after 1000 steps\n";
}
```

## 归约与不可判定

若 \(A\) 可判定且 \(B\le A\)，则 \(B\) 可判定；反过来，若 \(B\) 不可判定且 \(B\le A\)，则 \(A\) 不可判定。

## 边界

| 概念 | 注意 |
|---|---|
| 不停机 | 不能被“跑久一点”解决 |
| 可识别 | 只保证“是”侧停机 |
| 归约方向 | 从已知不可判定问题归约到目标 |
| 实际程序 | 类型检查/终止分析是近似 |

## 练习

1. 证明“程序输出 42”不可判定。
2. 说明可判定与可识别的区别。
3. 用对角线法证明存在不可计算函数。

## 来源

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Foundations of Computation](https://math.hws.edu/FoundationsOfComputation/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](01-computation-models.md) · [本级总览](index.md) · [下一章](03-reductions.md)
