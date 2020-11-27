/**
 * 752. 打开转盘锁
 * @param deadends 
 * @param target 
 */
export function openLock(deadends: string[], target: string): number {
  class Queue {
    items: WeakMap<any, any[]>;
    constructor() {
      this.items = new WeakMap<any, any[]>();
      this.items.set(this, []);
    }

    public offer(...element: any[]): void {
      const q = this.items.get(this) as any[];
      q.push(...element);
    }

    public poll(): any {
      const q = this.items.get(this) as any[];
      return q.shift();
    }

    public isEmpty(): boolean {
      return this.size() === 0;
    }

    public size(): number {
      const q = this.items.get(this) as any[];
      return q.length;
    }

    public clear(): void {
      this.items.set(this, []);
    }
  }

  function plusOne(s: string, j: number): string {
    const len = s.length;
    let str = '';
    for (let i = 0; i < len; i++) {
      if (i === j) {
        if (s[i] === '9') {
          str += '0';
        } else {
          str += +s[i] + 1;
        }
      } else {
        str += s[i];
      }
    }
    return str;
  }

  function minusOne(s: string, j: number): string {
    const len = s.length;
    let str = '';
    for (let i = 0; i < len; i++) {
      if (i === j) {
        if (s[i] === '0') {
          str += '9';
        } else {
          str += +s[i] - 1;
        }
      } else {
        str += s[i];
      }
    }
    return str;
  }

  const deads = new Set(deadends);
  const visited = new Set<string>();
  const q = new Queue();
  let step = 0;
  q.offer('0000');
  visited.add('0000');

  while (!q.isEmpty()) {
    const sz = q.size();
    for (let i = 0; i < sz; i++) {
      const cur = q.poll();
      if (deads.has(cur)) continue;
      if (cur == target) return step;
      for (let j = 0; j < 4; j++) {
        const up = plusOne(cur, j);
        if (!visited.has(up)) {
          q.offer(up);
          visited.add(up);
        }
        const down = minusOne(cur, j);
        if (!visited.has(down)) {
          q.offer(down);
          visited.add(down);
        }
      }
    }
    step++;
  }
  return -1;
}
