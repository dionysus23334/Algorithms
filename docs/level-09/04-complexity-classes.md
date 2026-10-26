# 9.4 复杂性类别

> **级别**：第 9 级 · 算法理论与计算边界  
> **状态**：已展开。

## 学习目标

- 定义 P、NP、coNP；
- 区分“求解”与“验证”；
- 理解 NP 难/NP 完全。

## P 与 NP

- **P**：存在多项式时间算法求解的判定问题；
- **NP**：存在多项式时间验证器，给定证书可在多项式时间内验证“是”；
- **coNP**：补问题在 NP 中。

\[
P\subseteq NP,\qquad P\subseteq coNP.
\]

是否 \(P=NP\) 未解决。

## 验证器

以 SAT 为例，证书是一个赋值：

```python
def verify_sat(clauses: list[list[int]], assignment: dict[int,bool]) -> bool:
    for clause in clauses:
        if not any(assignment.get(abs(lit), False) == (lit > 0) for lit in clause):
            return False
    return True
```

验证 \(O(\text{子句总长度})\)；但找赋值可能指数。

## NP 难与 NP 完全

- \(L\) 是 NP 难：所有 NP 问题 \(\le_p L\)；
- \(L\) 是 NP 完全：\(L\in NP\) 且 NP 难；
- SAT 是第一个被证明 NP 完全的问题（Cook–Levin）。

## C++ 验证器

```cpp
#include <vector>

bool verify_sat(const std::vector<std::vector<int>>& clauses,
                const std::vector<int>& value) {
    for (const auto& clause : clauses) {
        bool ok = false;
        for (int lit : clause) {
            bool v = value[std::abs(lit)] != 0;
            if ((lit > 0) == v) { ok = true; break; }
        }
        if (!ok) return false;
    }
    return true;
}
```

## 边界

| 概念 | 注意 |
|---|---|
| NP | 只要求“是”有短证书 |
| coNP | 不是 NP 的补集定义 |
| NP 难 | 不要求属于 NP |
| 指数时间 | NP 不排除指数算法 |

## 练习

1. 证明 SAT ∈ NP。
2. 说明为什么“验证快”不等于“求解快”。
3. 举例一个 coNP 问题。

## 来源

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## 导航

[← 上一章](03-reductions.md) · [本级总览](index.md) · [下一章](05-np-complete.md)
