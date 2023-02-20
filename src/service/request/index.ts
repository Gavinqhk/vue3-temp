import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { RequestConfig, RequestInterceptors } from './types';
class Request {
  // 请求实例
  instance: AxiosInstance;
  // 实例拦截
  interceptorsObj?: RequestInterceptors;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    // 实例拦截
    this.interceptorsObj = config.interceptors;
    // 全局请求拦截
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        console.log('全局请求拦截器', res);
        return res;
      },
      err => {
        console.error(err);
      },
    );

    // 实例拦截init
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    );

    // 全局响应拦截确保在最后
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('全局相应拦截器', res);
        return res.data;
      },
      err => {
        console.error(err);
      },
    );
  }

  // request<T>(config: RequestConfig): Promise<T> {
  //   return new Promise((resolve, reject) => {
  //     // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
  //     if (config.interceptors?.requestInterceptors) {
  //       config = config.interceptors.requestInterceptors(config);
  //     }
  //     this.instance
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       .request<any, T>(config)
  //       .then(res => {
  //         // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
  //         if (config.interceptors?.responseInterceptors) {
  //           res = config.interceptors.responseInterceptors<T>(res);
  //         }

  //         resolve(res);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // }

  request(config: RequestConfig) {
    return this.instance.request(config);
  }
}

const request = new Request({
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      console.log('实例请求拦截器', config);

      return config;
    },
    // 响应拦截器
    responseInterceptors: result => {
      console.log('实例响应拦截器', result);
      return result;
    },
  },
});

export default request;
