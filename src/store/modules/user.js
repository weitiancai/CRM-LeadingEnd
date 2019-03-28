import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        id:'',
        token: getToken(),
        name: '',
        realName:'',
        roles: [],
        studentId:'',
        teacherId:''
    },

    mutations: {
        SET_ID: (state, id) => {
          state.id = id
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_REALNAME: (state, realName) => {
            state.realName = realName
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_STUDENTID: (state, studentId) => {
            state.studentId = studentId
        },
        SET_TEACHERID: (state, teacherId) => {
            state.teacherId = teacherId
        },
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            //userInfo.username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const data = response.data;
                    setToken(data.token);
                    commit('SET_TOKEN', data.token);

                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    const data=response.data;
                    let roles = ['anon'];
                    if (data.user.usertype === 1) {
                      roles = ['teacher'];
                        commit('SET_TEACHERID', data.user.teacherInfo.id);
                    }
                    else if (data.user.usertype === 2) {
                      roles = ['student'];
                        commit('SET_STUDENTID', data.user.studentInfo.id);
                    }
                    else if (data.user.usertype === 5) {
                      roles = ['system'];
                    }
                    response.roles = roles;
                    commit('SET_ID', data.user.id);
                    commit('SET_ROLES', roles);


                    commit('SET_NAME', data.user.username);
                    commit('SET_REALNAME', data.user.realname);
                    resolve(response);
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    removeToken();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve()
            })
        }
    }
};

export default user
