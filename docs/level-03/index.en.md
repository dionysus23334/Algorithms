# Level 3 · Basic Data Structures

> **Goal**: master how data is organized and the cost of its operations.
>
> The chapter table below is the table of contents and the writing order; each chapter ultimately provides dual Python / C++ implementations, a running example and boundary cases.

## Chapters

| Chapter | Outline | Python / C++ Implementations |
|---|---|---|
| 01 | [Storage and Nodes](01-storage-nodes.md) | Contiguous storage, nodes, object references; pointers, lifetime, ownership | Python reference linking; C++ pointers and resource management |
| 02 | [Dynamic Array](02-dynamic-array.md) | Indexed access, insertion and deletion, capacity, resizing, amortized cost | Teaching implementation; list / vector |
| 03 | [Linked List](03-linked-list.md) | Singly linked list, doubly linked list, insertion, deletion, reversal | Dual-language node and linked-list implementations |
| 04 | [Stack](04-stack.md) | Last in, first out, bracket matching, expression handling | Hand-written stack; list / stack |
| 05 | [Recursion and the Call Stack](05-recursion-stack.md) | Base cases, unfolding and return, inductive proof, recursion depth | Recursion and iterative conversion |
| 06 | [Queue and Deque](06-queue-deque.md) | First in, first out, circular queue, operations at both ends | Hand-written circular queue; deque / queue |
| 07 | [Hash Table and Set](07-hash-table.md) | Hash functions, collisions, load factor, average and worst-case cost | Hand-written hash table; dict / set; unordered associative containers |
| 08 | [Trees and Binary Trees](08-trees-binary.md) | Root, subtree, depth; preorder, inorder, postorder and level-order traversal | Node definitions, recursive and iterative traversal |
| 09 | [Binary Search Tree](09-bst.md) | Search, insertion, deletion, tree height and degeneration | Hand-written binary search tree |
| 10 | [Heap and Priority Queue](10-heap.md) | Heap property, sift-up, sift-down, heap construction | Hand-written binary heap; heapq / priority_queue |
| 11 | [Disjoint Set Union](11-dsu.md) | Representative element, union, path compression, union by size | Hand-written disjoint set union |
| 12 | [Graph Storage](12-graph-storage.md) | Directed graph, undirected graph, edge weights, adjacency list, adjacency matrix | Graph construction and basic operations |

## Writing conventions

- First give the problem and the interface, then the implementation;
- The Python version prioritizes expressing the algorithm structure;
- The C++ version demonstrates pointers, memory layout, ownership and resource management;
- Each chapter contains at least: normal cases, boundary cases, complexity analysis, exercises.
