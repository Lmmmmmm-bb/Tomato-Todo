import { Theme } from '../constant';

interface ITodo {
  uuid: string;
  title: string;
  themeClass: Theme;
  totalTime?: number;
  todayTime?: number;
  totalTimes?: number;
  todayTimes?: number;
  createdAt?: Date;
}

export default ITodo;
