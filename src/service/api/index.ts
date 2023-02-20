import request from '../request';
const login = (data: any) => {
  return request.request({
    url: '/user/login',
    method: 'post',
    data,
  });
};
export { login };
