# 3.5 递归与调用栈

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 写清基本情况与递归步；
- 用调用栈解释空间开销；
- 把递归改成迭代。

## 递归三要素

1. **基本情况**：不再递归；
2. **递归步**：向基本情况靠近；
3. **合并**：把子问题结果组合成原问题结果。

```python
def factorial(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

时间 \(O(n)\)，调用栈空间 \(O(n)\)。

## 调用栈

调用 `factorial(4)`：

```text
factorial(4)
  factorial(3)
    factorial(2)
      factorial(1)
        factorial(0) -> 1
```

每层保存参数、返回地址和局部变量。递归太深会栈溢出；Python 默认递归深度约 1000。

## 递归 vs 迭代

```python
def factorial_iter(n: int) -> int:
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
```

迭代版辅助空间 \(O(1)\)，通常更快；递归版更贴近数学定义。

## 尾递归不是万能

有些语言支持尾调用优化，Python 不支持；C++ 编译器可能优化，但不能依赖。深递归优先改迭代或显式栈。

## C++ 示例

```cpp
#include <iostream>
#include <stdexcept>

long long factorial(int n) {
    if (n < 0) throw std::invalid_argument("negative");
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

int main() {
    std::cout << factorial(10) << '\n';
}
```

## 递归树

斐波那契的朴素递归：

```python
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
```

调用次数约为 \(O(2^n)\)；用记忆化或迭代降到 \(O(n)\)。

## 显式栈

把递归改写成显式栈，可以控制深度并避免系统栈溢出；代价是代码更复杂。

## 边界

| 场景 | 注意 |
|---|---|
| `n=0` | 基本情况要覆盖 |
| 负数 | 明确抛异常还是返回 |
| 深度 \(10^5\) | 迭代/显式栈 |
| 重复子问题 | 记忆化 |

## 练习

1. 用递归与迭代分别求阶乘，比较 \(n=1000\) 的行为。
2. 用记忆化把 `fib` 降到 \(O(n)\)。
3. 用显式栈实现二叉树前序遍历。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## 导航

[← 上一章](04-stack.md) · [本级总览](index.md) · [下一章](06-queue-deque.md)
