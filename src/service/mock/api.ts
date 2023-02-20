import { Random } from 'mockjs';

interface Iconfig {
  url: string;
  type: string;
  body: string;
}

const api = [
  // 登陆接口
  {
    url: '/user/login',
    type: 'post',
    response: (config: Iconfig) => {
      console.log('mock response', config);
      const { username } = JSON.parse(config.body);
      if (username === 'admin') {
        return {
          code: 200,
          message: '操作成功',
          data: {
            token: Random.string('lower', 20),
          },
        };
      }
      return {
        code: 400,
        message: '用户信息错误，请重试~',
        data: {},
      };
    },
  },
];
export default api;
