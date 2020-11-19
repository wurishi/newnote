/**
 * 4. 寻找两个正序数组的中位数
 * 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数。
 * 进阶：你能设计一个时间复杂度为 O(log (m+n)) 的算法解决此问题吗？
 * @param nums1
 * @param nums2
 */
export function findMedianSortedArrays(
  nums1: number[],
  nums2: number[]
): number {
  const m = nums1.length;
  const n = nums2.length;
  if (m == 0 && n == 0) {
    return 0;
  } else if (m == 0) {
    if (n == 1) {
      return nums2[0];
    }
    const middle = Math.floor(n / 2);
    if (n % 2 == 0) {
      return (nums2[middle - 1] + nums2[middle]) / 2;
    } else {
      return nums2[middle];
    }
  } else if (m > n) {
    return findMedianSortedArrays(nums2, nums1);
  }

  let i = Math.floor(m / 2);

  while (i >= 0) {
    const j = Math.floor((m + n + 1) / 2) - i;
    if (i != 0 && i != n && nums1[i - 1] > nums2[j]) {
      i--;
    } else if (j != 0 && i != m && nums2[j - 1] > nums1[i]) {
      i++;
    } else {
      let maxLeft = 0;
      if (j == 0) {
        maxLeft = nums1[i - 1];
      } else if (i == 0) {
        maxLeft = nums2[j - 1];
      } else {
        maxLeft = Math.max(nums1[i - 1], nums2[j - 1]);
      }
      if ((m + n) % 2 == 1) {
        return maxLeft;
      }

      let minRight = 0;
      if (j == n) {
        minRight = nums1[i];
      } else if (i == m) {
        minRight = nums2[j];
      } else {
        minRight = Math.min(nums1[i], nums2[j]);
      }
      return (maxLeft + minRight) / 2;
    }
  }
  return 0;
}

export function findMedianSortedArrays2(
  nums1: number[],
  nums2: number[]
): number {
  // 对两个数组作二分搜索
  const m = nums1.length;
  const n = nums2.length;
  if (m > n) {
    return findMedianSortedArrays2(nums2, nums1);
  }
  let iMin = 0,
    iMax = m;
  while (iMin <= iMax) {
    const i = Math.floor((iMin + iMax) / 2);
    const j = Math.floor((m + n + 1) / 2) - i;
    if (j != 0 && i != m && nums2[j - 1] > nums1[i]) {
      // i 需要增大
      iMin = i + 1;
    } else if (i != 0 && j != n && nums1[i - 1] > nums2[j]) {
      // i 需要减小
      iMax = i - 1;
    } else {
      // 达到要求
      let maxLeft = 0;
      if (i == 0) maxLeft = nums2[j - 1];
      else if (j == 0) maxLeft = nums1[i - 1];
      else maxLeft = Math.max(nums1[i - 1], nums2[j - 1]);
      if ((m + n) % 2 == 1) return maxLeft;

      let minRight = 0;
      if (i == m) minRight = nums2[j];
      else if (j == n) minRight = nums1[i];
      else minRight = Math.min(nums2[j], nums1[i]);
      return (maxLeft + minRight) * 0.5;
    }
  }
  return 0;
}
