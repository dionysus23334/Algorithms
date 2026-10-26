# 4.3 Standard Library Sorting

> **Level**: Level 4 · Basic Algorithms and Techniques  
> **Status**: Expanded.

## Learning Objectives

- Use sort keys, comparators and multiple keys;
- Understand stable sorting and `stable_sort`;
- Avoid the common mistakes of hand-written sorting.

## Python: sorted / list.sort

```python
people = [("Alice", 90), ("Bob", 90), ("Cara", 85)]
by_score = sorted(people, key=lambda p: p[1], reverse=True)
print(by_score)

# Multiple keys: first by score descending, then by name ascending
by_both = sorted(people, key=lambda p: (-p[1], p[0]))
print(by_both)
```

`sorted` returns a new list; `list.sort()` sorts in place. Python sorting is stable.

## C++: sort / stable_sort

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

struct Person {
    std::string name;
    int score;
};

int main() {
    std::vector<Person> p{{"Alice", 90}, {"Bob", 90}, {"Cara", 85}};
    std::sort(p.begin(), p.end(), [](const Person& a, const Person& b) {
        if (a.score != b.score) return a.score > b.score;
        return a.name < b.name;
    });
    for (const auto& x : p) std::cout << x.name << ' ' << x.score << '\n';
}
```

`std::sort` does not guarantee stability; use `std::stable_sort` when stability is required.

## Comparator Requirements

- Strict weak ordering: `cmp(a,a)` must be false;
- Do not write `<=`, otherwise the strict weak ordering may be violated;
- Write out all multiple keys, otherwise the order of equal elements is undefined.

```cpp
#include <string>

struct Person {
    std::string name;
    int score;
};

bool cmp(const Person& a, const Person& b) {
    if (a.score != b.score) return a.score > b.score;
    return a.name < b.name;
}
```

## Choosing Sort Keys

- Compare structures directly to avoid copying large objects;
- When key computation is expensive, compute the keys first and then sort;
- When stability is required, keep the original index as the last key.

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty container | Sorting is legal |
| All elements equal | The comparator must return false |
| Floating-point keys | NaN breaks the strict weak ordering |
| Stability | `sort` does not guarantee it |

## Exercises

1. Sort by "score descending, name ascending, original index ascending".
2. Compare the results of `sort` and `stable_sort` on equal elements.
3. Write a comparator that violates the strict weak ordering and observe the undefined behavior.

## Sources

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [cppreference](https://en.cppreference.com/)
- [Hello Algorithms](https://www.hello-algo.com/)

## Navigation

[← Previous](02-basic-sorts.md) · [Level Overview](index.md) · [Next](04-binary-search.md)
