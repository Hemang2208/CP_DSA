# Codeforces JavaScript Template Library

Reusable JavaScript (CommonJS) templates organized by topic. Every file contains:

- A header with the topic, pattern, use cases, and example problem source.
- A fast input parser using `fs.readFileSync(0, "utf-8")`.
- A reusable implementation (function or class).
- One complete sample problem solution.
- Buffered output via `outcomes.push(...)` and `join("\n")`.

All templates follow the style of `00_Base/Hemang.js` and `02_DataStructures/Stack.js`.
No `Input.txt` or `Output.txt` files are included.

## Run Instructions

```bash
node "06_GraphAlgorithms/Dijkstra.js" < "Input.txt" > "Output.txt"
```

For a quick inline test without files:

```bash
printf '1\n4 4\n1 2 1\n1 3 4\n2 3 2\n3 4 1\n' | node "06_GraphAlgorithms/Dijkstra.js"
```

Each template reads the first token as the number of test cases `t`, unless the
header states otherwise.

## Topic Index

See `TOPIC_INDEX.md` for a section-by-section mapping from
`../DSA_Final_Topic_Checklist.txt` to the closest runnable templates.

## Directory Overview

| Folder                      | Topics                                               | Files |
| --------------------------- | ---------------------------------------------------- | ----: |
| `00_Base`                   | Starter template                                     |     1 |
| `01_Basic`                  | Arrays, strings, sorting, searching, windows         |    21 |
| `02_DataStructures`         | Stack, queue, linked lists, heaps, hash maps, trie   |    15 |
| `03_Intermediate`           | Recursion, greedy, sorting, BFS/DFS, DSU             |    20 |
| `04_DynamicProgramming`     | 1D/2D, knapsack, LIS, LCS, bitmask, digit, tree      |    15 |
| `05_AdvancedDataStructures` | Fenwick, segment trees, sparse table, ordered set    |    13 |
| `06_GraphAlgorithms`        | Shortest paths, MST, SCC, LCA, HLD, Euler tour       |    22 |
| `07_MathematicsAndStrings`  | Sieve, modular math, KMP, hashing, suffix structures |    20 |
| `08_AdvancedCP`             | Meet in the middle, SOS, Mo, CHT, Li Chao, games     |    20 |

## 00_Base

| File        | Technique        | Time     | Difficulty |
| ----------- | ---------------- | -------- | ---------- |
| `Hemang.js` | Fast I/O starter | O(input) | Easy       |

## 01_Basic

| File                                   | Technique                                       | Time                    | Difficulty |
| -------------------------------------- | ----------------------------------------------- | ----------------------- | ---------- |
| `Arrays.js`                            | Traversal and aggregates                        | O(n)                    | Easy       |
| `Strings.js`                           | String processing                               | O(n)                    | Easy       |
| `BasicMaths.js`                        | Arithmetic and divisibility                     | O(1) per check          | Easy       |
| `Sorting.js`                           | Bubble, selection, and insertion sort           | O(n^2)                  | Easy       |
| `Searching.js`                         | Linear search and occurrence lookup             | O(n)                    | Easy       |
| `FrequencyCounting.js`                 | Frequency maps and distinct counts              | O(n)                    | Easy       |
| `Hashing.js`                           | Hash-based lookup                               | O(n) average            | Easy       |
| `TwoPointers.js`                       | Two pointers                                    | O(n)                    | Easy       |
| `SlidingWindow.js`                     | Fixed/variable window                           | O(n)                    | Easy       |
| `PrefixSum.js`                         | Prefix sums                                     | O(n) build, O(1) query  | Easy       |
| `DifferenceArray.js`                   | Range updates                                   | O(n + q)                | Easy       |
| `BinarySearch.js`                      | Exact search, bounds, and occurrence count      | O(log n)                | Easy       |
| `ArrayAlgorithms.js`                   | Majority, permutation, rotation, subarray scans | O(n)                    | Medium     |
| `AdvancedSearching.js`                 | Rotated, ternary, exponential, answer search    | O(log n) / O(log range) | Medium     |
| `AdvancedSorting.js`                   | Counting, radix, heap, and frequency sorting    | O(n + k) / O(n log n)   | Medium     |
| `HashingAdvanced.js`                   | Prefix XOR, grouping, window frequencies        | O(n + q)                | Medium     |
| `Matrices.js`                          | Traversal, rotation, spiral, Pascal triangle    | O(nm)                   | Medium     |
| `PrefixSumAdvanced.js`                 | 2D prefix, XOR, product, modulo counting        | O(nm + q)               | Medium     |
| `ProgrammingFundamentalsComplexity.js` | Complexity and number fundamentals              | O(log n)                | Easy       |
| `RecursionFundamentals.js`             | Recursive decomposition basics                  | O(n) / exponential      | Easy       |
| `StringAlgorithms.js`                  | Palindromes, anagrams, and parsing              | O(n)                    | Medium     |

