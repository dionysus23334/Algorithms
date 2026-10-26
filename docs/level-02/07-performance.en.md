# 2.7 Performance Measurement

> **Level**: Level 2 · Foundations of Algorithm Analysis  
> **Status**: Expanded.

## Learning Objectives

- Use `timeit` / `chrono` for basic measurements;
- Distinguish theoretical complexity, constants, input distributions, and cache effects;
- Understand that microbenchmarks can easily mislead.

## Questions to Ask Before Measuring

1. Which operation is being measured?
2. What are the input size and distribution?
3. Does the measurement include I/O, initialization, or compilation/interpretation overhead?
4. Is it repeated enough times?
5. Can the results be explained by complexity?

## Python: timeit

```python
import timeit

setup = "a = list(range(1000))"
print(timeit.timeit("sum(a)", setup=setup, number=10000))
print(timeit.timeit("total = 0\nfor x in a:\n    total += x", setup=setup, number=10000))
```

`sum` is a C-level loop and is usually significantly faster than a Python-level loop; this reflects a **constant-factor difference**, and both are still \(O(n)\).

## C++: chrono

```cpp
#include <chrono>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> a(1000000, 1);
    auto t0 = std::chrono::steady_clock::now();
    long long s = 0;
    for (int x : a) s += x;
    auto t1 = std::chrono::steady_clock::now();
    auto us = std::chrono::duration_cast<std::chrono::microseconds>(t1 - t0).count();
    std::cout << s << " " << us << "us\n";
}
```

## Input Distribution

The same algorithm can differ greatly across inputs:

- Insertion sort: \(O(n)\) on sorted input, \(O(n^2)\) on reverse-sorted input;
- Quicksort: expected \(O(n\log n)\) with random pivoting, \(O(n^2)\) with extreme pivoting;
- Hash table: \(O(1)\) on average, \(O(n)\) in the worst case.

When reporting performance, the input distribution must be stated.

## Microbenchmark Pitfalls

- The compiler may optimize away the result;
- Cache warm-up, JIT, and Python interpreter state affect the results;
- Measurement granularity is too coarse (measuring microsecond operations at millisecond granularity);
- Measuring only once, so noise is high;
- Different machines/compilers cannot be compared directly.

## Simple Experiment

```python
import timeit
for n in (100, 1000, 10000):
    a = list(range(n))
    t = timeit.timeit(lambda: sum(a), number=1000)
    print(n, t)
```

Observe the growth trend, not just a single point.

## Exercises

1. Compare the elapsed time of `sum` and a hand-written loop at \(n=10^3,10^5,10^6\).
2. Measure the differences in insertion sort on sorted/reverse-sorted/random inputs.
3. Design a microbenchmark that shows how "the compiler optimizing away the result" can mislead conclusions.

## Sources

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [Hello Algorithms](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)

## Navigation

[← Previous](06-testing.md) · [Level Overview](index.md)
