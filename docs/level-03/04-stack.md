# 3.4 栈

> **级别**：第 3 级 · 基础数据结构  
> **状态**：已展开。

## 学习目标

- 理解后进先出（LIFO）；
- 用栈做括号匹配与表达式处理；
- 知道栈的 \(O(1)\) 操作与空间代价。

## 接口

```text
push(x)  入栈
pop()    弹出栈顶
top()    查看栈顶
empty()  是否为空
```

## Python 实现

```python
class Stack:
    def __init__(self) -> None:
        self._data: list[int] = []

    def push(self, x: int) -> None:
        self._data.append(x)

    def pop(self) -> int:
        if not self._data:
            raise IndexError("pop from empty stack")
        return self._data.pop()

    def top(self) -> int:
        if not self._data:
            raise IndexError("top from empty stack")
        return self._data[-1]

    def empty(self) -> bool:
        return not self._data
```

## C++ 实现

```cpp
#include <stdexcept>
#include <vector>

class Stack {
    std::vector<int> data_;
public:
    void push(int x) { data_.push_back(x); }
    int pop() {
        if (data_.empty()) throw std::underflow_error("empty");
        int x = data_.back();
        data_.pop_back();
        return x;
    }
    int top() const {
        if (data_.empty()) throw std::underflow_error("empty");
        return data_.back();
    }
    bool empty() const { return data_.empty(); }
};
```

## 括号匹配

```python
def is_balanced(s: str) -> bool:
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack
```

时间 \(O(n)\)，最坏空间 \(O(n)\)（全是左括号）。

## 表达式求值

后缀表达式（逆波兰）遇到数字入栈，遇到运算符弹出两个数计算再入栈。栈让“最近的操作数”自然可用。

## 边界

| 场景 | 注意 |
|---|---|
| 空栈 pop/top | 抛异常或返回错误码，不能越界 |
| 只有右括号 | 立即失败 |
| 只有左括号 | 结束时栈非空，失败 |
| 递归深度 | 系统调用栈也可能溢出 |

## 练习

1. 用栈判断字符串是否为回文（忽略非字母）。
2. 实现后缀表达式求值，处理除零。
3. 用两个栈实现队列。

## 来源

- [Hello 算法](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [OI Wiki](https://oi-wiki.org/)

## 导航

[← 上一章](03-linked-list.md) · [本级总览](index.md) · [下一章](05-recursion-stack.md)
