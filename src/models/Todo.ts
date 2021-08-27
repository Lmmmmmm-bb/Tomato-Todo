import { Theme } from '../constant';

interface Todo {
  uuid: string;
  title: string;
  totalTime: number;
  todayTime: number;
  totalTimes: number;
  todayTimes: number;
  themeClass: Theme;
}

export default Todo;
