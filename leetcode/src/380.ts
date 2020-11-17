/**
 * 380. 常数时间插入、删除和获取随机元素
 * 设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构。
 *
 * insert(val)：当元素 val 不存在时，向集合中插入该项。
 * remove(val)：元素 val 存在时，从集合中移除该项。
 * getRandom：随机返回现有集合中的一项。每个元素应该有相同的概率被返回。
 */
export class RandomizedSet {
  nums: number[];
  valToIndex: Map<number, number>;

  constructor() {
    this.nums = [];
    this.valToIndex = new Map<number, number>();
  }

  insert(val: number): boolean {
    if (this.valToIndex.has(val)) {
      return false;
    }
    this.valToIndex.set(val, this.nums.length);
    this.nums.push(val);
    return true;
  }

  remove(val: number): boolean {
    if (!this.valToIndex.has(val)) {
      return false;
    }
    const index = this.valToIndex.get(val) as number;
    const last = this.nums[this.nums.length - 1];
    this.valToIndex.set(last, index);
    this.nums[index] = last;
    this.nums.pop();
    this.valToIndex.delete(val);
    return true;
  }

  getRandom(): number {
    return this.nums[Math.floor(Math.random() * this.nums.length)];
  }
}
