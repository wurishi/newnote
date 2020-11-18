/**
 * 316. 去除重复字母
 * 给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）
 * 1081. 不同字符的最小子序列
 * 返回字符串 text 中按字典序排列最小的子序列，该子序列包含 text 中所有不同字符一次。
 * @param s
 */
export function removeDuplicateLetters(s: string): string {
  const stack = new Array<string>();
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const char = s[i];
    if (stack.indexOf(char) > -1) continue;
    while (
      stack.length > 0 &&
      stack[stack.length - 1] > char &&
      s.indexOf(stack[stack.length - 1], i) > i
    ) {
      stack.pop();
    }
    stack.push(char);
  }

  return stack.join('');
}
