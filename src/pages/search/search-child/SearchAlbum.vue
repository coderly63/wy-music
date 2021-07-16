<!--  -->
<template>
  <div class="single-album">
    <div class="album-list">
      <ul class="album-list-header">
        <li class="header-name">专辑</li>
        <li class="header-artist">歌手</li>
        <li class="header-time">发行时间</li>
      </ul>
      <ul class="album-list-list">
        <li v-for="(item, i) in albums" @click="toAlbum(item)">
          <div class="pic">
            <img :src="item.picUrl" alt="" />
          </div>
          <div class="album-name">{{ item.name }}</div>
          <div class="album-artist">{{ item.artist.name }}</div>
          <div class="album-time">{{ getTime(item.publishTime) }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    albums: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    getTime(time) {
      return moment(time).format("YYYY-MM-DD");
    },
    toAlbum(item) {
      this.$router.push("/home/album-detail/" + item.id);
    },
  },
};
</script>
<style scoped lang='less'>
.album-list {
  .header-name,
  .album-name {
    margin-left: 20px;
    width: 53%;
  }
  .header-artist {
    margin-left: 50px;
  }
  .header-artist,
  .album-artist {
    padding-left: 15px;
    width: 30%;
    box-sizing: border-box;
  }
  .header-time,
  .album-time {
    text-align: center;
    padding-left: 15px;
  }
  margin-top: 10px;
  .album-list-header {
    height: 50px;
    line-height: 50px;
    background-color: rgba(0, 0, 0, 0.01);
    color: #999;
    li {
      float: left;
    }
  }
  .album-list-list {
    li {
      height: 70px;
      line-height: 70px;
      .pic {
        margin-top: 10px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      &:nth-child(odd) {
        background-color: rgb(252, 252, 252);
      }
      &:nth-child(even) {
        background-color: rgb(255, 255, 255);
      }
      > div {
        cursor: pointer;
        &:hover {
          color: #5aabc3;
        }
      }
      position: relative;
      display: flex;
      .album-name {
        margin-left: 20px;
        box-sizing: border-box;
      }
      .album-time {
        color: #999;
      }
    }
  }
}
</style>