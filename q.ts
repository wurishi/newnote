// Q1
/**
 * 1. 设计一个A组件，该组件显示一个数字，数字从0开始，每秒自增1
 * 2. 页面上添加三个A组件，并增加一个按钮。每点击一次该按钮，
 * 随机让一个A组件清零
 * 3. 将按钮行为改变为随机让一个A组件内的计数+10
 */

// Q2

export type Entity = { type: 'user' } | { type: 'post' } | { type: 'comment' }

type EntityWithId = {}

/**
 * 期望: EntityWithId 拥有正确的类型定义
 */

const user: EntityWithId = { type: 'user', userId: 'u1' }
const comment: EntityWithId = { type: 'comment', commentId: 'c1' }
const post: EntityWithId = { type: 'post', postId: 'p1' }

// Q3

/**
 * Business logic:
 * Given a non-empty array,
 * return true if there is a place to split the array
 * so that the sum of the numbers on one side is equal to
 * the sum of the other side.
 *
 */

// [1, 7, 8, 70, 50, 4] true
// [1, 7, 9, 70, 50, 4] false
// [2, 2, 2, 2, 2, 10] true
// [14, 9, 8, 4, 3, 2] true
// [100, 20, 20, 20, 20, 20] true
