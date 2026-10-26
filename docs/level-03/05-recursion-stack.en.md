# 3.5 Recursion and the Call Stack

> **Level**: Level 3 · Basic Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Write the base case and the recursive step clearly;
- Explain the space cost with the call stack;
- Convert recursion into iteration.

## The Three Elements of Recursion

1. **Base case**: no further recursion;
2. **Recursive step**: move toward the base case;
3. **Combination**: combine the results of the subproblems into the result of the original problem.

```python
def factorial(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

Time \(O(n)\), call-stack space \(O(n)\).

## The Call Stack

Calling `factorial(4)`:

```text
factorial(4)
  factorial(3)
    factorial(2)
      factorial(1)
        factorial(0) -> 1
```

Each level stores the arguments, the return address and the local variables. A recursion that is too deep overflows the stack; Python's default recursion depth is about 1000.

## Recursion vs Iteration

```python
def factorial_iter(n: int) -> int:
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
```

The iterative version uses \(O(1)\) auxiliary space and is usually faster; the recursive version stays closer to the mathematical definition.

## Tail Recursion Is Not a Cure-All

Some languages support tail-call optimization; Python does not. A C++ compiler may optimize it, but you cannot rely on that. For deep recursion, prefer converting to iteration or an explicit stack.

## C++ Example

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

## Recursion Tree

The naive recursive Fibonacci:

```python
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
```

The number of calls is about \(O(2^n)\); memoization or iteration reduces it to \(O(n)\).

## Explicit Stack

Rewriting recursion with an explicit stack lets you control the depth and avoids overflowing the system stack; the price is more complicated code.

## Boundary Cases

| Scenario | Note |
|---|---|
| `n=0` | The base case must cover it |
| Negative numbers | Decide explicitly whether to throw or to return |
| Depth \(10^5\) | Iteration / explicit stack |
| Overlapping subproblems | Memoization |

## Exercises

1. Compute the factorial both recursively and iteratively, and compare their behavior at \(n=1000\).
2. Use memoization to reduce `fib` to \(O(n)\).
3. Implement preorder traversal of a binary tree with an explicit stack.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](04-stack.md) · [Level Overview](index.md) · [Next](06-queue-deque.md)
