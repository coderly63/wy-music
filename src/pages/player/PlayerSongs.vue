<!--  -->
<template>
  <div class="single-song" ref="songList">
    <div class="song-list">
      <ul class="song-list-header">
        <li class="header-name">歌曲</li>
        <li class="header-artist">歌手</li>
        <li class="header-album">专辑</li>
        <li class="header-time">时长</li>
      </ul>
      <ul class="song-list-list">
        <li
          v-for="(item, i) in songs"
          @dblclick="dbClick(i)"
          :key="item.id"
          :class="{
            active: $store.getters.id === item.id,
          }"
        >
          <div
            class="song-number"
            :class="{ activeNumber: $store.getters.isPlay }"
          >
            {{ i + 1 }}
          </div>
          <div class="song-name">{{ item.name }}</div>
          <div class="song-artist">{{ item.artist }}</div>
          <div class="song-album">{{ item.album }}</div>
          <div class="song-time">{{ item.time }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSongUrl } from "@/network/api/music-list";
export default {
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    songCount: {
      type: Number,
      default: 0,
    },
    artist: {
      type: Object,
      defaule() {
        return {};
      },
    },
    page: {
      type: Number,
      default: 1,
    },
    onlySong: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    page(to, from) {
      console.log(to);
      console.log(from);
    },
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit("handleCurrentChange", page);
      const top = this.$refs.songList.offsetTop;
      window.scrollTo(0, top);
    },
    async dbClick(i) {
      this.$store.commit("setSongsList", this.songs);
      this.$store.commit("setListIndex", i - 1);
      this.$store.dispatch("nextSong", { index: 1 });
    },
    playAll() {
      this.$store.commit("setSongsList", this.songs);
      this.$store.dispatch("nextSong", {
        index: 1,
      });
    },
  },
};
</script>
<style scoped lang='less'>
.single-song {
  box-sizing: border-box;
  background-color: transparent;
  .song-name,
  .song-artist,
  .song-album,
  .song-time {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header-name,
  .song-name {
    width: 43%;
  }
  .header-artist,
  .song-artist {
    padding-left: 15px;
    width: 25.5%;
    box-sizing: border-box;
  }
  .header-album,
  .song-album {
    padding-left: 15px;
    width: 25.5%;
    box-sizing: border-box;
  }
  .header-time,
  .song-time {
    text-align: center;
    width: 50px;
    padding-left: 15px;
    margin-right: 20px;
  }
  .song-list {
    margin-top: 10px;
    .song-list-header {
      padding-left: 46px;
      height: 50px;
      line-height: 50px;
      background-color: rgba(0, 0, 0, 0.01);
      color: #999;
      display: flex;
    }
    .song-list-list {
      li {
        height: 50px;
        line-height: 50px;
        color: hsla(0, 0%, 88.2%, 0.8);
        background-color: transparent;
        > div {
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
        position: relative;
        display: flex;
        .song-number {
          position: absolute;
          top: 0;
          left: 5px;
          color: #999;
        }
        .song-name {
          margin-left: 45px;
        }
        .song-time {
          color: #999;
        }
      }
      .active {
        color: #fff;
        position: relative;
        .activeNumber {
          position: absolute;
          top: 20px;
          left: 1px;
          font-size: 0;
          background-image: url("@/assets/img/wave.gif");
          background-size: cover;
          background-repeat: no-repeat;
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
</style>