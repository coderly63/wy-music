<!--  -->
<template>
  <div class="artist-mv">
    <div class="item" v-for="item in mvs" :key="item.id">
      <img :src="item.imgurl" @click="toMv(item.id)" />
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { getArtistMv } from "@/network/api/artist";
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      mvs: [],
    };
  },
  created() {
    this.init();
  },
  watch: {
    id() {
      this.init();
    },
  },
  methods: {
    async init() {
      if (this.id > 0) {
        const res = await getArtistMv(this.id);
        // console.log(res);
        this.mvs = res.mvs;
      }
    },
    toMv(id) {
      this.$router.push("/home/mv/" + id);
    },
  },
};
</script>
<style scoped lang='less'>
.artist-mv {
  display: flex;
  flex-wrap: wrap;
  .item {
    margin: 10px 20px 10px 20px;
    img {
      width: 180px;
      height: 140px;
      border: 1px solid gainsboro;
      cursor: pointer;
    }
    .name {
      text-align: center;
      width: 130px;
    }
  }
}
</style>