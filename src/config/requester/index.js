import axios from 'axios'
import store from '@/store'
import router from '@/router'

export async function request({ method = 'get', url= '', data = null }) {
    let rst = null;
    let header = {
        '3RD_SESSION': store.getters['auth/token']
    }

    method = method.toUpperCase();
    url = process.env.VUE_APP_apiBaseURL + url;

    try {
        rst = await uni.request({
            method,
            url,
            data,
            header
        })

        if(rst.statusCode !== 200) {
            if(rst.statusCode === 401) {
                store.commit('auth/logout');
                uni.reLaunch({
                    url: 'login'
                })
            }

            throw rst
        }
    }
    catch(error) {
        throw error
    }

    return rst
}
// 需要登陆权限的接口访问实例
let instance = axios.create({
    baseURL: process.env.VUE_APP_apiBaseURL,
    timeout: 5000,
    headers: {
        common: {
            '3RD_SESSION': ''
        }
    }
})

instance.interceptors.request.use(function(config) {
    config.headers['3RD_SESSION'] = store.getters['auth/token'];

    return config
}, function(error) {
    return Promise.reject(error)
})

instance.interceptors.response.use(function(response) {
    return response
}, function(error) {
    // 请求超时
    if(error.code === 'ECONNABORTED') {
        return new Promise((resolve, reject) => {
            instance.request(error.config)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
        })
    }
    else if(error.response.status === 401) {
        store.commit('auth/logout');
        router.push('/login');

        return Promise.reject(error)
    }

    return Promise.reject(error)
})


// 公共接口访问实例
let publicInstance = axios.create({
    baseURL: process.env.VUE_APP_apiBaseURL,
    timeout: 5000
})

instance.public = publicInstance;

export default instance
