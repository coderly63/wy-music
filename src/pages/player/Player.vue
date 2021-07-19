<!--  -->
<template>
  <transition>
    <div class="player">
      <div class="bg-player-mask"></div>
      <div
        class="bg-player"
        :style="{ backgroundImage: `url(${picUrl})` }"
      ></div>
      <div class="mod-player">
        <div class="player-tools">
          <el-button type="primary" round>收藏</el-button>
          <el-button type="primary" round>添加到</el-button>
          <el-button type="primary" round>下载</el-button>
          <el-button type="primary" round>清空列表</el-button>
        </div>
        <div class="player-songs">
          <player-songs
            :songs="songsList && songsList"
            v-if="songsList && songsList.length > 0"
          ></player-songs>
        </div>
        <div class="player-infos">
          <player-info
            :song="songsList[listIndex]"
            v-if="songsList"
          ></player-info>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerSongs from "./PlayerSongs.vue";
import PlayerInfo from "./PlayerInfo.vue";
export default {
  components: { PlayerSongs, PlayerInfo },
  name: "player",
  computed: {
    ...mapGetters(["songsList", "picUrl", "id", "listIndex"]),
  },
};
</script>
<style scoped lang='less'>
.v-enter {
  transform: translateY(100%);
}
.v-leave-to {
  transform: translateY(100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}
.player {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #292a2b;
  .bg-player-mask,
  .bg-player {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .bg-player-mask {
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 2;
  }
  .bg-player {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    opacity: 0.6;
    background-color: rgb(255, 255, 255);
    filter: blur(65px);
  }
  .mod-player {
    position: relative;
    box-sizing: border-box;
    padding-top: 1%;
    height: 100vh;
    margin: 0 7.7%;
    min-width: 800px;
    z-index: 3;
    .player-tools {
      .el-button {
        background-color: rgba(185, 185, 185, 0);
        border-color: hsla(0, 0%, 100%, 0.2);
        color: hsla(0, 0%, 100%, 0.2);
        cursor: pointer;
        &:hover {
          border-color: #fff;
          color: #fff;
        }
      }
    }
    .player-songs {
      margin-right: 320px;
      margin-top: 20px;
      min-width: 400px;
      position: relative;
      height: 67%;
      overflow-y: scroll;
      overflow-x: hidden;
      min-height: 100px;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
    }
    .player-infos {
      position: absolute;
      right: 0;
      top: 0;
      width: 280px;
      height: 100%;
    }
  }
}
</style>