
/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
 * 你的算法时间复杂度必须是 O(log n) 级别。
 * 如果数组中不存在目标值，返回 [-1, -1]。
 * @param nums 
 * @param target 
 */
export function searchRange(nums: number[], target: number): number[] {
  const getBound = (nums: number[], target: number, isLeft = true): number => {
    let left = 0,
      right = nums.length - 1;
    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);
      if (nums[mid] == target) {
        if (isLeft) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] > target) {
        right = mid - 1;
      }
    }
    if (isLeft) {
      if (left >= nums.length || nums[left] != target) {
        return -1;
      }
      return left;
    } else {
      if (right < 0 || nums[right] !== target) {
        return -1;
      }
      return right;
    }
  };
  const left = getBound(nums, target, true);
  if (left != -1) {
    return [left, getBound(nums, target, false)];
  }
  return [-1, -1];
}
