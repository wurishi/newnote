export function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] == target) {
      return mid; // 直接返回
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  return -1;
}

export function left_bound(nums: number[], target: number): number {
  if (nums.length == 0) return -1;
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] == target) {
      right = mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid;
    }
  }
  return nums[left] == target ? left : -1;
}

export function left_bound2(nums: number[], target: number): number {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] == target) {
      right = mid - 1; // 如果要找到最左边界的, 不能直接返回, 要收缩右侧边界
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  // 检查 left 越界情况
  if (left >= nums.length || nums[left] !== target) {
    return -1;
  }
  return left;
}

export function right_bound(nums: number[], target: number): number {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] == target) {
      left = mid + 1; // 如果要找到最右侧的, 不能直接返回, 要收缩左侧边界
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  // 检查 right 越界情况
  if (right < 0 || nums[right] !== target) {
    return -1;
  }
  return right;
}
