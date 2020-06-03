# BFS 和 DFS

广度优先搜索算法（Breadth-First-Search BFS）

深度优先搜索算法（Depth-First-Search DFS）

## 二者区别

- BFS 的重点在于队列，DFS 的重点在于递归。
- BFS 用于查找单一最短路线，DFS 可用于找查所有解。
- BFS 的代价主要在于空间复杂度高，DFS 主要问题是递归的一些限制。

## 双向 BFS 优化

传统的 BFS 就是从起点开始向四周扩散，遇到终点时停止。而双向 BFS 则是从起点和终点同时开始扩散，当两边有交集的时候停止。

可以通知判断起点的队列和终点队列的 size ，挑 size 较小的先进行扩散，以优化空间增长的问题。

## 双向 BFS 的局限

必须知道终点在哪里，如果不知道终点在哪里，则无法使用双向 BFS 优化。