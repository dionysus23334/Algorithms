# 3.4 Stack

> **Level**: Level 3 · Basic Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Understand last in, first out (LIFO);
- Use a stack for bracket matching and expression handling;
- Know the \(O(1)\) operations and space cost of a stack.

## Interface

```text
push(x)  push onto the stack
pop()    pop the top of the stack
top()    inspect the top of the stack
empty()  whether the stack is empty
```

## Python Implementation

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

## C++ Implementation

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

## Bracket Matching

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

Time \(O(n)\), worst-case space \(O(n)\) (all opening brackets).

## Expression Evaluation

For postfix (reverse Polish) expressions, push a number when one is encountered, and when an operator is encountered pop two numbers, compute, and push the result back. The stack makes the "most recent operands" naturally available.

## Boundary Cases

| Scenario | Note |
|---|---|
| pop/top on an empty stack | Throw an exception or return an error code; must not go out of bounds |
| Only closing brackets | Fail immediately |
| Only opening brackets | The stack is non-empty at the end, so fail |
| Recursion depth | The system call stack can also overflow |

## Exercises

1. Use a stack to determine whether a string is a palindrome (ignoring non-letters).
2. Implement postfix expression evaluation, handling division by zero.
3. Implement a queue using two stacks.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [OI Wiki](https://oi-wiki.org/)

## Navigation

[← Previous](03-linked-list.md) · [Level Overview](index.md) · [Next](05-recursion-stack.md)
