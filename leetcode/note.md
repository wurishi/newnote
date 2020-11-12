[link](https://labuladong.gitbook.io/algo/)

[leetcode](https://leetcode-cn.com/problemset/all/)

# 0. 必读系列

## 滑动窗口

[模板](src/slidingwindow.ts)

# 1. 动态规划系列

# 2. 数据结构系列

## 2.5 数组题目

### twoSum 问题的核心思想

[1. 两数之和](src/1.ts)

1. 双重循环穷举

   时间复杂度 O(N^2), 空间复杂度 O(1).

2. 使用哈希表减少查询时间的复杂度

   因为哈希表的查询时间为 O(1), 所以算法的时间复杂度降到了 O(N), 但是需要 O(N) 的空间复杂度来存在哈希表.

[170. 两数之和 III - 数据结构设计](src/170.ts)

如果 find 的使用场景非常频繁, 还可以在 add 时将所有可能的和保存起来优化性能.