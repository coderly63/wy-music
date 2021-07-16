<!--  -->
<template>
  <div class="artist-list">
    <div class="img" v-for="(item, i) in artists">
      <img :src="item.img1v1Url" @click="toArtistDetail(item)" />
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    toArtistDetail(item) {
      this.$emit("changeActiveNum");
      let str = JSON.stringify(item);
      this.$router.push({
        path: "/home/artist-detail",
        query: {
          artist: str,
        },
      });
    },
  },
};
</script>
<style scoped lang='less'>
.artist-list {
  display: flex;
  flex-wrap: wrap;
  .img {
    img {
      width: 150px;
      height: 130px;
    }
    .name {
      text-align: center;
    }
    margin: 10px 30px 10px 0;
    cursor: pointer;
  }
}
</style>