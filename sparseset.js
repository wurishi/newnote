function f1() {
    const packed = []
    let length = 0
    let freeList = {
        v: null,
        idx: -1,
    }

    function insert(v) {
        if (v) {
            if (freeList.v) {

            } else {
                packed.push(v)
            }
            length++
        }
    }

    function remove(idx) {
        if (idx < length) {
            const tmp = packed[idx]
            console.log(idx, 'remove:', tmp, packed)
            packed[idx] = packed[length - 1]
            packed[length - 1] = freeList

            if (freeList.idx >= 0) {
                packed[freeList.idx] = freeList.v
            }
            freeList.idx = length - 1
            freeList.v = tmp
            length--
        }
    }

    insert(3)
    insert('.')
    insert(1)
    insert(4)
    insert(1)
    insert(5)
    insert(9)
    insert(2)
    insert(6)

    remove(3)
    remove(4)

    console.log(packed)
}

function f2() {
    const LENGTH = 25000000
    const arr = new Array(LENGTH)
    const iarr = new Int32Array(LENGTH)

    let time = 0
    const outputs = []
    var i = 0

    // set arr
    time = Date.now()
    for (i = 0; i < LENGTH; i++) {
        arr[i] = i
    }
    outputs.push(`set arr: ${Date.now() - time}`)

    // set iarr
    time = Date.now()
    for (i = 0; i < LENGTH; i++) {
        iarr[i] = i
    }
    outputs.push(`set iarr: ${Date.now() - time}`)

    var count = 0
    // each arr
    count = 0
    time = Date.now()
    for (i = 0; i < LENGTH; i++) {
        count += arr[i]
    }
    outputs.push(`(${count})each arr: ${Date.now() - time}`)

    // each iarr
    count = 0
    time = Date.now()
    for (i = 0; i < LENGTH; i++) {
        count += iarr[i]
    }
    outputs.push(`(${count})each iarr: ${Date.now() - time}`)

    const IDX = Math.floor(LENGTH / 3)
    // index arr
    count = 0
    time = Date.now()
    for (i = 0; i < LENGTH; i++) {
        count += arr[IDX]
    }
    outputs.push(`(${count})index arr: ${Date.now() - time}`)

    // index iarr
    count = 0
    time = Date.now()
    for (i = 0; i < LENGTH; i++) {
        count += iarr[IDX]
    }
    outputs.push(`(${count})index iarr: ${Date.now() - time}`)

    console.log(outputs.join('\n'))
}

// f1()

// f2 结论
// 写入操作 Array 比 Int32Array 快一倍左右
// 读取操作 Int32Array 比 Array 快3倍以上
// 下标读取 两者没有明显区别
// 鉴于读取操作与下标读取的性能，再加上 Int32Array 初始化是已经给了alloc的长度，所以基本也可以排除内存请求的消耗，
// 所以写入操作上 Int32Array 慢大概率是由于类似转换造成的
// 注：往 Int32Array 设置其他类型也不会产生错误，只是最终写入的是转换后的int32 (浮点会取整, 其他类型就是0)
f2()