## 02_DataStructures

| File                        | Technique                                    | Time               | Difficulty |
| --------------------------- | -------------------------------------------- | ------------------ | ---------- |
| `Stack.js`                  | Array stack, min stack, max stack            | O(1)               | Easy       |
| `Queue.js`                  | Circular array queue                         | O(1) amortized     | Easy       |
| `Deque.js`                  | Double-ended queue                           | O(1) amortized     | Easy       |
| `LinkedList.js`             | Singly linked list with insert/delete/search | O(1) insert/delete | Easy       |
| `LinkedListAlgorithms.js`   | Reversal, cycle, merge, palindrome, K-group  | O(n)               | Medium     |
| `PriorityQueue.js`          | Binary heap wrapper                          | O(log n)           | Easy       |
| `MinHeap.js`                | Binary min-heap                              | O(log n)           | Easy       |
| `MaxHeap.js`                | Binary max-heap                              | O(log n)           | Easy       |
| `HashMap.js`                | Chained hash map                             | O(1) average       | Easy       |
| `HashSet.js`                | Chained hash set                             | O(1) average       | Easy       |
| `LRUCache.js`               | Hash map + doubly linked list                | O(1)               | Medium     |
| `MonotonicStack.js`         | Next/previous bounds, span, histogram        | O(n)               | Medium     |
| `MonotonicQueue.js`         | Window extrema and first negative            | O(n)               | Medium     |
| `Trie.js`                   | Insert, search, prefix count, delete         | O(L)               | Medium     |
| `StackQueueApplications.js` | Parentheses, expressions, queue simulation   | O(n)               | Medium     |

## 03_Intermediate

| File                          | Technique                            | Time                    | Difficulty |
| ----------------------------- | ------------------------------------ | ----------------------- | ---------- |
| `Recursion.js`                | Recursive decomposition              | O(2^n)                  | Easy       |
| `Backtracking.js`             | State-space search                   | Exponential             | Medium     |
| `Greedy.js`                   | Local optimal choice                 | O(n log n)              | Easy       |
| `DivideAndConquer.js`         | Divide and conquer                   | O(n log n)              | Medium     |
| `MergeSort.js`                | Merge sort                           | O(n log n)              | Easy       |
| `QuickSort.js`                | Quick sort                           | O(n log n) average      | Medium     |
| `QuickSelect.js`              | k-th order statistic                 | O(n) average            | Medium     |
| `KadaneAlgorithm.js`          | Maximum subarray                     | O(n)                    | Easy       |
| `BFS.js`                      | Breadth-first search                 | O(V + E)                | Easy       |
| `DFS.js`                      | Depth-first search                   | O(V + E)                | Easy       |
| `TopologicalSort.js`          | Kahn's algorithm                     | O(V + E)                | Medium     |
| `DSU.js`                      | Union-find                           | O(alpha(n))             | Medium     |
| `TreeTraversal.js`            | Pre/in/post order                    | O(n)                    | Easy       |
| `BinarySearchTree.js`         | BST operations                       | O(h)                    | Medium     |
| `HeapApplications.js`         | Top-k / merging                      | O(n log k)              | Medium     |
| `BacktrackingApplications.js` | Permutations, combinations, N-Queens | Exponential             | Medium     |
| `BinaryTreeAlgorithms.js`     | Traversal, views, and diameter       | O(n)                    | Medium     |
| `DivideAndConquerAdvanced.js` | Counting, closest pair, and merges   | O(n log n)              | Hard       |
| `GreedyApplications.js`       | Scheduling and interval selection    | O(n log n)              | Medium     |
| `HeapAndTrieApplications.js`  | K-th order and prefix queries        | O((n + q) log n) / O(L) | Hard       |

