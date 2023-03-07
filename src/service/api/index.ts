import Request from '../request';
const request = new Request({
  baseURL: process.env.VUE_APP_API_BASE_URL,
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

const login = (data: any) => {
  return request.request({
    url: 'user/login',
    method: 'post',
    // interceptors: {
    //   // 请求拦截器
    //   requestInterceptors: config => {
    //     console.log('接口请求拦截器', config);
    //     return config;
    //   },
    //   // 响应拦截器
    //   responseInterceptors: result => {
    //     console.log('接口响应拦截器', result);
    //     return result;
    //   },
    // },
    data,
  });
};
export { login };
