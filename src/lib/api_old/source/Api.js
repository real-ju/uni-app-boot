import { request as rq } from '@/config/requester';

class Api {
  constructor(options) {
    this.name = options.name;
    this.url = options.url;
    this.public = options.public || false;
    this.loading = {
      get: false,
      post: false,
      put: false,
      delete: false,
    };
    this.reqData = null; // 每次请求的数据
    this.res = null; // 每次响应的数据
  }

  // 发起get请求
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

    if (method === 'get') {
      data = { params: data };
    } else if (method === 'delete') {
      data = { data };
    }

    let url = append ? this.url + append : this.url;

    return new Promise((resolve, reject) => {
      this.loading[method] = true;
      this.res = null;

      rq({
        method,
        url,
        data,
        public: this.public,
      })
        .then((res) => {
          this.res = res.data;
          this.loading[method] = false;
          resolve(res.data);
        })
        .catch((error) => {
          this.loading[method] = false;
          reject(error);
        });
    });
  }

  setUrl(url = '') {
    this.url = url;
  }
}

export default Api;
