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

###### [Q 875.爱吃香蕉的珂珂](src/875.ts)

###### [Q 1011.在 D 天内送达包裹的能力](src/1011.ts)

### 双指针

#### 一: 快慢指针的常见算法

快慢指针一般都初始化指向链表的头结点 `head`, 前进时快指针 `fast`在前, 慢指针 `slow`在后.

##### 1. 判定链表中是否含有环

由于单链表的特点在于每个节点只能知道下一个节点, 所以一个指针是无法判断链表中是否含有环的.

如果链表中不含环, 那么指针最终会遇到空指针 `null`表示链表到头了. 类似这样:

```js
function hasCycle(head) {
    while(head != null) {
        head = head.next;
    }
    return false;
}
```

但如果链表中有环, 那么以上代码就会陷入死循环, 因为环形链表中并没有指向尾部节点的 `null`.

经典的解法就是使用两个指针, 一个跑得快, 一个跑得慢. 如果不含环, 那么跑得快的指针最终会遇到 `null`, 如果含有环, 快指针最终会超慢指针一圈, 和慢指针相遇. 说明链表含有环.

###### [Q 141.环形链表](src/141.ts)

##### 2. 返回环链表中环的起始位置

如果是环链表, 快慢指针第一次相遇时, 慢指针走了 `k`步, 那么快指针一定走了 `2k`步. 那么这多走的 `k`步其实就是快指针在环里面转圈, 所以 `k`值也就是环长度的**整数倍**.

![142](assets/142.png)

所以只需要在相遇后, 将两个指针中的一个重新指向 head, 然后两个指针同速前进, `k - m`步后就会相遇, 且相遇之处就是环的起点.

###### [Q 142.环形链表 II](src/142.ts)

##### 3. 寻找链表的中点

快指针一次前进两步, 慢指针一次前进一步, 所以当快指针到达链表尽头时, 慢指针正好处于链表的中间位置.

###### [Q 876.链表的中间结点](src/876.ts)

##### 4. 寻找链表的倒数第 n 个元素

###### [Q 19.删除链表的倒数第N个节点](src/19.ts)

#### 二: 左右指针的常用算法

左右指针在数组中实际是指两个索引值, 一般初始化为 `left = 0, right = nums.length - 1`.

##### 1. 二分查找

##### 2. 两数之和

###### [Q 167.两数之和 II - 输入有序数组](src/167.ts)

##### 3. 反转数组

###### [Q 344.反转字符串](src/344.ts)

##### 4. 滑动窗口算法

### 滑动窗口

###### [Q 3.无重复字符的最长子串](src/3.ts)

###### [Q 76.最小覆盖子串](src/76.ts)

###### [Q 438.找到字符串中所有字母异位词](src/438.ts)

###### [Q 567.字符串的排列](src/567.ts)

### O(1) 时间操作数组中的元素

#### 实现随机集合

###### [Q 380.常数时间插入、删除和获取随机元素](src/380.ts)

#### 避开黑名单的随机数

###### [Q 710.黑名单中的随机数](src/710.ts)

### 数组去重

###### [Q 316.去除重复字母](src/316.ts)

###### [Q 1081.不同字符的最小子序列](src/316.ts)

### 原地修改数组

#### 有序数组/链表去重

###### [Q 26.删除排序数组中的重复项](src/26.ts)

###### [Q 83.删除排序链表中的重复元素](src/83.ts)

### twoSum 问题的核心思想

###### [Q 1. 两数之和](src/1.ts)

1. 双重循环穷举

   时间复杂度 O(N^2), 空间复杂度 O(1).

2. 使用哈希表减少查询时间的复杂度

   因为哈希表的查询时间为 O(1), 所以算法的时间复杂度降到了 O(N), 但是需要 O(N) 的空间复杂度来存在哈希表.

###### [Q 170. 两数之和 III - 数据结构设计](src/170.ts)

如果 find 的使用场景非常频繁, 还可以在 add 时将所有可能的和保存起来优化性能.

###### 