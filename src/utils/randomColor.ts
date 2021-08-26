const colors = [
  'bg-red-50',
  'bg-red-100',
  'bg-red-200',
  'bg-red-300',
  'bg-yellow-50',
  'bg-yellow-100',
  'bg-yellow-200',
  'bg-yellow-300',
  'bg-green-50',
  'bg-green-100',
  'bg-green-200',
  'bg-green-300',
  'bg-blue-50',
  'bg-blue-100',
  'bg-blue-200',
  'bg-blue-300',
  'bg-indigo-50',
  'bg-indigo-100',
  'bg-indigo-200',
  'bg-indigo-300',
  'bg-indigo-400',
  'bg-purple-50',
  'bg-purple-100',
  'bg-purple-200',
  'bg-purple-300',
  'bg-pink-50',
  'bg-pink-100',
  'bg-pink-200',
  'bg-pink-300'
];

/*
 TODO: 将不合适的颜色删除
 Author: _lmmmmmm
 Date: 2021/08/26 20:06:40
 */
const randomColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

export default randomColor;
