import axios from 'axios';
import NProgress from 'nprogress';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
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
      const response = await instance.get(url, { params });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const postRequest = (url: string, body: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await instance.post(url, body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const putRequest = (url: string, body: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await instance.put(url, body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const deleteRequest = (url: string, data: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await instance.delete(url, { data });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export { getRequest, postRequest, putRequest, deleteRequest };
