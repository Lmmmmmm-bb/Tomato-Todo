export interface Response<T = any> {
  status: number;
  message: string;
  data: {
    data: T;
    [key: string]: any;
  };
}
