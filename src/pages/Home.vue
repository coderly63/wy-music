<!--  -->
<template>
  <div class="box">
    <div class="content">
      <the-header></the-header>
      <nav-bar></nav-bar>
      <router-view v-slot="{ Component }">
        <keep-alive
          :exclude="[
            'PlayList',
            'MvDetail',
            'artistDetail',
            'ArtistBaseinfo',
            'albumDetail',
            'search-detail',
            'user',
            'change-avator',
          ]"
        >
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
      <song-audio v-show="false"></song-audio>
    </div>
    <play-bar></play-bar>
  </div>
</template>

<script setup>
import TheHeader from "../components/TheHeader.vue";
import NavBar from "../components/NavBar.vue";
import SongAudio from "../components/common/SongAudio.vue";
import PlayBar from "../components/common/PlayBar.vue";
</script>

<script>
import { getUserLikeList, getUserSubcount } from "@/network/api/user";
export default {
  async created() {
    let phone = window.localStorage.getItem("phone");
    let password = window.localStorage.getItem("password");
    if (phone != null && password != null) {
      const res = await this.$axios("/login/cellphone", {
        params: {
          phone,
          password,
        },
      });
      if (res && res.code === 200) {
        this.$store.commit("setLogin", "true");
        this.$store.commit("setAvatarUrlL", res.profile.avatarUrl);
        this.$store.commit("setUserId", res.profile.userId);
        const res2 = await getUserLikeList(res.profile.userId);
        if (res2 && res2.code === 200) {
          console.log(res2.ids);
          this.$store.commit("setLikeList", res2.ids);
        }
      }
    }
  },
};
</script>
<style scoped lang="less">
.content {
  margin-bottom: 60px;
}
</style>

