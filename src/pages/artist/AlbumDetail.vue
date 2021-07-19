<!--  -->
<template>
  <div class="album-detail">
    <el-backtop></el-backtop>
    <div class="baseInfo">
      <div>
        <img :src="baseInfo.pic" alt="" />
      </div>
      <div class="info">
        <div class="title">
          <el-tag type="warning" class="tags">专辑</el-tag>
          <div class="text">
            {{ baseInfo.name }}
          </div>
          <div class="time">发行时间：{{ baseInfo.publishTime }}</div>
        </div>
        <div class="btns">
          <el-button type="primary" round @click="playAll">播放全部</el-button>
          <el-button round>收藏{{ baseInfo.playCount }}</el-button>
          <el-button round>分享{{ baseInfo.shareCount }}</el-button>
        </div>
        <p class="desc">
          简介：
          {{ baseInfo.desc }}
        </p>
      </div>
    </div>
    <music-list :musics="songList" class="musics"></music-list>
  </div>
</template>

<script>
import { getAlbum, songDetail, albumInfo } from "@/network/api/artist";
import MusicList from "../music/child/MusicList.vue";
export default {
  components: { MusicList },
  name: "albumDetail",
  data() {
    return {
      id: 0,
      baseInfo: {},
      songList: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.id = this.$route.params.id;
      if (this.id > 0) {
        const res = await getAlbum(this.id);
        this.baseInfo = new albumInfo(res.album);
        // console.log(this.baseInfo);
        const songs = res.songs;
        songs.forEach((song) => {
          const songItem = new songDetail(song);
          this.songList.push(songItem);
        });
        // console.log(this.songList);
      }
    },
    playAll() {
      this.$store.commit("setSongsList", this.songList);
      this.$store.dispatch("nextSong", {
        index: 1,
      });
    },
  },
};
</script>
<style scoped lang='less'>
.album-detail {
  width: 1000px;
  margin: 0 auto;
  min-height: 700px;
  box-sizing: border-box;
  background-color: #fff;
  .musics {
    margin-top: 30px;
  }
  .baseInfo {
    position: relative;
    padding: 10px;
    display: flex;
    background: linear-gradient(to right, #6d4a74, #8d4c54);
    color: #fff;
    &:after {
      position: absolute;
      right: 0;
      left: 0;
      height: 30px;
      border-bottom-right-radius: 90%;
      border-bottom-left-radius: 90%;
      bottom: -30px;
      content: "";
      width: 100%;
      background: linear-gradient(to right, #6d4a74, #8d4c54);
    }
    img {
      width: 180px;
      height: 180px;
    }
    .info {
      margin-left: 20px;
      .btns {
        margin-top: 10px;
      }
      .desc {
        margin: 10px 0 0 5px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .title {
        display: flex;
        margin-left: 4px;
        .time {
          position: absolute;
          right: 30px;
          top: 30px;
        }
        .text {
          margin-left: 20px;
          font-size: 20px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>