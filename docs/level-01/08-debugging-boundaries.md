# 1.8 调试与边界

> **级别**：第 1 级 · 编程与算法入门  
> **状态**：已展开。

## 学习目标

- 用断言与最小用例定位错误；
- 系统检查空输入、重复值、越界、整数范围、浮点误差；
- 知道“能跑”不等于“正确”。

## 调试顺序

1. **复现**：保留最小输入；
2. **缩小**：删掉无关数据；
3. **观察**：打印关键状态，而不是只打印结果；
4. **假设**：提出一个可验证的原因；
5. **验证**：改一处，重跑；
6. **回归**：把用例加入测试，防止再次出现。

```python
def max_index(a: list[int]) -> int:
    assert a, "max_index requires a non-empty list"
    best = 0
    for i in range(1, len(a)):
        if a[i] > a[best]:
            best = i
    return best
```

## 常见边界

### 空输入

```python
def first(a):
    if not a:
        raise ValueError("empty")
    return a[0]
```

### 重复值

返回第一个最大值还是最后一个？必须写清楚并测试。

```python
def first_max(a: list[int]) -> int:
    best = 0
    for i in range(1, len(a)):
        if a[i] > a[best]:  # 严格大于：保留第一个
            best = i
    return best
```

### 越界与 off-by-one

二分查找最容易出现 `left <= right` 与 `left < right` 混用：

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

返回第一个 \(\ge x\) 的位置；`hi = len(a)` 允许“全部小于 x”时返回 `n`。

### 整数范围

```python
def safe_sum(a: list[int]) -> int:
    return sum(a)  # Python 整数不会溢出
```

C++ 中要估计上界：

```cpp
#include <vector>

long long sum(const std::vector<int>& a) {
    long long s = 0;
    for (int x : a) s += x;
    return s;
}
```

### 浮点误差

```python
def close(a: float, b: float, eps: float = 1e-9) -> bool:
    return abs(a - b) <= eps * max(1.0, abs(a), abs(b))
```

不要用 `==` 比较计算结果；相对误差与绝对误差要一起考虑。

## 随机对拍

用朴素解法验证优化解法：

```python
import random

def brute(a):
    return max(a) if a else None

def fast(a):
    return max(a) if a else None

for _ in range(1000):
    n = random.randint(0, 20)
    a = [random.randint(-10, 10) for _ in range(n)]
    assert brute(a) == fast(a), a
```

## 检查清单

- [ ] 空输入、单元素、全相同；
- [ ] 最小值、最大值、负数；
- [ ] 下标 0、`n-1`、`n`；
- [ ] 整数溢出与类型转换；
- [ ] 浮点误差与容差；
- [ ] 断言在发布版本是否保留；
- [ ] 错误信息是否足够定位问题。

## 练习

1. 给第 1.1 节的 `summarize` 写 10 个边界用例。
2. 实现 `upper_bound`，并说明与 `lower_bound` 的差别。
3. 用随机对拍验证插入排序与 `sorted` 的结果一致。

## 来源

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 上一章](07-simulation.md) · [本级总览](index.md)
