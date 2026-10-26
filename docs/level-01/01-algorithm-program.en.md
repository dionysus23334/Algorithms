# 1.1 Algorithm and Program

> **Level**: Level 1 · Programming and Algorithms: Getting Started  
> **Status**: expanded (concept, dual-language implementations, boundary cases, exercises).

## Learning Objectives

- explain clearly what distinguishes an "algorithm" from a "program";
- decompose a problem into input, processing, and output;
- describe the steps in pseudocode, then implement them in Python and in C++ respectively;
- test a program with an empty input, a single element, and duplicate values.

## Algorithms and Programs

An **algorithm** is a finite sequence of steps that solves a class of problems: every step must have a precise meaning, execution must stop after finitely many steps, and a valid output must be produced.  
A **program** is a concrete implementation of an algorithm in some language; the same algorithm may have different programs.

Describing an algorithm requires stating at least:

1. **Input**: which data are allowed, and how large the input may be;
2. **Output**: what constitutes a legal result;
3. **Process**: what each step does;
4. **Termination**: why it is guaranteed to stop;
5. **Correctness**: why the output satisfies the requirements.

### Example: sum, maximum, count

Given an integer array \(a\), compute respectively:

- the sum of all elements;
- the maximum element;
- the number of elements satisfying \(a_i>0\).

**Pseudocode**:

```text
sum ← 0
maximum ← a[0]
positive ← 0
for each x in a:
    sum ← sum + x
    if x > maximum: maximum ← x
    if x > 0: positive ← positive + 1
return (sum, maximum, positive)
```

This pseudocode assumes a non-empty array; the maximum of an empty array is undefined and must be handled separately. This is the first appearance of "boundary conditions".

## Python Implementation

```python
def summarize(a: list[int]) -> tuple[int, int, int] | None:
    """Return (sum, maximum, positive_count); None for an empty list."""
    if not a:
        return None
    total = 0
    maximum = a[0]
    positive = 0
    for x in a:
        total += x
        if x > maximum:
            maximum = x
        if x > 0:
            positive += 1
    return total, maximum, positive


if __name__ == "__main__":
    print(summarize([3, -1, 4, 0, 5]))  # (11, 5, 3)
    print(summarize([]))                # None
```

## C++ Implementation

```cpp
#include <iostream>
#include <optional>
#include <vector>

struct Summary {
    long long sum;
    int maximum;
    int positive;
};

std::optional<Summary> summarize(const std::vector<int>& a) {
    if (a.empty()) return std::nullopt;
    long long sum = 0;
    int maximum = a[0];
    int positive = 0;
    for (int x : a) {
        sum += x;
        if (x > maximum) maximum = x;
        if (x > 0) ++positive;
    }
    return Summary{sum, maximum, positive};
}

int main() {
    auto r = summarize({3, -1, 4, 0, 5});
    if (r) std::cout << r->sum << ' ' << r->maximum << ' ' << r->positive << '\n';
    auto empty = summarize({});
    std::cout << (empty ? "value" : "empty") << '\n';
}
```

## Complexity

- Time: \(O(n)\), since each element is scanned only once;
- Extra space: \(O(1)\) (excluding the input and the returned structure).

## Boundary Cases

| Input | Expected |
|---|---|
| `[]` | explicitly return "no result"; `a[0]` must not be accessed |
| `[0]` | sum=0, max=0, positive=0 |
| `[-5]` | sum=-5, max=-5, positive=0 |
| `[1, 1, 1]` | duplicate values do not affect the result |

## Exercises

1. Add "minimum" and "count of even numbers", still keeping \(O(n)\) time and \(O(1)\) space.
2. If the array length can reach \(10^6\), how does Python's `sum` differ from a hand-written loop? Measure it.
3. Write a version that raises an exception on empty input instead of returning `None`; explain the trade-off in interface design.

## Sources

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Level Overview](index.md) · [Next](02-variables-types.md)
