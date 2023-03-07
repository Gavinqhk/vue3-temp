import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: <T = InternalAxiosRequestConfig>(config: T) => T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestInterceptorsCatch?: (err: any) => any;

  // 响应拦截
  responseInterceptors?: <T = AxiosResponse>(response: T) => T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseInterceptorsCatch?: (err: any) => any;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}
export interface CancelRequestSource {
  [index: string]: () => void;
}
