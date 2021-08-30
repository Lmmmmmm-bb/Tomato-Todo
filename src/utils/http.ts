import axios, { AxiosResponse } from 'axios';
import NProgress from 'nprogress';

import { Response } from '../models/Http';

const instance = axios.create({
  // baseURL: 'http://localhost:4000',
  baseURL: 'http://192.168.0.136:4000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

instance.interceptors.request.use(
  (result) => {
    NProgress.start();
    return result;
  },
  (error) => error
);

instance.interceptors.response.use(
  (result) => {
    NProgress.done();
    return result.data;
  },
  (error) => {
    NProgress.done();
    return error;
  }
);

const getRequest = (url: string, params?: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<Response> = await instance.get(url, {
        params
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const postRequest = (url: string, body: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<Response> = await instance.post(url, body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const putRequest = (url: string, body: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<Response> = await instance.put(url, body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const deleteRequest = (url: string, data: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<Response> = await instance.delete(url, {
        data
      });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export { getRequest, postRequest, putRequest, deleteRequest };
