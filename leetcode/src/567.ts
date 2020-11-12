/**
 * 567. 字符串的排列
 * 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。
 * 换句话说，第一个字符串的排列之一是第二个字符串的子串。
 * @param s1 
 * @param s2 
 */

export function checkInclusion(s1: string, s2: string): boolean {
  let left = 0,
    right = 0;
  const need = new Map<string, number>();
  const win = new Map<string, number>();

  let needLen = 0;
  let match = 0;
  for (const pair of s1) {
    if (!need.has(pair)) {
      needLen++;
    }
    need.set(pair, (need.get(pair) || 0) + 1);
  }
  const len = s2.length;
  while (right < len) {
    const c = s2[right];
    right++;
    if (need.has(c)) {
      win.set(c, (win.get(c) || 0) + 1);
      if (win.get(c) === need.get(c)) {
        match++;
      }
    }
    while (match === needLen) {
      if (right - left === s1.length) {
        return true;
      }
      const d = s2[left];
      left++;
      if (need.has(d)) {
        win.set(d, (win.get(d) as number) - 1);
        if ((win.get(d) as number) < (need.get(d) as number)) {
          match--;
        }
      }
    }
  }
  return false;
}
