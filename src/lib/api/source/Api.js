import { request as rq } from '@/config/requester';

class Api {
  constructor(options) {
    if (Api.mode === 'common') {
      if (!options.method) {
        throw '普通模式需要指定method参数'
      }
    }

    this.url = options.url;
    this.method = options.method || null;
    this.public = options.public || false;

    this.reqData = null; // 每次请求的数据
    this.res = null; // 每次响应的数据
  }

  // 普通模式下发起请求
  do(...args) {
    let { appendUrl, data } = this._handleRequestParams(args);

    return this.request(appendUrl, this.method, data);
  }

  // Restful模式下发起get请求
  get(...args) {
    let { appendUrl, data } = this._handleRequestParams(args);

    return this.request(appendUrl, 'get', data);
  }

  post(...args) {
    let { appendUrl, data } = this._handleRequestParams(args);

    return this.request(appendUrl, 'post', data);
  }

  put(...args) {
    let { appendUrl, data } = this._handleRequestParams(args);

    return this.request(appendUrl, 'put', data);
  }

  delete(...args) {
    let { appendUrl, data } = this._handleRequestParams(args);

    return this.request(appendUrl, 'delete', data);
  }

  // 处理请求参数。一个参数则为data；两个参数第一个为appendUrl，第二个为data
  _handleRequestParams(args) {
    let appendUrl = null;
    let data = null;

    if (args.length === 1) {
      data = args[0];
    } else if (args.length === 2) {
      appendUrl = args[0];
      data = args[1];
    }

    return {
      appendUrl,
      data,
    };
  }

  request(append = null, method = 'get', data = null) {
    this.reqData = data;
    this.res = null;

    // 构建axios参数data
    if (method === 'get') {
      data = { params: data };
    } else if (method === 'delete') {
      data = { data };
    }

    let url = append ? this.url + append : this.url;

    return new Promise((resolve, reject) => {
      rq({
        method,
        url,
        data,
        public: this.public,
      })
        .then((res) => {
          this.res = res.data;
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  setUrl(url = '') {
    this.url = url;
  }

  static _setApiMode(value) {
    Api.mode = value;
  }
}

Api.mode = ''; // 可选 common,restful

export default Api;
