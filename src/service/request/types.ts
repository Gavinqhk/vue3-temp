import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestInterceptorsCatch?: (err: any) => any;

  // 响应拦截
  responseInterceptors?: (config: AxiosResponse) => AxiosResponse;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseInterceptorsCatch?: (err: any) => any;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}
