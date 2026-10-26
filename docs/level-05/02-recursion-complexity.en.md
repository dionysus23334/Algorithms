# 5.2 Recursion Complexity

> **Level**: Level 5 · Core Algorithm Design Methods  
> **Status**: Expanded.

## Learning Objectives

- Write a recurrence from the code;
- Estimate it with a recursion tree or the substitution method;
- Use the three cases of the master theorem.

## Recurrences

```python
def f(n: int) -> int:
    if n <= 1:
        return 1
    return f(n // 2) + f(n // 2) + n
```

\[
T(n)=2T(n/2)+O(n).
\]

## Recursion Tree

Total cost per level:

- Level 0: \(n\)
- Level 1: \(n/2+n/2=n\)
- Level 2: \(4\cdot n/4=n\)
- \(\log_2 n+1\) levels in total

The sum is \(O(n\log n)\).

## Master Theorem

For \(T(n)=aT(n/b)+f(n)\), let \(c=\log_b a\):

1. If \(f(n)=O(n^{c-\varepsilon})\), then \(T(n)=\Theta(n^c)\);
2. If \(f(n)=\Theta(n^c)\), then \(T(n)=\Theta(n^c\log n)\);
3. If \(f(n)=\Omega(n^{c+\varepsilon})\) and the regularity condition holds, then \(T(n)=\Theta(f(n))\).

Examples:

- \(T(n)=2T(n/2)+n\): \(c=1\), case 2, \(O(n\log n)\);
- \(T(n)=T(n/2)+1\): \(c=0\), case 2, \(O(\log n)\);
- \(T(n)=2T(n/2)+n^2\): \(c=1\), case 3, \(O(n^2)\).

## Substitution Method

Guess \(T(n)\le cn\log n\) and substitute:

\[
T(n)\le 2c(n/2)\log(n/2)+n=cn\log n-cn+n\le cn\log n
\]

provided \(c\ge1\). Then verify the base case.

## Counting Code

```python
def calls(n: int) -> int:
    if n <= 1:
        return 1
    return 1 + calls(n // 2) + calls(n // 2)
```

For \(n=2^k\) the number of calls is \(2n-1\), consistent with \(O(n)\).

## Boundary Cases

| Case | Note |
|---|---|
| \(n\) is not a power of \(b\) | use floor and ceiling; the order is unchanged |
| Recursion depth | space \(O(\log n)\) or \(O(n)\) |
| Master theorem does not apply | when subproblem sizes are unequal, or \(f\) fails the conditions, use a recursion tree or substitution |

## Exercises

1. Analyze \(T(n)=4T(n/2)+n\).
2. Analyze \(T(n)=T(n-1)+n\).
3. Use a recursion tree to verify the order of \(T(n)=2T(n/2)+n\log n\).

## Sources

- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Open Data Structures](https://opendatastructures.org/)
- [Hello Algo](https://www.hello-algo.com/)

## Navigation

[← Previous](01-divide-conquer.md) · [Level Overview](index.md) · [Next](03-advanced-sorts.md)
