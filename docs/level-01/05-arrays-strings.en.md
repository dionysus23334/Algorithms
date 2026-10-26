# 1.5 Introduction to Arrays and Strings

> **Level**: Level 1 · Programming and Algorithms: Getting Started  
> **Status**: expanded.

## Learning Objectives

- Access, traverse and modify arrays through indices;
- Distinguish Python `list` and `str` from C++ `vector` and `string`;
- Know the copying cost caused by the immutability of strings.

## Arrays: Contiguous Storage and Indices

Python's `list` is an array of object references; C++'s `vector<T>` is a contiguously stored array of values.

```python
a = [10, 20, 30, 40]
for i in range(len(a)):
    a[i] += 1
print(a)          # [11, 21, 31, 41]
print(a[1:3])     # [21, 31], slicing produces a new list
```

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{10, 20, 30, 40};
    for (int& x : a) ++x;              // reference: modifies the elements
    for (int x : a) std::cout << x << ' ';
    std::cout << '\n';
}
```

## Traversal Styles

- Traversal by index: when the index is needed, when modification is needed, or when adjacent elements must be accessed;
- Traversal by value: read-only, no modification;
- Traversal by reference (C++): modifies the elements;
- Python's `enumerate` yields both the index and the value.

```python
for i, x in enumerate(a):
    print(i, x)
```

## Strings

Python's `str` is immutable; every slice and every concatenation may create a new object.

```python
s = "algorithm"
print(s[0], s[-1])      # a m
print(s[1:4])           # lgo
# s[0] = 'A'            # TypeError
t = "A" + s[1:]         # creates a new string
```

C++'s `std::string` is mutable:

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

### Complexity of Concatenation

- Repeated `s += ch` inside a loop:
  - Python strings are immutable, so this may incur \(O(n^2)\) copying;
  - C++'s `std::string` has capacity and amortised growth, so it is usually close to \(O(n)\).
- For heavy concatenation, prefer collecting the pieces in a list and then calling `''.join(parts)`.

```python
parts = []
for ch in "algorithm":
    parts.append(ch.upper())
result = "".join(parts)
```

## Two-dimensional Arrays

In Python, only `[[0] * m for _ in range(n)]` yields independent rows; `[[0] * m] * n` shares the same row.

```python
n, m = 3, 4
grid = [[0] * m for _ in range(n)]
grid[0][0] = 1
print(grid[1][0])  # 0, unaffected by the sharing
```

C++:

```cpp
#include <vector>

int main() {
    int n = 3, m = 4;
    std::vector<std::vector<int>> grid(n, std::vector<int>(m, 0));
}
```

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty array / empty string | `a[0]` must not be accessed; check the length first |
| Index out of range | Python raises `IndexError`; in C++ an out-of-range access is undefined behaviour |
| Negative index | Supported in Python; not supported by C++ `vector` |
| Slice boundaries | `a[l:r]` includes `l` and excludes `r` |
| String modification | Python must create a new string; C++ can modify in place |

## Exercises

1. Reverse an array: use slicing, in-place two pointers and C++ `std::reverse` respectively.
2. Count the occurrences of every character in a string; compare Python `dict` with C++ `unordered_map`.
3. Given an \(n\times m\) matrix, output its transpose; compare \(O(nm)\) extra space with in-place rotation (square matrices).

## Sources

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [cppreference](https://en.cppreference.com/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](04-functions.md) · [Level Overview](index.md) · [Next](06-references-copy.md)
