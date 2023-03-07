import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { RequestConfig, RequestInterceptors, CancelRequestSource } from './types';
import {
  handleRequestHeader,
  handleAuth,
  handleNetworkError,
  handleAuthError,
  handleGeneralError,
} from './util';
class Request {
  // 请求实例
  instance: AxiosInstance;
  // 实例拦截
  interceptorsObj?: RequestInterceptors;
  /*
  存放取消方法的集合
  * 在创建请求后将取消请求方法 push 到该集合中
  * 封装一个方法，可以取消请求，传入 url: string|string[]
  * 在请求之前判断同一URL是否存在，如果存在就取消请求
  */
  cancelRequestSourceList?: CancelRequestSource[];
  /*
  存放所有请求URL的集合
  * 请求之前需要将url push到该集合中
  * 请求完毕后将url从集合中删除
  * 添加在发送请求之前完成，删除在响应之后删除
  */
  requestUrlList?: string[];

  constructor(config: RequestConfig) {
    // 创建实例
    this.instance = axios.create(config);
    // 实例拦截
    this.interceptorsObj = config.interceptors;
    // 数据初始化
    this.requestUrlList = [];
    this.cancelRequestSourceList = [];

    // 全局请求拦截
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config = handleRequestHeader(config);
        config = handleAuth(config);
        console.log('全局请求拦截器1---success', config);
        return config;
      },
      err => {
        console.log('全局请求拦截器1---err', err);
        return Promise.reject(err);
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
      (response: AxiosResponse) => {
        if (response.status !== 200) return Promise.reject(response.data);
        handleAuthError(response.data.code);
        handleGeneralError(response.data.code, response.data.message);
        console.log('全局相应拦截器1---success', response);
        return response;
      },
      err => {
        console.log('全局相应拦截器1---err', err);
        handleNetworkError(err.response.status);
        return Promise.reject(err);
      },
    );
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }

      const url = config.url;
      // url存在保存取消请求方法和当前请求url
      if (url) {
        this.requestUrlList?.push(url);
        config.cancelToken = new axios.CancelToken(c => {
          this.cancelRequestSourceList?.push({
            [url]: c,
          });
        });
      }

      this.instance
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .request<any, T>(config)
        .then(res => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res);
          }
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          url && this.delUrl(url);
        });
    });
  }

  /**
   * @description: 获取指定 url 在 cancelRequestSourceList 中的索引
   * @param {string} url
   * @returns {number} 索引位置
   */
  private getSourceIndex(url: string): number {
    return this.cancelRequestSourceList?.findIndex((item: CancelRequestSource) => {
      return Object.keys(item)[0] === url;
    }) as number;
  }

  /**
   * @description: 删除 requestUrlList 和 cancelRequestSourceList
   * @param {string} url
   * @returns {*}
   */
  private delUrl(url: string) {
    const urlIndex = this.requestUrlList?.findIndex(u => u === url);
    const sourceIndex = this.getSourceIndex(url);
    // 删除url和cancel方法
    urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1);
    sourceIndex !== -1 && this.cancelRequestSourceList?.splice(sourceIndex as number, 1);
  }

  // 取消请求
  cancelRequest(url: string | string[]) {
    if (typeof url === 'string') {
      // 取消单个请求
      const sourceIndex = this.getSourceIndex(url);
      sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]();
    } else {
      // 存在多个需要取消请求的地址
      url.forEach(u => {
        const sourceIndex = this.getSourceIndex(u);
        sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][u]();
      });
    }
  }

  // 取消全部请求
  cancelAllRequest() {
    this.cancelRequestSourceList?.forEach(source => {
      const key = Object.keys(source)[0];
      source[key]();
    });
  }
}

export default Request;
