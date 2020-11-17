/**
 * 710. 黑名单中的随机数
 * 给定一个包含 [0，n ) 中独特的整数的黑名单 B，写一个函数从 [ 0，n ) 中返回一个不在 B 中的随机整数。
 * 对它进行优化使其尽量少调用系统方法 Math.random() 。
 */
export class Solution {
  sz: number;
  mapping: Map<number, number>;

  constructor(N: number, blacklist: number[]) {
    this.sz = N - blacklist.length;
    this.mapping = new Map<number, number>();
    // 先将所有黑名单数字加入 map
    blacklist.forEach((v) => this.mapping.set(v, 666));

    let last = N - 1;
    blacklist.forEach((b) => {
      if (b < this.sz) {
        // 如果黑名单的数字不在区间内, 则忽略
        while (this.mapping.has(last)) {
          // 一直找, 直到找到非黑名单中的最大值
          last--;
        }
        // 将黑名单中的索引映射到合法的数字
        this.mapping.set(b, last);
        last--;
      }
    });
  }

  pick(): number {
    const index = Math.floor(Math.random() * this.sz);
    if (this.mapping.has(index)) {
      // 如果命中黑名单, 就返回一个其他值.
      return this.mapping.get(index) as number;
    }
    // 若没有命中黑名单, 则直接返回
    return index;
  }
}
