import axios, { AxiosResponse } from 'axios';
import type { AxiosInstance } from 'axios';

class Request {
  // 请求实例
  instance: AxiosInstance;
  // 请求拦截器对象
  interceptorsObj;
  // 取消请求map
  abortControllerMap;

  constructor(config: any) {
    this.instance = axios.create(config);
    // * 初始化存放取消请求控制器Map
    this.abortControllerMap = new Map();
    this.interceptorsObj = config.interceptors;
    // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
  }
}

export default Request;
