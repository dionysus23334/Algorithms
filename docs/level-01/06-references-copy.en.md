# 1.6 References and Copying

> **Level**: Level 1 · Programming and Algorithms: Getting Started  
> **Status**: expanded.

## Learning Objectives

- Distinguish "name binding", "object sharing" and "copying an object";
- Understand assignment, shallow copy and deep copy in Python;
- Understand values, references, pointers and ownership in C++.

## Python: Assignment Does Not Copy Objects

```python
a = [1, 2, 3]
b = a          # b and a are bound to the same list
b.append(4)
print(a)       # [1, 2, 3, 4]

c = a.copy()   # shallow copy
c.append(5)
print(a)       # [1, 2, 3, 4]
```

With nested objects, a shallow copy copies only the outer level:

```python
import copy
a = [[1], [2]]
b = a.copy()
b[0].append(9)
print(a)          # [[1, 9], [2]]
d = copy.deepcopy(a)
d[1].append(8)
print(a)          # [[1, 9], [2]]
```

## C++: Values, References and Pointers

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{1, 2, 3};
    std::vector<int> b = a;        // value copy
    b.push_back(4);
    std::cout << a.size() << ' ' << b.size() << '\n'; // 3 4

    std::vector<int>& r = a;       // reference: the same object
    r.push_back(5);
    std::cout << a.size() << '\n'; // 4

    std::vector<int>* p = &a;      // pointer: dereferencing and null checks are required
    p->push_back(6);
    std::cout << a.back() << '\n'; // 6
}
```

### Ownership and Lifetime

- Stack objects are destroyed automatically when they leave their scope;
- Objects created with `new` require `delete` (modern C++ prefers `std::unique_ptr` / `std::shared_ptr`);
- A reference must be bound to a valid object and must not dangle;
- Returning a reference or pointer to a local variable is an error.

```cpp
#include <memory>

std::unique_ptr<int> make_value(int x) {
    return std::make_unique<int>(x);
}
```

## When to Copy, When to Share

| Requirement | Python | C++ |
|---|---|---|
| Pass a large object read-only | Pass a reference directly (the object is shared) | `const T&` |
| Independent modification is needed | `copy()` / `deepcopy()` | Pass by value or copy explicitly |
| The caller's object must be modified | Pass a mutable object | `T&` |
| The value must be allowed to be empty | `None` | `T*` or `std::optional<T>` |

## Boundary Cases

| Scenario | Note |
|---|---|
| A mutable default argument | `def f(a=[])` is shared across calls; use `None` instead |
| Shallow copy of a nested list | The inner levels are still shared |
| C++ returning a local reference | Dangling reference, undefined behaviour |
| Uninitialised pointer | It must be assigned first or set to `nullptr` |

## Exercises

1. Write a function that demonstrates that Python's "argument passing" passes object references rather than copies.
2. Write three C++ versions that take their argument by value, by reference and by `const&` respectively, and print the addresses to verify.
3. Implement a simple `Matrix` class and explain the difference between the copy constructor and the move constructor.

## Sources

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [cppreference](https://en.cppreference.com/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](05-arrays-strings.md) · [Level Overview](index.md) · [Next](07-simulation.md)
