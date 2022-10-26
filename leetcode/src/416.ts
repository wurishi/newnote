/**
 * 416. 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 * 提示
 * 1 <= nums.length <= 200
 * 1 <= nums[i] <= 100
 *
 * @param nums
 */

export function canPartition(nums: number[]): boolean {
    let sum = 0
    const len = nums.length
    for (let i = 0; i < len; i++) {
        sum += nums[i]
    }
    if (sum % 2 !== 0) {
        return false
    }

    const target = sum / 2

    const dp = new Array(target + 1).fill(0)
    dp[0] = 1

    for (let i = 0; i < len; i++) {
        const num = nums[i]
        for (let j = target; j >= num; j--) {
            dp[j] += dp[j - num]
        }
        if (dp[target] !== 0) {
            return true
        }
    }
    return false
}
