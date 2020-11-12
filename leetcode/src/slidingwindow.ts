// export function slidingWindow(
//   s: string,
//   t: string,
//   hook: { needShrink: () => boolean }
// ): void {
//   const need = new Map<string, number>(),
//     win = new Map<string, number>();

//   const len = s.length;
//   for (let i = 0; i < len; i++) {
//     need.set(s[i], i);
//   }

//   let left = 0,
//     right = 0;
//   let valid = 0;

//   while (right < len) {
//     const c = s[right];
//     right++;

//     // TODO:

//     while (hook.needShrink()) {
//       const d = s[left];
//       left++;
//       // TODO:
//     }
//   }
// }

export function slidingWindow(s: string): void {
  const win = new Set<string>();
  const len = s.length;
  let left = 0,
    right = 0;
  while (right < len) {
    const c = s[right];
    right++;

    // TODO: 更新窗口(扩大窗口)

    while(true) { // TODO: 窗口是否需要收缩
      const d = s[left];
      left++;

      // TODO: 更新窗口(收缩窗口)
    }
  }
}
