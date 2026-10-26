# 4.8 Sliding Window

> **Level**: Level 4 · Basic Algorithms and Techniques  
> **Status**: Expanded.

## Learning Objectives

- Maintain fixed-length/variable-length windows;
- Update the state quickly with counts or prefix sums;
- Decide the condition for shrinking the window.

## Fixed-length Window

The maximum sum of a subarray of length \(k\):

```python
def max_sum_fixed(a: list[int], k: int) -> int:
    if k <= 0 or k > len(a):
        raise ValueError("invalid k")
    window = sum(a[:k])
    best = window
    for i in range(k, len(a)):
        window += a[i] - a[i - k]
        best = max(best, window)
    return best
```

Time \(O(n)\), space \(O(1)\).

## Variable-length Window: Longest Substring Without Repeating Characters

```python
def longest_unique(s: str) -> int:
    last = {}
    left = 0
    best = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        best = max(best, right - left + 1)
    return best
```

The window `[left, right]` is always free of duplicates; the right end expands, and the left end jumps to just past the repeated character.

## C++ Version

```cpp
#include <algorithm>
#include <string>
#include <unordered_map>

int longest_unique(const std::string& s) {
    std::unordered_map<char,int> last;
    int left = 0, best = 0;
    for (int right = 0; right < static_cast<int>(s.size()); ++right) {
        char ch = s[right];
        auto it = last.find(ch);
        if (it != last.end() && it->second >= left) left = it->second + 1;
        last[ch] = right;
        best = std::max(best, right - left + 1);
    }
    return best;
}
```

## Applicability Conditions

- When the window expands/shrinks, the state can be updated in \(O(1)\);
- The problem is monotone: after the right end expands, the left end only needs to move to the right, and never has to move back.

## Boundaries

| Scenario | Note |
|---|---|
| \(k=0\) or \(k>n\) | invalid/empty window |
| Empty string | returns 0 |
| All characters identical | window length 1 |
| Array with negative numbers | the maximum subarray sum cannot necessarily use a sliding window (monotonicity does not hold) |

## Exercises

1. Find the shortest subarray whose sum is \(\ge\) target (array of positive numbers).
2. Find the longest substring containing at most \(k\) distinct characters.
3. Compute the maximum of every fixed-length window with a sliding window (together with a monotonic queue).

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## Navigation

[← Previous](07-two-pointers.md) · [Level Overview](index.md) · [Next](09-bitwise.md)
