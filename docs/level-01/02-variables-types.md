# 1.2 变量与类型

> **级别**：第 1 级 · 编程与算法入门  
> **状态**：已展开。

## 学习目标

- 区分整数、浮点数、布尔值、字符与字符串；
- 理解 Python 动态类型与 C++ 静态类型的差异；
- 知道整数溢出、浮点误差、隐式转换在哪里出问题。

## Python：对象与名字

Python 的变量是**名字**，绑定到对象；类型属于对象，不属于名字。

```python
x = 42          # int
x = "forty-two" # 现在绑定到 str
print(type(x))  # <class 'str'>
```

Python 整数理论上可任意大；浮点数是 IEEE 754 双精度，不能精确表示 `0.1`。

```python
print(0.1 + 0.2 == 0.3)  # False
print(abs((0.1 + 0.2) - 0.3) < 1e-12)  # True
```

## C++：类型与对象

C++ 变量有**静态类型**，编译期确定；赋值必须能转换到该类型。

```cpp
#include <iostream>
#include <string>

int main() {
    int x = 42;
    // x = "forty-two"; // 编译错误
    double d = 0.1 + 0.2;
    std::cout << (d == 0.3) << '\n'; // 通常输出 0
    std::string s = std::to_string(x);
    std::cout << s << '\n';
}
```

### 整数范围与溢出

`int` 通常 32 位，范围约 \(-2.1\times10^9\) 到 \(2.1\times10^9\)。有符号溢出在 C++ 中是未定义行为，不能依赖“回绕”。

```cpp
#include <limits>
#include <iostream>

int main() {
    std::cout << std::numeric_limits<int>::max() << '\n';
    long long safe = 1LL * 2000000000 + 2000000000;
    std::cout << safe << '\n';
}
```

累加、乘积、下标计算都可能溢出；竞赛与工程中都应估计上界，必要时用 `long long` 或 Python 整数。

## 类型转换

- Python：`int("12")`、`float("1.5")`、`str(3)`；失败会抛 `ValueError`。
- C++：`std::stoi`、`std::stod`、`std::to_string`；失败会抛异常（`std::invalid_argument` / `std::out_of_range`）。

**不要**用 C 风格强制转换来“修复”类型错误；先检查输入范围，再显式转换。

## 布尔与字符

- Python 的 `bool` 是 `int` 的子类，`True == 1`；不要依赖这一点做算术。
- C++ 的 `bool` 可转换为 `0/1`，但 `char` 与 `int` 的转换容易混淆。
- 字符串不是字符数组：Python `str` 不可变；C++ `std::string` 可变。

## 边界用例

| 场景 | 注意 |
|---|---|
| `int` 累加接近 \(2^{31}-1\) | 使用 `long long` 或提前判断 |
| 浮点比较 | 用容差，不要直接用 `==` |
| 空字符串转数字 | `stoi("")` 抛异常；`int("")` 抛 `ValueError` |
| 负数转无符号 | C++ 中可能得到巨大值，避免混用 |

## 练习

1. 读入一个整数，输出它的二进制表示中 1 的个数；分别用 Python 与 C++。
2. 计算 \(1+2+\cdots+n\)，在 \(n=10^9\) 时比较 Python 与 C++ 的结果类型与耗时。
3. 写一个安全的 `parse_int`，对空串、非数字、溢出分别给出错误信息。

## 来源

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [cppreference](https://en.cppreference.com/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](01-algorithm-program.md) · [本级总览](index.md) · [下一章](03-conditions-loops.md)
