# 2.5 Introduction to Correctness

> **Level**: Level 2 · Foundations of Algorithm Analysis  
> **Status**: Expanded.

## Learning Objectives

- Refute incorrect algorithms with counterexamples;
- Prove iterative algorithms with loop invariants;
- Prove recursive algorithms with induction;
- Explain termination.

## Counterexamples

To prove an algorithm wrong, only one valid input that produces an incorrect output is needed.

```python
def wrong_max(a: list[int]) -> int:
    best = 0
    for x in a:
        if x > best:
            best = x
    return best
```

Counterexample: `[-3, -1, -2]` returns 0, whereas the correct maximum is -1. Initializing `best=0` implicitly assumes that "the array is nonnegative."

## Loop Invariants

Consider `lower_bound` binary search as an example:

```python
def lower_bound(a: list[int], x: int) -> int:
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < x:
            lo = mid + 1
        else:
            hi = mid
    return lo
```

Invariants:

1. The answer lies in \([lo,hi]\);
2. `a[0:lo] < x`;
3. `a[hi:] >= x`.

Each iteration:

- If `a[mid] < x`, the answer cannot lie in `[lo,mid]`; set `lo=mid+1`;
- Otherwise, the answer lies in `[lo,mid]`; set `hi=mid`.

At the end of the loop, `lo==hi`, and the invariants yield the answer.

## Termination

- `hi-lo` strictly decreases each iteration (`mid < hi` or `lo=mid+1`), so the loop terminates;
- Recursion must have a base case, and each step must move toward that base case;
- A `while` loop needs a measurable measure of progress.

## Induction

For the recursive sum:

```python
def sum_to(n: int) -> int:
    if n == 0:
        return 0
    return n + sum_to(n - 1)
```

Proposition \(P(n)\): `sum_to(n)=n(n+1)/2`.

- Base case: \(n=0\), which returns 0;
- Induction step: Assume \(P(n-1)\); then `sum_to(n)=n+(n-1)n/2=n(n+1)/2`.

## C++ Version

```cpp
#include <vector>

int lower_bound_cpp(const std::vector<int>& a, int x) {
    int lo = 0, hi = static_cast<int>(a.size());
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2; // avoid overflow
        if (a[mid] < x) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}
```

`mid = lo + (hi - lo) / 2` is safer than `(lo+hi)/2`.

## Common Errors

| Error | Example |
|---|---|
| Incorrect initialization | Initialize the maximum to 0 |
| Boundary error | Mixing `lo <= hi` and `lo < hi` |
| Non-termination | The loop variable does not change |
| Proving only some cases | Forgetting empty arrays and duplicate values |
| Incomplete loop invariant | Not explaining the meaning of the interval |

## Exercises

1. Write the complete invariant and termination proof for `lower_bound`.
2. Find another counterexample to `wrong_max`, and fix it.
3. Use induction to prove that the time complexity of `sum_to` is \(O(n)\).

## Sources

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Hello Algorithms](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)

## Navigation

[← Previous](04-space-complexity.md) · [Level Overview](index.md) · [Next](06-testing.md)
