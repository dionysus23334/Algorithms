# 1.7 Basic Simulation

> **Level**: Level 1 · Programming and Algorithms: Getting Started  
> **Status**: expanded.

## Learning Objectives

- Translate rules into states and state transitions;
- Advance a simulation in time steps with loops;
- Handle input, boundaries and termination conditions.

## The Three Parts of a Simulation

1. **State**: which variables describe the current situation completely;
2. **Rules**: how each step derives the new state from the old one;
3. **Termination**: how many steps to simulate, when to stop, and what to output.

## Example: A Robot Walking on a Grid

The robot starts at \((0,0)\) in an \(n\times m\) grid and moves according to the commands `U/D/L/R`; a command that would leave the grid is ignored. Output the final position and the number of distinct cells visited.

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

C++ records the visited cells with a `set<pair<int,int>>`:

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

## Example: One Step of the Game of Life

Rules: each cell looks at its 8 neighbours; a live cell dies if it has fewer than 2 or more than 3 live neighbours; a dead cell becomes alive if it has exactly 3 live neighbours.

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

Time \(O(nm)\), extra space \(O(nm)\). Updating in place requires dealing with the mixing of the old and new states, which usually needs extra markers or double buffering.

## Boundary Cases

| Scenario | Note |
|---|---|
| Empty grid | Return immediately when `n=0` or `m=0` |
| Command leaving the grid | Ignore it; the state does not change |
| Invalid character | Ignore it explicitly or report an error |
| Number of simulation steps | Fixed number of steps / until stable / detect a cycle |
| State explosion | Watch memory when recording visited states |

## Exercises

1. Add obstacles to the robot: stop or detour when an obstacle is encountered.
2. Implement a \(k\)-step simulation of "Conway's Game of Life" and output the number of live cells at each step.
3. Design an "elevator scheduling" simulation and state its state, rules and termination conditions.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [OI Wiki](https://oi-wiki.org/)
- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)

## Navigation

[← Previous](06-references-copy.md) · [Level Overview](index.md) · [Next](08-debugging-boundaries.md)
