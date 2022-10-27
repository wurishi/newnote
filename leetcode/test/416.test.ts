import { canPartition } from '../src/416'
import { test, expect } from '@jest/globals'

test('416. ', () => {
    expect(canPartition([1, 7, 8, 70, 50, 4])).toBeTruthy()
    expect(canPartition([1, 7, 9, 70, 50, 4])).toBeFalsy()
    expect(canPartition([2, 2, 2, 2, 2, 10])).toBeTruthy()
    expect(canPartition([14, 9, 8, 4, 3, 2])).toBeTruthy()
    expect(canPartition([100, 20, 20, 20, 20, 20])).toBeTruthy()
})
