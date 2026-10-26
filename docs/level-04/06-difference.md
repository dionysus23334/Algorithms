# 4.6 差分

> **级别**：第 4 级 · 基础算法与常用技巧  
> **状态**：已展开。

## 学习目标

- 用差分做区间加法；
- 通过前缀和还原数组；
- 处理一维与二维区间修改。

## 一维差分

对区间 \([l,r)\) 加 \(v\)：

```text
diff[l] += v
diff[r] -= v
```

最后做前缀和得到每个位置的总增量。

```python
def range_add(n: int, ops: list[tuple[int,int,int]]) -> list[int]:
    diff = [0] * (n + 1)
    for l, r, v in ops:
        diff[l] += v
        diff[r] -= v
    out = [0] * n
    cur = 0
    for i in range(n):
        cur += diff[i]
        out[i] = cur
    return out
```

\(q\) 次修改 \(O(q)\)，还原 \(O(n)\)。

## 二维差分

对子矩阵 \((r_1,c_1)\) 到 \((r_2,c_2)\)（不含右下）加 \(v\)：

```text
diff[r1][c1] += v
diff[r2][c1] -= v
diff[r1][c2] -= v
diff[r2][c2] += v
```

再做二维前缀和。

## C++ 一维

```cpp
#include <iostream>
#include <vector>

int main() {
    int n = 5;
    std::vector<int> diff(n + 1, 0);
    auto add = [&](int l, int r, int v) { diff[l] += v; diff[r] -= v; };
    add(1, 4, 2);
    add(2, 5, 3);
    int cur = 0;
    for (int i = 0; i < n; ++i) {
        cur += diff[i];
        std::cout << cur << ' ';
    }
}
```

## 边界

| 场景 | 注意 |
|---|---|
| \(r=n\) | 差分数组要开 \(n+1\) |
| 空区间 | \(l==r\) 时加/减抵消 |
| 多次修改 | 先全部记录，最后统一还原 |
| 大值 | 用 `long long` |

## 练习

1. 实现二维差分并输出最终矩阵。
2. 用差分统计每个位置被多少区间覆盖。
3. 比较差分与线段树在区间加、单点查询上的取舍。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [cp-algorithms](https://cp-algorithms.com/)

## 导航

[← 上一章](05-prefix-sum.md) · [本级总览](index.md) · [下一章](07-two-pointers.md)