## 04_DynamicProgramming

| File                      | Technique                           | Time                | Difficulty |
| ------------------------- | ----------------------------------- | ------------------- | ---------- |
| `DP1D.js`                 | One-dimensional DP                  | O(n)                | Easy       |
| `DP2D.js`                 | Two-dimensional DP                  | O(nm)               | Medium     |
| `KnapsackDP.js`           | 0/1 knapsack                        | O(nW)               | Medium     |
| `LIS.js`                  | Longest increasing subsequence      | O(n log n)          | Medium     |
| `LCS.js`                  | Longest common subsequence          | O(nm)               | Medium     |
| `GridDP.js`               | Grid path DP                        | O(nm)               | Easy       |
| `IntervalDP.js`           | Interval DP                         | O(n^3)              | Hard       |
| `BitmaskDP.js`            | Subset DP                           | O(2^n \* n)         | Hard       |
| `DigitDP.js`              | Digit DP                            | O(states \* digits) | Hard       |
| `TreeDP.js`               | DP on trees                         | O(n)                | Medium     |
| `DPWithPrefixSum.js`      | Prefix-sum transition               | O(n)                | Medium     |
| `DPWithMonotonicQueue.js` | Sliding-window transition           | O(n)                | Hard       |
| `DPClassic.js`            | Fibonacci, stairs, and house robber | O(n)                | Medium     |
| `DPSubsequences.js`       | Subsequence and partition variants  | O(n^2) / O(nW)      | Medium     |
| `DPAdvancedPatterns.js`   | State compression and optimization  | O(nk) to O(2^n n)   | Hard       |

## 05_AdvancedDataStructures

| File                                | Technique                                 | Time                         | Difficulty |
| ----------------------------------- | ----------------------------------------- | ---------------------------- | ---------- |
| `FenwickTree.js`                    | Binary indexed tree                       | O(log n)                     | Medium     |
| `SegmentTree.js`                    | Point update / range query                | O(log n)                     | Medium     |
| `LazySegmentTree.js`                | Lazy propagation                          | O(log n)                     | Hard       |
| `SparseTable.js`                    | Idempotent range queries                  | O(n log n) build, O(1) query | Medium     |
| `PersistentSegmentTree.js`          | Persistent updates                        | O(log n)                     | Hard       |
| `ImplicitSegmentTree.js`            | Dynamic coordinate tree                   | O(log C)                     | Hard       |
| `DSUWithRollback.js`                | Rollback union-find                       | O(log n)                     | Hard       |
| `AdvancedTrie.js`                   | Binary trie                               | O(L)                         | Medium     |
| `OrderedSet.js`                     | Order statistics                          | O(log n)                     | Hard       |
| `CoordinateCompression.js`          | Value compression                         | O(n log n)                   | Easy       |
| `FenwickSegmentTreeApplications.js` | Inversions, k-th order, and range updates | O(log n)                     | Hard       |
| `RangeQueryAdvanced.js`             | Merge-sort and sparse-table queries       | O(log n) / O(1)              | Hard       |
| `AdvancedDataStructuresMisc.js`     | Ordered statistics and dynamic trees      | O(log n)                     | Advanced   |

## 06_GraphAlgorithms

