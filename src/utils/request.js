/**
 * Created by tlm on 2018/1/3 下午10:19.
 *
 * http配置
 */
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: '/api', // api的base_url
    timeout: 10000 // 请求超时时间
});

// request 拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    console.error(error); // for debug
    Promise.reject(error)
});


// http response 拦截器
axios.interceptors.response.use(
    response => response,
    error => {
        console.log(`err: ${error}`); //for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error)
        // if (error.response) {
        //     switch (error.response.status) { //若服务端发生异常，则取不到http status的值
        //         case 401: //登录失败或toke无效，则服务端返回HttpServletResponse.SC_UNAUTHORIZED(401)
        //             Message.error({ //显示提示信息
        //                 message: error.response.data.msg,
        //             });
        //             // 401 清除token信息并跳转到登录页面
        //             // store.commit(types.LOGOUT);
        //             Vue.cookie.delete('token');
        //             window.location.href = '/#/login'; //跳转到登录页面。
        //     }
        // }
        // return Promise.reject(error.response.data)
    });
export default service
