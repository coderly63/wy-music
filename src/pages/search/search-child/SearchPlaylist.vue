<!--  -->
<template>
  <div class="single-play">
    <div class="play-list">
      <ul class="play-list-header">
        <li class="header-name">歌单</li>
        <li class="header-artist">创建人</li>
        <li class="header-time">收听</li>
      </ul>
      <ul class="play-list-list">
        <li v-for="(item, i) in playlists" @click="toPlaylist(item)">
          <div class="pic">
            <img :src="item.coverImgUrl" alt="" />
          </div>
          <div class="play-name">{{ item.name }}</div>
          <div class="play-artist">{{ item.creator.nickname }}</div>
          <div class="play-time">{{ item.playCount }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    playlists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    toPlaylist(item) {
      this.$router.push("/home/playlist/" + item.id);
    },
  },
};
</script>
<style scoped lang='less'>
.single-play {
  .header-name,
  .play-name {
    margin-left: 20px;
    width: 53%;
  }
  .header-artist {
    margin-left: 50px;
  }
  .header-artist,
  .play-artist {
    padding-left: 15px;
    width: 30%;
    box-sizing: border-box;
  }
  .header-time,
  .play-time {
    text-align: center;
    padding-left: 15px;
  }
  margin-top: 10px;
  .play-list-header {
    height: 50px;
    line-height: 50px;
    background-color: rgba(0, 0, 0, 0.01);
    color: #999;
    li {
      float: left;
    }
  }
  .play-list-list {
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
      .play-name {
        margin-left: 20px;
        box-sizing: border-box;
      }
      .play-time {
        color: #999;
      }
    }
  }
}
</style>