/**
 * 170. 两数之和 III - 数据结构设计
 * 设计并实现一个 TwoSum 类, 该类需要支持 add 和 find 操作.
 * add 对内部数据结构增加一个数
 * find 寻找内部数据结构中是否存在一对整数, 使得两数之和与给定的数相等
 */
export default class TwoSum {
  map = new Map<number, number>();

  public add(num: number): void {
    this.map.set(num, (this.map.get(num) || 0) + 1);
  }

  public find(value: number): boolean {
    for (const pair of this.map) {
      const [v, count] = pair;
      const tmp = value - v;
      if (tmp === v) {
        if (count > 1) {
          return true;
        }
      } else if (this.map.has(tmp)) {
        return true;
      }
    }
    return false;
  }
}

export class TwoSum2 {
  numArr: number[] = [];
  sumSet = new Set<number>();

  public add(num: number): void {
    this.numArr.forEach((v) => {
      this.sumSet.add(num + v);
    });
    this.numArr.push(num);
  }

  public find(value: number): boolean {
    return this.sumSet.has(value);
  }
}
