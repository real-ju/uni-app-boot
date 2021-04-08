/* eslint-disable no-useless-catch */
import store from '@/store';

export async function request({
  method = 'get',
  url = '',
  data = null,
  pb = false
}) {
  let rst = null;
  let header = {};

  if (!pb) {
    header['3RD_SESSION'] = store.getters['auth/token'];
  }

  method = method.toUpperCase();
  url = process.env.VUE_APP_apiBaseURL + url;

  try {
    rst = await uni.request({
      method,
      url,
      data,
      header
    });

    if (rst.statusCode !== 200) {
      if (rst.statusCode === 401) {
        store.commit('auth/logout');
        uni.reLaunch({
          url: 'login'
        });
      }

      throw rst;
    }
  } catch (error) {
    throw error;
  }

  return rst;
}
/* eslint-enable no-useless-catch */
