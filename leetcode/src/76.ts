/**
 * 76. 最小覆盖子串
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 * 注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。
 * @param s 
 * @param t 
 */
export function minWindow(s: string, t: string): string {
  function check(win: Map<string, number>, need: Map<string, number>): boolean {
    for (const pair of need) {
      const [k, v] = pair;
      if (!win.has(k)) {
        return false;
      }
      if ((win.get(k) as number) < v) {
        return false;
      }
    }
    return true;
  }

  let anL = -1,
    anR = -1,
    anC = Number.MAX_SAFE_INTEGER;
  const len = s.length;
  const win = new Map<string, number>();
  const need = new Map<string, number>();
  for (let i = t.length - 1; i >= 0; i--) {
    need.set(t[i], (need.get(t[i]) || 0) + 1);
  }
  let left = 0,
    right = 0;

  // 不包含 t 右移, 包含 t 则左移
  while (right < len) {
    const c = s[right];
    right++;
    win.set(c, (win.get(c) || 0) + 1);

    while (check(win, need)) {
      if (right - left + 1 < anC) {
        anC = right - left + 1;
        anL = left;
        anR = right;
      }
      const d = s[left];
      left++;
      win.set(d, (win.get(d) as number) - 1);
    }
  }

  if (anR > anL && anL >= 0) {
    return s.substring(anL, anR);
  }
  return '';
}
