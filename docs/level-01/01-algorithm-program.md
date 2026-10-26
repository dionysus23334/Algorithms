# 1.1 算法与程序

> **级别**：第 1 级 · 编程与算法入门  
> **状态**：已展开（概念、双语言实现、边界用例、练习）。

## 学习目标

- 说清“算法”和“程序”的区别；
- 把一个问题拆成输入、处理、输出；
- 用伪代码描述步骤，再分别用 Python、C++ 实现；
- 用空输入、单元素、重复值检查程序。

## 算法与程序

**算法**是解决一类问题的有限步骤：每一步必须有明确含义，执行有限步后停止，并给出合法输出。  
**程序**是算法在某种语言中的具体实现；同一个算法可以有不同程序。

描述一个算法至少要说清：

1. **输入**：允许什么数据，规模多大；
2. **输出**：合法结果是什么；
3. **过程**：每一步做什么；
4. **终止性**：为什么一定会停；
5. **正确性**：为什么输出满足要求。

### 例：求和、最大值、计数

给定一个整数数组 \(a\)，分别求：

- 所有元素之和；
- 最大元素；
- 满足 \(a_i>0\) 的元素个数。

**伪代码**：

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

这段伪代码默认数组非空；空数组的最大值没有定义，必须单独处理。这是“边界条件”第一次出现。

## Python 实现

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

## C++ 实现

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

## 复杂度

- 时间：\(O(n)\)，每个元素只扫描一次；
- 额外空间：\(O(1)\)（不算输入与返回结构）。

## 边界用例

| 输入 | 期望 |
|---|---|
| `[]` | 明确返回“无结果”，不能访问 `a[0]` |
| `[0]` | sum=0, max=0, positive=0 |
| `[-5]` | sum=-5, max=-5, positive=0 |
| `[1, 1, 1]` | 重复值不影响结果 |

## 练习

1. 增加“最小值”和“偶数个数”，仍保持 \(O(n)\)、\(O(1)\)。
2. 如果数组长度可达 \(10^6\)，Python 的 `sum` 与手写循环有何差异？请实测。
3. 写一个版本，输入为空时抛出异常而不是返回 `None`；说明接口设计的取舍。

## 来源

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 本级总览](index.md) · [下一章](02-variables-types.md)
