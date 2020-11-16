[link](https://labuladong.gitbook.io/algo/)

[link2](https://github.com/Alex660/leetcode)

[leetcode](https://leetcode-cn.com/problemset/all/)

# 0. 必读系列

## 滑动窗口

[模板](src/slidingwindow.ts)

# 1. 动态规划系列

# 2. 数据结构系列

## 2.5 数组题目

### 二分查找详解

#### 零: 二分查找框架

```js
const _$ = 'detail'; // 具体细节处
function binarySearch(nums, target) {
    let left = 0, right = _$;
    while(_$) {
        const mid = left + (right - left) / 2;
        if(nums[mid] == target) {
            _$;
        }
        else if(nums[mid] < target) {
            left = _$;
        }
        else if(nums[mid] > target) {
            right = _$;
        }
    }
    return _$;
}
```

分析二分查找的一个技巧是: 不要出现 else, 而是把所有 else if 写清楚. 这样可以清楚展现所有细节.

为了防止计算 mid 时溢出, 代码 `left + (right - left) / 2`和 `(left + right) / 2`的结果相同, 但是前者可以有效防止由于 `left + right`的结果太大导致的溢出.

#### 一: 寻找一个数 (基本的二分搜索)

```js
export function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  return -1;
}
```

1. 为什么 while 循环的条件中是 <= 而不是 < ?

   因为初始化时 `right = nums.length - 1`, 即是最后一个索引. 这样查找的区间是 `[left, right]`, 而非设置为 `right = num.length`的左闭右开区间 `[left, right)`

   另外循环的条件有可能是 `left == right`的情况, 比如 `[2,2]`, 此时如果是使用 `while(left < right)`这种时候 `[left, right]`, 明明区间是非空的, 还有一个 2, 但循环却已经终止了, 导致 2 没有被搜索. 所以循环的条件必须是 `while(left <= right)`.

   如果非要用 `while(left < right)`则需要打个补丁.

   ```js
   while(left < right) {
       // ...
   }
   return nums[left] == target ? left : -1;
   ```

2. 为什么是 `left = mid + 1`, `right = mid - 1`.

   因为搜索区间是 `[left, right]`, 那么当发现 `mid`不是 `target`时, 下一步搜索的区间就应该是 `[left, mid-1]`或 `[mid+1, right]`, 因为 `mid`已经被搜索过了, 所以应该从搜索区间中去除.

3. 此算法有什么缺陷?

   如果有序数组存在重复数字, 即 `nums = [1, 2, 2, 2, 3]`, `target`为 2, 此时, 算法返回的索引是正确的结果 2, 但是我们无法得知 `target`左侧或右侧的边界.

   当然也可以在找到 `target`后, 向左或向右线性搜索, 但是这样就难以保证二分查找的 O(log(n)) 的时间复杂度了.

#### 二: 寻找左侧边界的二分搜索

#### 三: 寻找右侧边界的二分搜索

###### [Q 34.在排序数组中查找元素的第一个和最后一个位置](src/34.ts)

###### [Q 704.二分查找](src/704.ts)

### 滑动窗口

###### [Q 3.无重复字符的最长子串](src/3.ts)

###### [Q 76.最小覆盖子串](src/76.ts)

###### [Q 438.找到字符串中所有字母异位词](src/438.ts)

###### [Q 567.字符串的排列](src/567.ts)

### twoSum 问题的核心思想

###### [Q 1. 两数之和](src/1.ts)

1. 双重循环穷举

   时间复杂度 O(N^2), 空间复杂度 O(1).

2. 使用哈希表减少查询时间的复杂度

   因为哈希表的查询时间为 O(1), 所以算法的时间复杂度降到了 O(N), 但是需要 O(N) 的空间复杂度来存在哈希表.

###### [Q 170. 两数之和 III - 数据结构设计](src/170.ts)

如果 find 的使用场景非常频繁, 还可以在 add 时将所有可能的和保存起来优化性能.

###### 