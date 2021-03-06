import { createStore } from 'vuex'
import { song } from './song';

export const store = createStore({
  modules: {
    song,
  },
  state() {
    return {
      isLogin: false, //是否登录
      avatarUrl: '',
      userId: '',
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    avatarUrl: state => state.avatarUrl,
    userId: state => state.userId,
  },
  mutations: {
    setLogin: (state, isLogin) => {
      state.isLogin = isLogin;
      window.sessionStorage.setItem('isLogin', JSON.stringify(isLogin));
    },
    setAvatarUrlL: (state, url) => {
      state.avatarUrl = url;
    },
    setUserId: (state, userId) => state.userId = userId,
  }
})