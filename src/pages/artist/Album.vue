<!--  -->
<template>
  <div class="album">
    <div class="item" v-for="(item, i) in albums" :key="item.id">
      <img :src="item.picUrl" @click="toDetial(i)" />
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { getArtistAlbum, getAlbum } from "../../network/api/artist";
export default {
  props: {
    id: Number,
    default: 0,
  },
  data() {
    return {
      albums: [],
      albumId: 0,
    };
  },
  watch: {
    id() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      if (this.id > 0) {
        const res = await getArtistAlbum(this.id);
        this.albums = res.hotAlbums;
        // console.log(res);
      }
    },
    toDetial(i) {
      this.$router.push("/home/album-detail/" + this.albums[i].id);
    },
  },
};
</script>
<style scoped lang='less'>
.album {
  display: flex;
  flex-wrap: wrap;
  .item {
    margin: 10px 20px 10px 10px;
    .name {
      text-align: center;
      width: 130px;
    }
    img {
      width: 150px;
      height: 150px;
      cursor: pointer;
    }
  }
}
</style>