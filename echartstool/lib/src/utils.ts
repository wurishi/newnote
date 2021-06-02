export function rgbToNumber(rgb: number[]) {
  let num = 0;
  num = (rgb[0] << 16) & 0xff0000;
  num += (rgb[1] << 8) & 0x00ff00;
  num += rgb[2] & 0x0000ff;

  return num;
}
