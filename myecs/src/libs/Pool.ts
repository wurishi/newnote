class T1 {
    public a: number = 100
}
let TMP = 0
class T2 {
    public b: string = 'bbb'
    public id = 0

    constructor() {
        this.id = TMP++
    }
}

type TTT = {
    [K in keyof T2]: {
        [K2 in K]: K2
    }
}[keyof T2]


// TODO: config应该由json配置自动生成
// 通过指定目录的遍历，拿到所有Component
// import xxxxcomponent from 'xxx'
const config = {
    T1,
    T2
}

type ComponentMap = typeof config

type PoolType = keyof ComponentMap

export class PoolManager {

    private _poolMap = new Map<string, Pool<unknown>>()

    public getPool<T extends PoolType, K = ComponentMap[T]>(type: T): Pool<K> {
        if (!this._poolMap.has(type)) {
            this._poolMap.set(type, new Pool<K>(() => (new config[type]() as K)))
        }
        return this._poolMap.get(type) as Pool<K>
    }
}

export class Pool<T> {
    private _createFunc: () => T
    private _instances: T[] = []
    private _cache: T[] = []

    constructor(createFunc: () => T) {
        this._createFunc = createFunc
    }

    public create(): T {
        let elem: T
        if (this._cache.length > 0) {
            elem = this._cache.pop()!
        } else {
            elem = this._createFunc()
        }
        this._instances.push(elem)
        return elem
    }

    public destroy(elem: T): void {
        const index = this._instances.findIndex(it => it === elem)
        if (index >= 0) {
            this._instances.splice(index, 1)
            this._cache.push(elem)
        }
    }
}
