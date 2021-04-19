/* eslint-disable no-useless-catch */
import store from '@/store';

export async function request({
  method = 'get',
  url = '',
  data = null,
  public: pb = false,
}) {
  let rst = null;
  let header = {};

  if (!pb) {
    header['3RD_SESSION'] = store.getters['auth/token'];
  }

  method = method.toUpperCase();
  url = process.env.VUE_APP_apiBaseURL + url;

  try {
    let [error, res] = await uni.request({
      method,
      url,
      data,
      header,
    });

    if (error) {
      rst = error;
      throw rst;
    } else {
      rst = res;
      if (rst.statusCode !== 200) {
        if (rst.statusCode === 401) {
          store.commit('auth/logout');
          uni.reLaunch({
            url: 'login',
          });
        }

        throw rst;
      } else {
        rst = rst.data;
        // 自定义状态码
        if (rst.code !== 0) {
          throw rst;
        }
      }
    }
  } catch (error) {
    throw error;
  }

  return rst;
}
/* eslint-enable no-useless-catch */
