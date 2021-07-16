<!--  -->
<template>
  <div>
    <suspense>
      <swiper></swiper>
    </suspense>
    <div class="content">
      <song-list :songList="songList" v-if="songList.length > 0"></song-list>
      <personal-list></personal-list>
    </div>
  </div>
</template>

<script>
//推荐歌单相关
import SongList from "@/components/content/SongList.vue";
import { getSongList } from "@/network/api/music-list";
import Swiper from "@/components/Swiper.vue";
import PersonalList from "@/components/content/PersonalList.vue";
export default {
  components: {
    Swiper,
    SongList,
    PersonalList,
  },
  data() {
    return {
      songList: [],
    };
  },
  async created() {
    const songList = await getSongList();
    if (songList) {
      this.songList = songList.result.splice(0, 8);
    }
  },
};
</script>
<style scoped lang="less">
.content {
  width: 700px;
  margin: 0 auto;
  min-height: 700px;
  background-color: #fefefe;
}
</style>