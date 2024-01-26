/**
 * React Q1
 */
/**
 * 1. 设计一个A组件，该组件显示一个数字，数字从0开始，每秒自增1
 * 2. 页面上添加三个A组件，并增加一个按钮。每点击一次该按钮，
 * 随机让一个A组件清零
 * 3. 将按钮行为改变为随机让一个A组件内的计数+10
 */

/**
 * TypeScript Q1
 */

export type Entity = { type: 'user' } | { type: 'post' } | { type: 'comment' }

type EntityWithId = {}

/**
 * 期望: EntityWithId 拥有正确的类型定义
 */

const user: EntityWithId = { type: 'user', userId: 'u1' }
const comment: EntityWithId = { type: 'comment', commentId: 'c1' }
const post: EntityWithId = { type: 'post', postId: 'p1' }

/**
 * Algorithm Q1
 */

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

/**
 * Algorithm Q2
 */
// 遍历一个普通对象，尽可能写多种不同的方法

const obj = { a: 1, b: 2, c: 3, d: 4 }

/**
 * Algorithm Q3
 */
// 遍历 tree 输出 value
class BinaryTree {
    private value
    private left
    private right

    constructor(
        value: any,
        left: BinaryTree | null = null,
        right: BinaryTree | null = null
    ) {
        this.value = value
        this.left = left
        this.right = right
    }
}

let tree = new BinaryTree(
    'a',
    new BinaryTree('b', new BinaryTree('c'), new BinaryTree('d')),
    new BinaryTree('e')
)


/**
 * 
 * Hi team,
 
Today is my last working day with our team and I just want to take a moment to thank everyone!
 
Thank you so much for supporting me throughout this project 😊
I have had immense help and support from each and everyone in the team throughout this project. I have learnt a great deal from each of you and will miss working with you.
 
Thank you @Tammy Cheng @Lingxiao Wang for all your guidance. I couldn’t have asked for better mentors.
Thank you @Rui Wang (CW) for always willing to help me with all silly questions I had.
 
@Bo Zhao (CW), @Emporio Li, @Hongyue Zhao, @jun hu, @Juanjuan Luo,  - Although our interactions have been shorter,  I really enjoyed working with you all.
 
Thank you once again, team!! All the very best to everyone!
Looking forward to work with you all sometime in future as well 😊
 
Thanks,
X
 */