# 1.3 条件与循环

> **级别**：第 1 级 · 编程与算法入门  
> **状态**：已展开。

## 学习目标

- 用条件表达分类；
- 用循环表达重复，并说明终止条件；
- 识别嵌套循环的操作次数。

## 条件

```python
def classify(x: int) -> str:
    if x < 0:
        return "negative"
    if x == 0:
        return "zero"
    return "positive"
```

C++ 的 `if` 结构相同，但要注意 `=` 与 `==`、以及整型与布尔值的区别。

```cpp
#include <string>

std::string classify(int x) {
    if (x < 0) return "negative";
    if (x == 0) return "zero";
    return "positive";
}
```

三个分支必须**互斥且覆盖全部情况**。如果写成两个独立的 `if`，要检查是否有遗漏或重复。

## 循环

```python
def sum_to(n: int) -> int:
    total = 0
    i = 1
    while i <= n:
        total += i
        i += 1
    return total

def sum_to_for(n: int) -> int:
    total = 0
    for i in range(1, n + 1):
        total += i
    return total
```

C++：

```cpp
long long sum_to(int n) {
    long long total = 0;
    for (int i = 1; i <= n; ++i) total += i;
    return total;
}
```

### 终止性

`while` 循环必须在每轮让条件更接近假；否则死循环。上面的 `i += 1` 就是进度量。

### 嵌套循环

```python
def count_pairs(n: int) -> int:
    count = 0
    for i in range(n):
        for j in range(i + 1, n):
            count += 1
    return count
```

内层执行 \((n-1)+(n-2)+\cdots+0=n(n-1)/2\) 次，时间复杂度 \(O(n^2)\)。

## 例子：判断素数

```python
def is_prime(n: int) -> bool:
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d += 1
    return True
```

只检查到 \(\sqrt n\)；`d * d` 可能溢出时改用 `d <= n // d`。

## 边界用例

| 输入 | 注意 |
|---|---|
| `n=0` | 循环一次也不执行；`range(1,1)` 为空 |
| 负数 | `range(1, n+1)` 为空，不是错误 |
| 素数 2 | 循环条件 `2*2<=2` 为假，返回 True |
| 大整数乘法 `d*d` | C++ 中可能溢出 |

## 练习

1. 输出 1 到 100 中所有能被 3 或 5 整除的数，但不能同时被两者整除。
2. 用循环计算 \(n!\)，并处理 \(n=0\)。
3. 统计 \(1\le i<j\le n\) 且 \(\gcd(i,j)=1\) 的对数；先写 \(O(n^2\log n)\)，再思考优化。

## 来源

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](02-variables-types.md) · [本级总览](index.md) · [下一章](04-functions.md)
