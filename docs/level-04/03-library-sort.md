# 4.3 标准库排序

> **级别**：第 4 级 · 基础算法与常用技巧  
> **状态**：已展开。

## 学习目标

- 用排序键、比较器、多关键字；
- 理解稳定排序与 `stable_sort`；
- 避免自己实现排序时的常见错误。

## Python：sorted / list.sort

```python
people = [("Alice", 90), ("Bob", 90), ("Cara", 85)]
by_score = sorted(people, key=lambda p: p[1], reverse=True)
print(by_score)

# 多关键字：先按分数降序，再按名字升序
by_both = sorted(people, key=lambda p: (-p[1], p[0]))
print(by_both)
```

`sorted` 返回新列表；`list.sort()` 原地排序。Python 排序稳定。

## C++：sort / stable_sort

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

`std::sort` 不保证稳定；需要稳定时用 `std::stable_sort`。

## 比较器要求

- 严格弱序：`cmp(a,a)` 必须为 false；
- 不能写 `<=`，否则可能违反严格弱序；
- 多关键字要写全，否则相等时顺序未定义。

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

## 排序键的选择

- 直接比较结构体，避免复制大对象；
- 键计算昂贵时，先算键再排序；
- 需要稳定时保留原始下标作为最后关键字。

## 边界

| 场景 | 注意 |
|---|---|
| 空容器 | 排序合法 |
| 全部相等 | 比较器必须返回 false |
| 浮点键 | NaN 破坏严格弱序 |
| 稳定性 | `sort` 不保证 |

## 练习

1. 按“分数降序、名字升序、原始下标升序”排序。
2. 比较 `sort` 与 `stable_sort` 在相等元素上的结果。
3. 写一个违反严格弱序的比较器，观察未定义行为。

## 来源

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [cppreference](https://en.cppreference.com/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](02-basic-sorts.md) · [本级总览](index.md) · [下一章](04-binary-search.md)