| File                              | Technique                             | Time                    | Difficulty |
| --------------------------------- | ------------------------------------- | ----------------------- | ---------- |
| `Dijkstra.js`                     | Non-negative shortest paths           | O((V + E) log V)        | Medium     |
| `BellmanFord.js`                  | Negative edges / cycles               | O(VE)                   | Medium     |
| `FloydWarshall.js`                | All-pairs shortest paths              | O(V^3)                  | Medium     |
| `KruskalMST.js`                   | MST via DSU                           | O(E log E)              | Medium     |
| `PrimMST.js`                      | MST via priority queue                | O((V + E) log V)        | Medium     |
| `StronglyConnectedComponents.js`  | SCC demonstration                     | O(V + E)                | Medium     |
| `TarjanAlgorithm.js`              | SCC via low-link                      | O(V + E)                | Hard       |
| `KosarajuAlgorithm.js`            | SCC via two DFS passes                | O(V + E)                | Medium     |
| `BridgesAndArticulationPoints.js` | Critical edges/vertices               | O(V + E)                | Hard       |
| `BinaryLifting.js`                | Jump pointers                         | O((V + E) log V)        | Hard       |
| `LowestCommonAncestor.js`         | LCA via binary lifting                | O(log V) per query      | Hard       |
| `HeavyLightDecomposition.js`      | Path decomposition                    | O(log^2 n) per query    | Hard       |
| `EulerTour.js`                    | Tree flattening                       | O(n)                    | Medium     |
| `0-1BFS.js`                       | 0/1 weight shortest paths             | O(V + E)                | Medium     |
| `MultiSourceBFS.js`               | Multi-source BFS                      | O(V + E)                | Medium     |
| `GraphFundamentals.js`            | Representation, traversal, bipartite  | O(V + E)                | Easy       |
| `GridGraphs.js`                   | Grid BFS/DFS and connectivity         | O(rows \* cols)         | Medium     |
| `ShortestPathDAG.js`              | DAG relaxation and SPFA               | O(V + E) / O(VE)        | Medium     |
| `DSUTypesMST.js`                  | DSU variants and MST algorithms       | O((V + E) log V)        | Hard       |
| `GraphConnectivitySpecial.js`     | Euler tours, biconnected, 2-SAT       | O(V + E) to exponential | Advanced   |
| `NetworkFlowMatching.js`          | Max flow, min cut, matching           | O(V^2 E) / O(E sqrt V)  | Advanced   |
| `TreeAdvanced.js`                 | Diameter, centers, LCA, virtual trees | O(n log n)              | Advanced   |

## 07_MathematicsAndStrings

| File                          | Technique                             | Time                | Difficulty |
| ----------------------------- | ------------------------------------- | ------------------- | ---------- |
| `Sieve.js`                    | Prime sieve                           | O(n log log n)      | Easy       |
| `PrimeFactorization.js`       | Trial division                        | O(sqrt n)           | Easy       |
| `GCD_LCM.js`                  | Euclidean algorithm                   | O(log min(a, b))    | Easy       |
| `ModularArithmetic.js`        | Modular inverse/arithmetic            | O(log MOD)          | Medium     |
| `FastExponentiation.js`       | Binary exponentiation                 | O(log e)            | Easy       |
| `Combinatorics.js`            | Factorials and nCr                    | O(n) precompute     | Medium     |
| `MatrixExponentiation.js`     | Matrix power                          | O(k^3 log n)        | Hard       |
| `ExtendedEuclidean.js`        | Bezout coefficients                   | O(log min(a, b))    | Medium     |
| `ChineseRemainderTheorem.js`  | CRT                                   | O(k log M)          | Hard       |
| `KMP.js`                      | Prefix function matching              | O(n + m)            | Medium     |
| `ZAlgorithm.js`               | Z-function matching                   | O(n + m)            | Medium     |
| `RabinKarp.js`                | Rolling hash matching                 | O(n + m) average    | Medium     |
| `RollingHash.js`              | Substring equality                    | O(n + q)            | Medium     |
| `Manacher.js`                 | Palindrome radii                      | O(n)                | Hard       |
| `SuffixArray.js`              | Doubling + Kasai LCP                  | O(n log^2 n)        | Hard       |
| `SuffixAutomaton.js`          | Distinct substrings                   | O(n) build          | Hard       |
| `AdvancedStrings.js`          | Aho-Corasick, palindromic tree, Booth | O(n + matches)      | Advanced   |
| `NumberTheory.js`             | Miller-Rabin, Pollard-Rho, CRT, BSGS  | O(n^(1/4)) average  | Advanced   |
| `AdvancedCombinatorics.js`    | Catalan, Stirling, Bell, Lucas        | O(nk)               | Hard       |
| `PolynomialsLinearAlgebra.js` | NTT, Gaussian elimination, basis      | O(n log n) / O(n^3) | Advanced   |

