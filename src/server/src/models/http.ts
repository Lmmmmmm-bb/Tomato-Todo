import { HttpStatus } from '@nestjs/common';

export interface Response<T = any> {
  status: HttpStatus;
  message: string;
  data?: {
    data: T;
    [key: string]: any;
  };
}
