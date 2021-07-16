<!--  -->
<template>
  <div class="box">
    <div class="top">
      <!-- 此处有bug 跳转至首页nav-bar中currentindex并没有改变 记得改 -->
      <div class="logo" @click="$router.push('/home/discover')">
        <img src="../assets/img/logo.png" alt="" />
      </div>
      <div class="list">
        <div class="text">发现音乐</div>
        <div class="text">我的音乐</div>
        <div class="text">朋友</div>
        <div class="text">商城</div>
        <div class="text">音乐人</div>
        <div class="text">下载客户端</div>
        <div class="search">
          <search></search>
        </div>
        <div
          class="avatar"
          @click="$refs.login.isLoading = true"
          v-show="!isLogin"
        >
          <img src="../assets/img/头 像 .png" alt="" />
        </div>
        <div
          class="avatar"
          @click="$refs.register.isRegister = true"
          v-show="!isLogin"
          style="line-height: 50px"
        >
          注册
        </div>
        <div class="avatar" v-show="$store.getters.isLogin">
          <img :src="$store.getters.avatarUrl" alt="" />
        </div>
      </div>
    </div>
    <login ref="login"></login>
    <register ref="register"></register>
  </div>
</template>
<script>
import Login from "../components/user/Login.vue";
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import Register from "./user/Register.vue";
import Search from "./content/Search.vue";
export default {
  setup(props) {
    const store = useStore();
    return {
      isLogin: computed(() => store.state.isLogin),
    };
  },
  components: {
    Login,
    Register,
    Search,
  },
};
</script>
<style lang="less" scoped >
.box {
  height: 70px;
  background-color: #142a36;
  .top {
    width: 1100px;
    display: flex;
    margin: 0 auto;
    .logo {
      cursor: pointer;
    }
    .list {
      display: flex;
      text-align: center;
      line-height: 70px;
      font-size: 14px;
      color: silver;
      .search {
        position: relative;
      }
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 9px 0px 0px 15px;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .avatar:hover {
        cursor: pointer;
      }
      > div {
        height: 70px;
        margin-left: 10px;
        margin-right: 10px;
        padding: 0px 5px;
      }
      .text {
        padding: 0 10px;
      }
      > .text:hover {
        color: #fff;
        cursor: pointer;
        background-color: #000;
      }
    }
  }
}
</style>