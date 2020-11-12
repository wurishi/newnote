/**
 * 438. 找到字符串中所有字母异位词
 * 给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。
 * 字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。
 * 说明：
 * 1. 字母异位词指字母相同，但排列不同的字符串。
 * 2. 不考虑答案输出的顺序。

 * @param s 
 * @param p 
 */

export function findAnagrams(s: string, p: string): number[] {
  const res: number[] = [];
  let left = 0,
    right = 0,
    match = 0,
    needLen = 0;
  const need = new Map<string, number>();
  for (const pair of p) {
    if (!need.has(pair)) {
      needLen++;
    }
    need.set(pair, (need.get(pair) || 0) + 1);
  }
  const win = new Map<string, number>();
  const len = s.length;
  while (right < len) {
    const c = s[right];
    right++;
    if (need.has(c)) {
      win.set(c, (win.get(c) || 0) + 1);
      if (need.get(c) === win.get(c)) {
        match++;
      }
    }
    while (needLen === match) {
      if (right - left === p.length) {
        res.push(left);
      }
      const d = s[left];
      left++;
      if (need.has(d)) {
        win.set(d, (win.get(d) as number) - 1);
        if ((need.get(d) as number) > (win.get(d) as number)) {
          match--;
        }
      }
    }
  }
  return res;
}
