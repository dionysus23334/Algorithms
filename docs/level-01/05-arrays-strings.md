# 1.5 数组与字符串入门

> **级别**：第 1 级 · 编程与算法入门  
> **状态**：已展开。

## 学习目标

- 通过下标访问、遍历、修改数组；
- 区分 Python `list`、`str` 与 C++ `vector`、`string`；
- 知道字符串不可变带来的复制成本。

## 数组：连续存储与下标

Python 的 `list` 是对象引用数组；C++ 的 `vector<T>` 是连续存储的值数组。

```python
a = [10, 20, 30, 40]
for i in range(len(a)):
    a[i] += 1
print(a)          # [11, 21, 31, 41]
print(a[1:3])     # [21, 31]，切片产生新列表
```

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{10, 20, 30, 40};
    for (int& x : a) ++x;              // 引用：修改元素
    for (int x : a) std::cout << x << ' ';
    std::cout << '\n';
}
```

## 遍历方式

- 按下标遍历：需要索引、需要修改、需要访问相邻元素；
- 按值遍历：只读，不修改；
- 按引用遍历（C++）：修改元素；
- Python 的 `enumerate` 同时给出下标与值。

```python
for i, x in enumerate(a):
    print(i, x)
```

## 字符串

Python 的 `str` 不可变；每次切片、拼接都可能产生新对象。

```python
s = "algorithm"
print(s[0], s[-1])      # a m
print(s[1:4])           # lgo
# s[0] = 'A'            # TypeError
t = "A" + s[1:]         # 产生新字符串
```

C++ 的 `std::string` 可变：

```cpp
#include <iostream>
#include <string>

int main() {
    std::string s = "algorithm";
    s[0] = 'A';
    std::string t = s.substr(1, 3); // "lgo"
    std::cout << s << ' ' << t << '\n';
}
```

### 拼接的复杂度

- 循环中反复 `s += ch`：
  - Python 的字符串不可变，可能产生 \(O(n^2)\) 的复制；
  - C++ 的 `std::string` 有容量与摊还扩容，通常接近 \(O(n)\)。
- 大量拼接优先用列表收集，再 `''.join(parts)`。

```python
parts = []
for ch in "algorithm":
    parts.append(ch.upper())
result = "".join(parts)
```

## 二维数组

Python 的 `[[0] * m for _ in range(n)]` 才能得到独立的行；`[[0] * m] * n` 共享同一行。

```python
n, m = 3, 4
grid = [[0] * m for _ in range(n)]
grid[0][0] = 1
print(grid[1][0])  # 0，未被共享影响
```

C++：

```cpp
#include <vector>

int main() {
    int n = 3, m = 4;
    std::vector<std::vector<int>> grid(n, std::vector<int>(m, 0));
}
```

## 边界用例

| 场景 | 注意 |
|---|---|
| 空数组/空串 | 不能访问 `a[0]`；先检查长度 |
| 下标越界 | Python 抛 `IndexError`；C++ 越界是未定义行为 |
| 负下标 | Python 支持；C++ `vector` 不支持 |
| 切片边界 | `a[l:r]` 包含 `l`，不包含 `r` |
| 字符串修改 | Python 必须创建新串；C++ 可直接改 |

## 练习

1. 反转数组：分别用切片、双指针原地、C++ `std::reverse`。
2. 统计字符串中每个字符出现次数；比较 Python `dict` 与 C++ `unordered_map`。
3. 给定 \(n\times m\) 矩阵，输出转置；比较额外空间 \(O(nm)\) 与原地旋转（方阵）。

## 来源

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [cppreference](https://en.cppreference.com/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](04-functions.md) · [本级总览](index.md) · [下一章](06-references-copy.md)
