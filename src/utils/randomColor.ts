import { Theme, themeColor } from '../constant';

/*
 TODO: 将不合适的颜色删除
 Author: _lmmmmmm
 Date: 2021/08/26 20:06:40
 */
const randomColor = (): Theme => {
  const index = Math.floor(Math.random() * themeColor.length);
  return themeColor[index] as Theme;
};

export default randomColor;
