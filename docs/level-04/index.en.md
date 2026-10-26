# Level 4 · Basic Algorithms and Techniques

> **Goal**: master common processing methods and reduce repeated computation.
>
> The chapter list below is the table of contents and the writing order; each chapter ultimately provides Python / C++ dual-language implementations, running examples and boundary cases.

## Chapters

| Chapter | Content outline | Python / C++ implementation |
|---|---|---|
| 01 | [Enumeration and Search](01-enumeration-search.md) | Categorical enumeration, linear search, early termination | Search, pairing, simple exhaustive enumeration |
| 02 | [Basic Sorting](02-basic-sorts.md) | Selection, bubble and insertion sort; stability | Hand-written implementations of the three sorts |
| 03 | [Standard Library Sorting](03-library-sort.md) | Sort keys, comparators, multiple keys, stability | sorted / sort, stable_sort |
| 04 | [Binary Search](04-binary-search.md) | Interval conventions, boundary shrinking, lower and upper bounds | Hand-written binary search; bisect / standard library |
| 05 | [Prefix Sum](05-prefix-sum.md) | One- and two-dimensional accumulation, range sum queries | One- and two-dimensional prefix sums |
| 06 | [Difference Arrays](06-difference.md) | Range updates, cumulative recovery | One-dimensional difference and its two-dimensional extension |
| 07 | [Two Pointers](07-two-pointers.md) | Converging and same-direction movement, deduplication, merging sorted sequences | Two sum, in-place deduplication |
| 08 | [Sliding Window](08-sliding-window.md) | Fixed-length and variable-length windows, state maintenance, applicability conditions | Statistics over contiguous ranges |
| 09 | [Bitwise Operations](09-bitwise.md) | AND, OR, XOR, shifts, masks, sign and bit width | Bit operations, subset representation, XOR prefix |
| 10 | [Discretization](10-discretization.md) | Sorting and deduplication, rank mapping, order relations | Coordinate compression and queries |

## Writing Conventions

- Present the problem and the interface first, then the implementation;
- The Python version prioritizes expressing the algorithm structure;
- The C++ version demonstrates pointers, memory layout, ownership and resource management;
- Each chapter contains at least: a normal case, a boundary case, complexity analysis and exercises.
