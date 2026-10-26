# 1.7 基础模拟

> **级别**：第 1 级 · 编程与算法入门  
> **状态**：已展开。

## 学习目标

- 把规则翻译成状态与状态转移；
- 用循环按时间步推进模拟；
- 处理输入、边界与终止条件。

## 模拟的三件事

1. **状态**：当前局面由哪些变量完整描述；
2. **规则**：每一步如何从旧状态得到新状态；
3. **终止**：模拟多少步、何时停止、输出什么。

## 例：机器人走网格

机器人在 \(n\times m\) 网格中，从 \((0,0)\) 出发，按指令 `U/D/L/R` 移动；越界则忽略该指令。输出最终位置与访问过的不同格子数。

```python
def simulate(n: int, m: int, commands: str) -> tuple[int, int, int]:
    r = c = 0
    visited = {(0, 0)}
    delta = {"U": (-1, 0), "D": (1, 0), "L": (0, -1), "R": (0, 1)}
    for ch in commands:
        if ch not in delta:
            continue
        dr, dc = delta[ch]
        nr, nc = r + dr, c + dc
        if 0 <= nr < n and 0 <= nc < m:
            r, c = nr, nc
            visited.add((r, c))
    return r, c, len(visited)
```

C++ 用 `set<pair<int,int>>` 记录访问：

```cpp
#include <set>
#include <string>
#include <utility>

std::tuple<int,int,int> simulate(int n, int m, const std::string& commands) {
    int r = 0, c = 0;
    std::set<std::pair<int,int>> visited{{0, 0}};
    for (char ch : commands) {
        int dr = 0, dc = 0;
        if (ch == 'U') dr = -1;
        else if (ch == 'D') dr = 1;
        else if (ch == 'L') dc = -1;
        else if (ch == 'R') dc = 1;
        else continue;
        int nr = r + dr, nc = c + dc;
        if (0 <= nr && nr < n && 0 <= nc && nc < m) {
            r = nr; c = nc;
            visited.insert({r, c});
        }
    }
    return {r, c, static_cast<int>(visited.size())};
}
```

## 例：生命游戏的一步

规则：每个格子看 8 邻域；活细胞邻居少于 2 或多于 3 则死；死细胞恰好 3 个邻居则活。

```python
def step(board: list[list[int]]) -> list[list[int]]:
    n, m = len(board), len(board[0])
    nxt = [[0] * m for _ in range(n)]
    for i in range(n):
        for j in range(m):
            alive = 0
            for di in (-1, 0, 1):
                for dj in (-1, 0, 1):
                    if di == 0 and dj == 0:
                        continue
                    ni, nj = i + di, j + dj
                    if 0 <= ni < n and 0 <= nj < m:
                        alive += board[ni][nj]
            if board[i][j] == 1:
                nxt[i][j] = 1 if alive in (2, 3) else 0
            else:
                nxt[i][j] = 1 if alive == 3 else 0
    return nxt
```

时间 \(O(nm)\)，额外空间 \(O(nm)\)。如果要原地更新，必须处理“旧状态/新状态”混用问题，通常需要额外标记或双缓冲。

## 边界用例

| 场景 | 注意 |
|---|---|
| 空网格 | `n=0` 或 `m=0` 时直接返回 |
| 指令越界 | 忽略，不改变状态 |
| 非法字符 | 明确忽略或报错 |
| 模拟步数 | 固定步数 / 直到稳定 / 检测循环 |
| 状态爆炸 | 记录 visited 时注意内存 |

## 练习

1. 给机器人增加障碍物，遇到障碍停止或绕行。
2. 实现“康威生命游戏”的 \(k\) 步模拟，输出每步活细胞数。
3. 设计一个“电梯调度”模拟，说明状态、规则与终止条件。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)

## 导航

[← 上一章](06-references-copy.md) · [本级总览](index.md) · [下一章](08-debugging-boundaries.md)
