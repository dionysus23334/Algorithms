# 1.3 Conditions and Loops

> **Level**: Level 1 · Programming and Algorithms: Getting Started  
> **Status**: expanded.

## Learning Objectives

- use conditions to express classification;
- use loops to express repetition, and state the termination condition;
- identify the number of operations performed by nested loops.

## Conditions

```python
def classify(x: int) -> str:
    if x < 0:
        return "negative"
    if x == 0:
        return "zero"
    return "positive"
```

C++'s `if` has the same structure, but beware of `=` versus `==`, and of the distinction between integers and booleans.

```cpp
#include <string>

std::string classify(int x) {
    if (x < 0) return "negative";
    if (x == 0) return "zero";
    return "positive";
}
```

The three branches must be **mutually exclusive and exhaustive**. If they are written as two independent `if` statements, check whether any case is missing or duplicated.

## Loops

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

C++:

```cpp
long long sum_to(int n) {
    long long total = 0;
    for (int i = 1; i <= n; ++i) total += i;
    return total;
}
```

### Termination

A `while` loop must move its condition closer to false on every iteration; otherwise it loops forever. The `i += 1` above is precisely that progress measure.

### Nested Loops

```python
def count_pairs(n: int) -> int:
    count = 0
    for i in range(n):
        for j in range(i + 1, n):
            count += 1
    return count
```

The inner loop executes \((n-1)+(n-2)+\cdots+0=n(n-1)/2\) times, so the time complexity is \(O(n^2)\).

## Example: Primality Test

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

Only divisors up to \(\sqrt n\) are checked; when `d * d` might overflow, use `d <= n // d` instead.

## Boundary Cases

| Input | Note |
|---|---|
| `n=0` | the loop body never executes; `range(1,1)` is empty |
| negative numbers | `range(1, n+1)` is empty, which is not an error |
| the prime 2 | the loop condition `2*2<=2` is false, so True is returned |
| large-integer multiplication `d*d` | may overflow in C++ |

## Exercises

1. Output all numbers from 1 to 100 that are divisible by 3 or by 5, but not by both.
2. Compute \(n!\) with a loop, and handle \(n=0\).
3. Count the pairs with \(1\le i<j\le n\) and \(\gcd(i,j)=1\); first write an \(O(n^2\log n)\) version, then think about how to optimise it.

## Sources

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [OI Wiki](https://oi-wiki.org/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](02-variables-types.md) · [Level Overview](index.md) · [Next](04-functions.md)
