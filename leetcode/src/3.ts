/**
 * 3. 无重复字符的最长子串
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * @param s
 */

export function lengthOfLongestSubstring(s: string): number {
  let res = 0;
  // const need = new Map<string, number>();
  const win = new Set<string>();
  const len = s.length;
  // for (let i = 0; i < len; i++) {
  //   need.set(s[i], i);
  // }
  let left = 0,
    right = 0;

  while (right < len) {
    const c = s[right];
    right++;

    if (!win.has(c)) {
      win.add(c);
      res = Math.max(res, win.size);
    } else {
      while (win.has(c)) {
        const d = s[left];
        left++;
        win.delete(d);
      }
      win.add(c);
    }
  }

  return res;
}
