# 9.4 Complexity Classes

> **Level**: Level 9 · Algorithm Theory and Computational Limits  
> **Status**: Expanded.

## Learning Objectives

- Define P, NP and coNP;
- Distinguish "solving" from "verifying";
- Understand NP-hard/NP-complete.

## P and NP

- **P**: decision problems solvable by a polynomial-time algorithm;
- **NP**: there is a polynomial-time verifier, so that "yes" can be verified in polynomial time given a certificate;
- **coNP**: the complement problem is in NP.

\[
P\subseteq NP,\qquad P\subseteq coNP.
\]

Whether \(P=NP\) is unresolved.

## Verifiers

Taking SAT as an example, the certificate is an assignment:

```python
def verify_sat(clauses: list[list[int]], assignment: dict[int,bool]) -> bool:
    for clause in clauses:
        if not any(assignment.get(abs(lit), False) == (lit > 0) for lit in clause):
            return False
    return True
```

Verification takes \(O(\text{total clause length})\); but finding an assignment may be exponential.

## NP-hard and NP-complete

- \(L\) is NP-hard: every NP problem \(\le_p L\);
- \(L\) is NP-complete: \(L\in NP\) and \(L\) is NP-hard;
- SAT was the first problem proved NP-complete (Cook–Levin).

## C++ Verifier

```cpp
#include <vector>

bool verify_sat(const std::vector<std::vector<int>>& clauses,
                const std::vector<int>& value) {
    for (const auto& clause : clauses) {
        bool ok = false;
        for (int lit : clause) {
            bool v = value[std::abs(lit)] != 0;
            if ((lit > 0) == v) { ok = true; break; }
        }
        if (!ok) return false;
    }
    return true;
}
```

## Boundary Cases

| Concept | Note |
|---|---|
| NP | only requires a short certificate for "yes" |
| coNP | is not defined as the complement of NP |
| NP-hard | does not require membership in NP |
| Exponential time | NP does not rule out exponential algorithms |

## Exercises

1. Prove that SAT ∈ NP.
2. Explain why "fast to verify" does not imply "fast to solve".
3. Give an example of a coNP problem.

## Sources

- [Barak — Introduction to Theoretical Computer Science](https://introtcs.org/public/)
- [Erickson — Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)
- [Tim Roughgarden — CS261](https://timroughgarden.org/w16/w16.html)

## Navigation

[← Previous](03-reductions.md) · [Level Overview](index.md) · [Next](05-np-complete.md)
