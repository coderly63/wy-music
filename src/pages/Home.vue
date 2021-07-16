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
export default {};
</script>
<style scoped lang="less">
.content {
  margin-bottom: 60px;
}
</style>

