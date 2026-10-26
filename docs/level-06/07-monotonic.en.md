# 6.7 Monotonic Structures

> **Level**: Level 6 · Common Topic Algorithms  
> **Status**: Expanded.

## Learning Objectives

- Use a monotonic stack to find the "next greater element";
- Use a monotonic deque to find sliding-window extrema;
- Explain why each element enters and leaves the stack at most once.

## Next Greater Element

```python
def next_greater(a: list[int]) -> list[int]:
    n = len(a)
    ans = [-1] * n
    st = []
    for i, x in enumerate(a):
        while st and a[st[-1]] < x:
            ans[st.pop()] = x
        st.append(i)
    return ans
```

Time \(O(n)\): each index is pushed and popped at most once.

## Sliding Window Maximum

```python
from collections import deque

def max_sliding_window(a: list[int], k: int) -> list[int]:
    if k <= 0 or k > len(a):
        raise ValueError("invalid k")
    q = deque()  # indices, values decreasing
    out = []
    for i, x in enumerate(a):
        while q and a[q[-1]] <= x:
            q.pop()
        q.append(i)
        if q[0] <= i - k:
            q.popleft()
        if i >= k - 1:
            out.append(a[q[0]])
    return out
```

## C++ Monotonic Stack

```cpp
#include <iostream>
#include <stack>
#include <vector>

int main() {
    std::vector<int> a{2, 1, 3, 5, 4};
    std::vector<int> ans(a.size(), -1);
    std::stack<int> st;
    for (int i = 0; i < static_cast<int>(a.size()); ++i) {
        while (!st.empty() && a[st.top()] < a[i]) {
            ans[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }
    for (int x : ans) std::cout << x << ' ';
}
```

## When It Applies

- You need the "first greater/smaller element to the left/right";
- Window extrema;
- Largest rectangle in a histogram;
- DP optimization with a monotonic deque.

## Boundary Cases

| Case | Note |
|---|---|
| Empty array | return empty |
| All values equal | whether they count as "greater" depends on strict vs. non-strict |
| Window \(k=1\) | output the original array |
| Window \(k>n\) | invalid |

## Exercises

1. Find the next smaller element.
2. Use a monotonic stack to find the largest rectangle in a histogram.
3. Use a monotonic deque to optimize the bounded knapsack.

## Sources

- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](06-range-ds.md) · [Level Overview](index.md) · [Next](08-string-matching.md)
