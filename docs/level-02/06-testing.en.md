# 2.6 Testing and Verification

> **Level**: Level 2 · Foundations of Algorithm Analysis  
> **Status**: Expanded.

## Learning Objectives

- Design normal cases, boundary cases, and randomized stress tests;
- Use a naive solution as an oracle;
- Understand that passing tests is not the same as proving correctness.

## Levels of Testing

1. **Unit testing**: a function's output on fixed inputs;
2. **Boundary testing**: empty, single-element, duplicate, and extreme values;
3. **Randomized stress testing**: small random inputs compared with a brute-force solution;
4. **Stress testing**: large inputs, checking time/memory;
5. **Formal proof**: loop invariants/induction.

## Boundary Cases

| Type | Example |
|---|---|
| Empty | `[]`, empty string |
| Single element | `[0]`, `[INT_MAX]` |
| Duplicates | `[1,1,1,1]` |
| Sorted/reverse-sorted | Already sorted, completely reverse-sorted |
| Extreme values | Maximum/minimum integer, floating-point value close to 0 |
| Invalid | Out of bounds, `l>r`, non-numeric input |

## Randomized Stress Testing

```python
import random

def brute_max(a: list[int]) -> int | None:
    return max(a) if a else None

def fast_max(a: list[int]) -> int | None:
    if not a:
        return None
    best = a[0]
    for x in a[1:]:
        if x > best:
            best = x
    return best

for _ in range(5000):
    n = random.randint(0, 30)
    a = [random.randint(-50, 50) for _ in range(n)]
    assert brute_max(a) == fast_max(a), a
print("ok")
```

C++ randomized stress testing:

```cpp
#include <algorithm>
#include <cassert>
#include <random>
#include <vector>

int fast_max(const std::vector<int>& a) {
    int best = a[0];
    for (int x : a) best = std::max(best, x);
    return best;
}

int main() {
    std::mt19937 rng(12345);
    std::uniform_int_distribution<int> size(1, 30), value(-50, 50);
    for (int t = 0; t < 5000; ++t) {
        int n = size(rng);
        std::vector<int> a(n);
        for (int& x : a) x = value(rng);
        assert(fast_max(a) == *std::max_element(a.begin(), a.end()));
    }
}
```

## Limitations of Testing

- Random testing covers only the sampling distribution;
- The absence of a counterexample does not mean the algorithm is correct;
- Assertions may be disabled in release builds;
- Floating-point results require a tolerance.

## Exercises

1. Write 10 boundary cases for `lower_bound`.
2. Use randomized stress testing to verify insertion sort against `sorted`.
3. Design an off-by-one error that is "hard to find by random testing," and explain how to construct a targeted case.

## Sources

- [Hello Algorithms](https://www.hello-algo.com/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)

## Navigation

[← Previous](05-correctness.md) · [Level Overview](index.md) · [Next](07-performance.md)
