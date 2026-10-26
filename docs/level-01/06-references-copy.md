# 1.6 引用与复制

> **级别**：第 1 级 · 编程与算法入门  
> **状态**：已展开。

## 学习目标

- 区分“名字绑定”“对象共享”“复制对象”；
- 理解 Python 的赋值、浅拷贝、深拷贝；
- 理解 C++ 的值、引用、指针与所有权。

## Python：赋值不复制对象

```python
a = [1, 2, 3]
b = a          # b 与 a 绑定同一个 list
b.append(4)
print(a)       # [1, 2, 3, 4]

c = a.copy()   # 浅拷贝
c.append(5)
print(a)       # [1, 2, 3, 4]
```

嵌套对象时，浅拷贝只复制外层：

```python
import copy
a = [[1], [2]]
b = a.copy()
b[0].append(9)
print(a)          # [[1, 9], [2]]
d = copy.deepcopy(a)
d[1].append(8)
print(a)          # [[1, 9], [2]]
```

## C++：值、引用、指针

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a{1, 2, 3};
    std::vector<int> b = a;        // 值复制
    b.push_back(4);
    std::cout << a.size() << ' ' << b.size() << '\n'; // 3 4

    std::vector<int>& r = a;       // 引用：同一个对象
    r.push_back(5);
    std::cout << a.size() << '\n'; // 4

    std::vector<int>* p = &a;      // 指针：需要解引用与空指针检查
    p->push_back(6);
    std::cout << a.back() << '\n'; // 6
}
```

### 所有权与生命周期

- 栈对象离开作用域自动销毁；
- `new` 出来的对象需要 `delete`（现代 C++ 优先用 `std::unique_ptr` / `std::shared_ptr`）；
- 引用必须绑定到有效对象，不能悬空；
- 返回局部变量的引用/指针是错误。

```cpp
#include <memory>

std::unique_ptr<int> make_value(int x) {
    return std::make_unique<int>(x);
}
```

## 什么时候复制，什么时候共享

| 需求 | Python | C++ |
|---|---|---|
| 只读传递大对象 | 直接传引用（对象共享） | `const T&` |
| 需要独立修改 | `copy()` / `deepcopy()` | 按值传参或显式复制 |
| 需要修改调用者对象 | 传可变对象 | `T&` |
| 需要可为空 | `None` | `T*` 或 `std::optional<T>` |

## 边界用例

| 场景 | 注意 |
|---|---|
| 默认参数是可变对象 | `def f(a=[])` 会跨调用共享；用 `None` 代替 |
| 浅拷贝嵌套列表 | 内层仍共享 |
| C++ 返回局部引用 | 悬空引用，未定义行为 |
| 指针未初始化 | 必须先赋值或置 `nullptr` |

## 练习

1. 写一个函数，验证 Python 的“传参”是对象引用传递，而不是复制。
2. 用 C++ 分别写按值、按引用、按 `const&` 的三个版本，打印地址验证。
3. 实现一个简单的 `Matrix` 类，说明拷贝构造与移动构造的差别。

## 来源

- [Python Tutorial](https://docs.python.org/zh-cn/3/tutorial/)
- [cppreference](https://en.cppreference.com/)
- [Hello 算法](https://www.hello-algo.com/)

## 导航

[← 上一章](05-arrays-strings.md) · [本级总览](index.md) · [下一章](07-simulation.md)
