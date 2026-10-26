# 1.4 函数

> **级别**：第 1 级 · 编程与算法入门  
> **状态**：已展开。

## 学习目标

- 用函数封装一个可复用步骤；
- 区分参数、返回值、局部变量；
- 理解值传递、引用传递与对象引用的差别。

## 函数约定

一个函数至少要说清：

- 参数类型与含义；
- 返回值类型与合法范围；
- 前置条件（例如数组非空）；
- 是否修改参数。

```python
def average(values: list[float]) -> float:
    if not values:
        raise ValueError("average() requires a non-empty list")
    return sum(values) / len(values)
```

C++ 的返回类型、参数类型必须显式写出：

```cpp
#include <stdexcept>
#include <vector>

double average(const std::vector<double>& values) {
    if (values.empty()) throw std::invalid_argument("empty vector");
    double sum = 0.0;
    for (double x : values) sum += x;
    return sum / static_cast<double>(values.size());
}
```

`const&` 表示只读引用：不复制整个 vector，也不允许在函数内修改。

## 局部变量与作用域

```python
def f(x: int) -> int:
    y = x * 2      # 局部变量
    return y

# print(y)  # NameError
```

函数内部的变量在调用结束后消失；不要依赖“上一次调用的局部变量”。

## 值、引用与对象

### Python

Python 传参是“对象引用的按值传递”：

```python
def append_one(a: list[int]) -> None:
    a.append(1)       # 修改共享对象

def rebind(a: list[int]) -> None:
    a = [99]          # 只改本地名字，不影响调用者

x = []
append_one(x)
print(x)              # [1]
rebind(x)
print(x)              # [1]
```

### C++

```cpp
#include <vector>

void append_one(std::vector<int>& a) { a.push_back(1); } // 引用：修改原对象
void rebind(std::vector<int> a) { a = {99}; }            // 值：复制
```

- `T`：按值复制；
- `T&`：引用，可修改原对象；
- `const T&`：只读引用，避免复制；
- `T*`：指针，需要检查空指针与生命周期。

## 函数拆分

把“读入、计算、输出”分开，主函数只负责流程：

```python
def solve(a: list[int]) -> int:
    return max(a) - min(a)

def main() -> None:
    n = int(input())
    a = list(map(int, input().split()))
    print(solve(a))
```

## 边界用例

| 场景 | 注意 |
|---|---|
| 空容器 | 函数要定义行为：抛异常、返回 `None` 或返回哨兵值 |
| 修改参数 | 文档要写清楚；C++ 用 `&`，Python 要看对象是否可变 |
| 递归函数 | 必须有基本情况；注意递归深度 |
| 返回引用 | C++ 不要返回局部变量的引用或指针 |

## 练习

1. 写 `min_max(a)`，一次遍历同时返回最小值与最大值。
2. 分别用 Python 与 C++ 写 `reverse_in_place(a)`，说明是否修改原数组。
3. 写一个递归函数与一个迭代函数计算斐波那契数，比较 \(n=35\) 的耗时。

## 来源

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [cppreference](https://en.cppreference.com/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](03-conditions-loops.md) · [本级总览](index.md) · [下一章](05-arrays-strings.md)
