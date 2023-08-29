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
    const obj = {}
    const set = new Set()

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

    // // set obj
    // time = Date.now()
    // for (i = 0; i < LENGTH; i++) {
    //     obj[i] = i
    // }
    // outputs.push(`set obj: ${Date.now() - time}`)

    // // set Set
    // time = Date.now()
    // for (i = 0; i < LENGTH; i++) {
    //     set.add(i)
    // }
    // outputs.push(`set set: ${Date.now() - time}`)

    var count = 0
    // each(i) arr
    count = 0
    time = Date.now()
    for (i = 0; i < LENGTH; i++) {
        count += arr[i]
    }
    outputs.push(`(${count})each(i) arr: ${Date.now() - time}`)

    // each(forEach) arr
    count = 0
    time = Date.now()
    arr.forEach(val => {
        count += val
    })
    outputs.push(`(${count})each(forEach) arr: ${Date.now() - time}`)

    // each(i) iarr
    count = 0
    time = Date.now()
    for (i = 0; i < LENGTH; i++) {
        count += iarr[i]
    }
    outputs.push(`(${count})each(i) iarr: ${Date.now() - time}`)

    // each(forEach) arr
    count = 0
    time = Date.now()
    iarr.forEach(val => {
        count += val
    })
    outputs.push(`(${count})each(forEach) iarr: ${Date.now() - time}`)

    var key
    // // each obj
    // count = 0
    // time = Date.now()
    // for(key in obj) {
    //     count += obj[key]
    // }
    // outputs.push(`(${count})each obj: ${Date.now() - time}`)

    // // each set
    // count = 0
    // time = Date.now()
    // for(key of set) {
    //     count += key
    // }
    // outputs.push(`(${count})each set: ${Date.now() - time}`)

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

    // // index obj
    // count = 0
    // time = Date.now()
    // for (i = 0; i < LENGTH; i++) {
    //     count += obj[IDX]
    // }
    // outputs.push(`(${count})index obj: ${Date.now() - time}`)

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
// f2()

function f3() {
    const outputs = []
    const LENGTH = 25000000
    const RUN = 1

    const arrFlag = true
    const iarrFlag = true
    const objFlag = true
    const setFlag = false
    const mapFlag = false

    let time = 0
    const start = () => {
        time = Date.now()
    }
    const stop = (msg) => {
        outputs.push(`${msg} 【${Date.now() - time}】`)
    }
    const consoleOutput = () => {
        console.log(outputs.join('\n'))
    }
    const addTitle = (title) => {
        outputs.push(`----------${title}----------`)
    }

    var i = 0;
    var count = 0;
    var key;
    function arrFn(enable, len) {
        if (enable) {
            const arr = new Array(len)
            start()
            for (i = 0; i < len; i++) {
                arr[i] = i
            }
            stop('set  arr')

            count = 0
            start()
            for (i = 0; i < len; i++) {
                count += arr[i]
            }
            stop(`fori arr (${count})`)

            count = 0
            start()
            arr.forEach(i => {
                count += i
            })
            stop(`fore arr (${count})`)
        }
    }

    addTitle(`LENGTH ${LENGTH}`)
    for (let i = 1; i <= RUN; i++) {
        addTitle(`run ${i}`)
        arrFn(arrFlag, LENGTH)
    }

    function iarrFn(enable, len) {
        if (enable) {
            const arr = new Int32Array(len)
            start()
            for (i = 0; i < len; i++) {
                arr[i] = i
            }
            stop('set  int32arr')

            count = 0
            start()
            for (i = 0; i < len; i++) {
                count += arr[i]
            }
            stop(`fori int32arr (${count})`)

            count = 0
            start()
            arr.forEach(i => {
                count += i
            })
            stop(`fore int32arr (${count})`)
        }
    }

    addTitle(`LENGTH ${LENGTH}`)
    for (let i = 1; i <= RUN; i++) {
        addTitle(`run ${i}`)
        iarrFn(iarrFlag, LENGTH)
    }

    function objFn(enable, len) {
        if (enable) {
            const obj = {}
            start()
            for (i = 0; i < len; i++) {
                obj[i] = i
            }
            stop('set   obj')

            count = 0
            start()
            for (key in obj) {
                count += obj[key]
            }
            stop(`forin obj (${count})`)
        }
    }
    addTitle(`LENGTH ${LENGTH / 10}`)
    for (let i = 1; i <= RUN; i++) {
        addTitle(`run ${i}`)
        objFn(objFlag, LENGTH / 10)
    }

    consoleOutput();
}

f3()