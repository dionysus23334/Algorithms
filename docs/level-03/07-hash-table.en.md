# 3.7 Hash Table and Set

> **Level**: Level 3 · Basic Data Structures  
> **Status**: Expanded.

## Learning Objectives

- Map keys to buckets with a hash function;
- Handle collisions and the load factor;
- Distinguish the average \(O(1)\) from the worst-case \(O(n)\).

## Model

A hash table consists of a bucket array and a hash function:

```text
index = hash(key) mod m
```

Different keys may land in the same bucket; this is called a **collision**. Common approaches:

- **Separate chaining**: each bucket holds a linked list;
- **Open addressing**: linear probing, quadratic probing, double hashing.

## Python Separate Chaining

```python
class HashTable:
    def __init__(self, buckets: int = 8) -> None:
        self._buckets: list[list[tuple[int, int]]] = [[] for _ in range(buckets)]
        self._size = 0

    def _index(self, key: int) -> int:
        return hash(key) % len(self._buckets)

    def put(self, key: int, value: int) -> None:
        bucket = self._buckets[self._index(key)]
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))
        self._size += 1

    def get(self, key: int) -> int | None:
        for k, v in self._buckets[self._index(key)]:
            if k == key:
                return v
        return None
```

Average \(O(1)\); in the worst case, when all keys collide, \(O(n)\).

## C++ Standard Library

```cpp
#include <iostream>
#include <string>
#include <unordered_map>

int main() {
    std::unordered_map<std::string, int> freq;
    for (std::string w : {"a", "b", "a"}) ++freq[w];
    std::cout << freq["a"] << '\n'; // 2
}
```

`unordered_map` does not preserve order; when order is needed, use `std::map` (\(O(\log n)\)).

## Load Factor and Resizing

The load factor is \(\alpha=n/m\). With separate chaining, the table is usually resized once \(\alpha\) exceeds about 1; with open addressing, \(\alpha<0.7\) is usually maintained. Resizing requires rehashing all keys, which costs \(O(n)\) once, while the amortized cost remains \(O(1)\).

## Requirements for Hash Functions

- The same key must hash to the same value every time;
- The distribution should be as uniform as possible;
- It must be consistent with equality: if `a == b`, then `hash(a) == hash(b)`;
- Do not let mutable fields participate in hashing.

## Boundary Cases

| Scenario | Note |
|---|---|
| Key does not exist | Return `None`/`end()`; do not insert by default |
| Many collisions | Worst case \(O(n)\); exploitable by malicious input |
| Resizing | Iterators/references may be invalidated |
| Floating-point/custom types | A hash and an equality must be defined |

## Exercises

1. Add resizing and rehashing to `HashTable`.
2. Find the first element in an array that occurs only once.
3. Compare the average/worst-case complexity of `dict`, `set`, `unordered_map` and `map`.

## Sources

- [Hello Algo](https://www.hello-algo.com/)
- [Open Data Structures](https://opendatastructures.org/)
- [cppreference](https://en.cppreference.com/)

## Navigation

[← Previous](06-queue-deque.md) · [Level Overview](index.md) · [Next](08-trees-binary.md)
