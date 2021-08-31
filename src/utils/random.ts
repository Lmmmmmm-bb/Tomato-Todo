import { Theme, themeColor, images, fontColor } from '../constant';

/*
 TODO: 将不合适的颜色删除
 Author: _lmmmmmm
 Date: 2021/08/26 20:06:40
 */
export const randomColor = (): Theme => {
  const index = Math.floor(Math.random() * themeColor.length);
  return themeColor[index] as Theme;
};

export const randomImage = (): [string, string] => {
  const index = Math.floor(Math.random() * images.length);
  return [images[index], fontColor[index]];
};
