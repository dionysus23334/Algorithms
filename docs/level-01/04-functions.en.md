# 1.4 Functions

> **Level**: Level 1 · Programming and Algorithms: Getting Started  
> **Status**: expanded.

## Learning Objectives

- use a function to encapsulate a reusable step;
- distinguish parameters, return values, and local variables;
- understand the difference between pass-by-value, pass-by-reference, and object references.

## Function Contracts

A function must state at least:

- the types and meaning of its parameters;
- the return type and its valid range;
- the preconditions (for example, that the array is non-empty);
- whether it modifies its parameters.

```python
def average(values: list[float]) -> float:
    if not values:
        raise ValueError("average() requires a non-empty list")
    return sum(values) / len(values)
```

In C++ the return type and the parameter types must be written explicitly:

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

`const&` denotes a read-only reference: the whole vector is not copied, and modification inside the function is not permitted.

## Local Variables and Scope

```python
def f(x: int) -> int:
    y = x * 2      # local variable
    return y

# print(y)  # NameError
```

Variables inside a function disappear once the call ends; do not rely on "a local variable from the previous call".

## Values, References, and Objects

### Python

Python passes arguments "by value of the object reference":

```python
def append_one(a: list[int]) -> None:
    a.append(1)       # modifies the shared object

def rebind(a: list[int]) -> None:
    a = [99]          # rebinds only the local name; the caller is unaffected

x = []
append_one(x)
print(x)              # [1]
rebind(x)
print(x)              # [1]
```

### C++

```cpp
#include <vector>

void append_one(std::vector<int>& a) { a.push_back(1); } // reference: modifies the original object
void rebind(std::vector<int> a) { a = {99}; }            // value: a copy
```

- `T`: copied by value;
- `T&`: a reference, which can modify the original object;
- `const T&`: a read-only reference that avoids copying;
- `T*`: a pointer, requiring null checks and attention to lifetime.

## Function Decomposition

Separate "read input, compute, write output", leaving the main function responsible only for the flow:

```python
def solve(a: list[int]) -> int:
    return max(a) - min(a)

def main() -> None:
    n = int(input())
    a = list(map(int, input().split()))
    print(solve(a))
```

## Boundary Cases

| Scenario | Note |
|---|---|
| empty container | the function must define its behaviour: throw, return `None`, or return a sentinel value |
| modifying parameters | document it clearly; C++ uses `&`, while in Python it depends on whether the object is mutable |
| recursive function | must have a base case; mind the recursion depth |
| returning references | in C++, never return a reference or pointer to a local variable |

## Exercises

1. Write `min_max(a)`, which returns the minimum and the maximum together in a single pass.
2. Write `reverse_in_place(a)` in both Python and C++, and state whether it modifies the original array.
3. Write a recursive function and an iterative function to compute Fibonacci numbers, and compare their running time for \(n=35\).

## Sources

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [cppreference](https://en.cppreference.com/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](03-conditions-loops.md) · [Level Overview](index.md) · [Next](05-arrays-strings.md)
