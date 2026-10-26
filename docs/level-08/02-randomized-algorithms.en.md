# 8.2 Randomized Algorithms

> **Level**: Level 8 · Advanced Algorithms and Computational Methods  
> **Status**: Expanded.

## Learning Objectives

- Perform streaming uniform sampling with reservoir sampling;
- Use randomized quickselect;
- Understand randomized hashing and deduplication.

## Reservoir Sampling

Select \(k\) elements uniformly at random from a stream of unknown length:

```python
import random

def reservoir(stream, k: int) -> list[int]:
    out = []
    for i, x in enumerate(stream):
        if i < k:
            out.append(x)
        else:
            j = random.randint(0, i)
            if j < k:
                out[j] = x
    return out
```

Each element is finally selected with probability \(k/n\).

## Randomized Quickselect

Pick a pivot at random; the \(k\)-th smallest element is found in expected \(O(n)\) time; the worst case is still \(O(n^2)\).

```python
import random

def quickselect(a: list[int], k: int) -> int:
    if not 0 <= k < len(a):
        raise IndexError(k)
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        p = random.randint(lo, hi)
        a[lo], a[p] = a[p], a[lo]
        pivot = a[lo]
        i, j = lo, hi
        while i < j:
            while i < j and a[j] >= pivot: j -= 1
            a[i] = a[j]
            while i < j and a[i] <= pivot: i += 1
            a[j] = a[i]
        a[i] = pivot
        if i == k:
            return a[i]
        if i < k:
            lo = i + 1
        else:
            hi = i - 1
    raise AssertionError
```

## Randomized Hashing

Build the hash function with a random seed to reduce the risk of attacks through adversarial input; the worst case of a hash table can still occur, but the expected performance is good.

## C++ Randomized Selection

```cpp
#include <algorithm>
#include <random>
#include <vector>

int quickselect(std::vector<int> a, int k) {
    std::mt19937 rng(12345);
    std::nth_element(a.begin(), a.begin() + k, a.end());
    return a[k];
}
```

In engineering practice use `nth_element` directly; the example here illustrates the randomized idea.

## Boundary Cases

| Scenario | Note |
|---|---|
| \(k>n\) | Illegal |
| Duplicate values | Selecting the k-th smallest requires defining how duplicates are counted |
| Unknown stream length | Reservoir sampling is suitable |
| Random seed | Reproducibility |

## Exercises

1. Prove the uniformity of reservoir sampling.
2. Use randomized quickselect to find the median.
3. Design a randomized deduplication/sampling experiment.

## Sources

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [MMDS](https://www.mmds.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## Navigation

[← Previous](01-randomized-basics.md) · [Level Overview](index.md) · [Next](03-advanced-dp-optimization.md)