## 08_AdvancedCP

| File                       | Technique                                 | Time                   | Difficulty |
| -------------------------- | ----------------------------------------- | ---------------------- | ---------- |
| `MeetInTheMiddle.js`       | Split subset enumeration                  | O(2^(n/2) log 2^(n/2)) | Hard       |
| `SOSDP.js`                 | Subset zeta transform                     | O(k \* 2^k)            | Hard       |
| `RerootingDP.js`           | Tree rerooting                            | O(n)                   | Hard       |
| `CentroidDecomposition.js` | Centroid tree                             | O(n log n)             | Hard       |
| `MoAlgorithm.js`           | Offline range queries                     | O((n + q) sqrt n)      | Hard       |
| `MoWithUpdates.js`         | Mo with modifications                     | O(n^(5/3))             | Advanced   |
| `DivideAndConquerDP.js`    | Monotone split search                     | O(k n log n)           | Hard       |
| `ConvexHullTrick.js`       | Line container                            | O((n + q) log(n + q))  | Hard       |
| `LiChaoTree.js`            | Segment tree of lines                     | O((n + q) log q)       | Advanced   |
| `MonotonicOptimization.js` | Deque DP optimization                     | O(n)                   | Hard       |
| `OfflineQueries.js`        | Sweep + Fenwick                           | O((n + q) log n)       | Hard       |
| `GameTheory.js`            | Nim XOR invariant                         | O(n)                   | Medium     |
| `SpragueGrundy.js`         | Grundy numbers and MEX                    | O(maxPile \* moves)    | Hard       |
| `BitManipulation.js`       | XOR and bit tricks                        | O(n)                   | Easy       |
| `ComputationalGeometry.js` | Convex hull + shoelace                    | O(n log n)             | Hard       |
| `GeometryAdvanced.js`      | Intersections, closest pair, circles      | O(n log n)             | Advanced   |
| `GameRandomized.js`        | Grundy, minimax, treap, sampling          | O(states \* moves)     | Advanced   |
| `OfflineArrayAdvanced.js`  | Mo, sqrt decomposition, parallel search   | O((n + q) sqrt n)      | Advanced   |
| `AnalysisTheoryModels.js`  | Master theorem, amortized analysis        | O(1) classification    | Hard       |
| `PatternsCPTechniques.js`  | Compression, contribution, meet-in-middle | O(n log n)             | Hard       |

## Checklist

- [x] Every checklist section maps to at least one standalone `.js` file.
- [x] `TOPIC_INDEX.md` maps all 57 checklist sections to templates.
- [x] Every file parses input with `fs.readFileSync(0, "utf-8")`.
- [x] Every file contains a reusable implementation.
- [x] Every file solves one complete sample problem.
- [x] Output is buffered with `outcomes.push(...)`.
- [x] No `Input.txt` or `Output.txt` files are included.
- [x] All templates follow the same input, implementation, and output style.
- [x] All 147 files pass `node --check`.
- [x] Representative sample inputs verified for each folder.
