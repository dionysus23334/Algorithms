# 1.2 Variables and Types

> **Level**: Level 1 · Programming and Algorithms: Getting Started  
> **Status**: expanded.

## Learning Objectives

- distinguish integers, floating-point numbers, booleans, characters, and strings;
- understand the difference between Python's dynamic typing and C++'s static typing;
- know where integer overflow, floating-point error, and implicit conversion cause problems.

## Python: Objects and Names

A Python variable is a **name** bound to an object; the type belongs to the object, not to the name.

```python
x = 42          # int
x = "forty-two" # now bound to str
print(type(x))  # <class 'str'>
```

Python integers can in principle be arbitrarily large; floating-point numbers are IEEE 754 double precision and cannot represent `0.1` exactly.

```python
print(0.1 + 0.2 == 0.3)  # False
print(abs((0.1 + 0.2) - 0.3) < 1e-12)  # True
```

## C++: Types and Objects

A C++ variable has a **static type**, fixed at compile time; an assignment must be convertible to that type.

```cpp
#include <iostream>
#include <string>

int main() {
    int x = 42;
    // x = "forty-two"; // compile error
    double d = 0.1 + 0.2;
    std::cout << (d == 0.3) << '\n'; // usually prints 0
    std::string s = std::to_string(x);
    std::cout << s << '\n';
}
```

### Integer Range and Overflow

`int` is usually 32 bits, with a range of roughly \(-2.1\times10^9\) to \(2.1\times10^9\). Signed overflow is undefined behaviour in C++, so "wraparound" must not be relied upon.

```cpp
#include <limits>
#include <iostream>

int main() {
    std::cout << std::numeric_limits<int>::max() << '\n';
    long long safe = 1LL * 2000000000 + 2000000000;
    std::cout << safe << '\n';
}
```

Accumulation, products, and index computations can all overflow; both in contests and in engineering you should estimate the upper bound and use `long long` or Python integers when necessary.

## Type Conversion

- Python: `int("12")`, `float("1.5")`, `str(3)`; on failure a `ValueError` is raised.
- C++: `std::stoi`, `std::stod`, `std::to_string`; on failure an exception is thrown (`std::invalid_argument` / `std::out_of_range`).

**Do not** use C-style casts to "fix" type errors; check the input range first, then convert explicitly.

## Booleans and Characters

- Python's `bool` is a subclass of `int`, and `True == 1`; do not rely on this for arithmetic.
- C++'s `bool` converts to `0/1`, but conversions between `char` and `int` are easily confused.
- A string is not an array of characters: Python's `str` is immutable; C++'s `std::string` is mutable.

## Boundary Cases

| Scenario | Note |
|---|---|
| `int` accumulation approaching \(2^{31}-1\) | use `long long` or check in advance |
| floating-point comparison | use a tolerance, not `==` directly |
| converting an empty string to a number | `stoi("")` throws; `int("")` raises `ValueError` |
| converting a negative number to unsigned | may yield a huge value in C++; avoid mixing the two |

## Exercises

1. Read an integer and output the number of 1s in its binary representation; do it in both Python and C++.
2. Compute \(1+2+\cdots+n\), and for \(n=10^9\) compare the result types and the running time in Python and C++.
3. Write a safe `parse_int` that reports distinct error messages for an empty string, non-digits, and overflow.

## Sources

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [cppreference](https://en.cppreference.com/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](01-algorithm-program.md) · [Level Overview](index.md) · [Next](03-conditions-loops.md)
