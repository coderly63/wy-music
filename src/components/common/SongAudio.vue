<!--  -->
<template>
  <div class="song-audio">
    <audio
      ref="player"
      :src="url"
      controls="controls"
      preload="true"
      autoplay
      @ended="musicEnded()"
      @timeupdate="audioTimeUpdate()"
      @playing="musicPlaying()"
    ></audio>
  </div>
</template>
<script>
// @timeupdate="audioTimeUpdate()"
//       @pause="musicPause()"
//       @ended="musicEnded()"
//       @play="playLoad()"
//       @playing="musicPlaying()"
import { mapGetters } from "vuex";
//导入转化时间方法
import { toMS } from "@/utils/index";
export default {
  computed: {
    ...mapGetters([
      "id",
      "url",
      "isPlay",
      "songsList",
      "curTime",
      "changeTime",
      "autoNext",
      "volume",
      "listIndex",
      "picUrl",
      "isLoading",
      "error",
    ]),
  },
  mounted() {
    this.$store.commit("setVolume", this.$refs.player.volume);
  },
  // mounted() {
  //   this.$bus.on("playMusic", () => {
  //     this.$refs.player.play();
  //   });
  // },
  watch: {
    isPlay() {
      let player = this.$refs.player;
      if (this.isPlay && !this.isLoading) {
        if (player.url !== "") player.play();
        else this.$message.error("暂无版权");
      } else {
        player.pause();
      }
    },
    changeTime() {
      this.$refs.player.currentTime = this.changeTime;
    },
    volume() {
      this.$refs.player.volume = this.volume;
    },
    error() {
      if (this.error) {
        this.$message.error("获取歌曲失败 暂无版权");
      }
    },
  },
  methods: {
    //监听音乐开始播放 修复带上蓝牙耳机自动播放但是按钮处未改变的bug
    musicPlaying() {
      this.$store.commit("setIsPlay", true);
    },
    musicEnded() {
      // this.$store.commit("setIsPlay", false);
      this.$store.dispatch("nextSong", { index: 1 });
    },
    //记录音乐的播放位置
    audioTimeUpdate() {
      //由于每秒钟有4次触发 后期可以考虑加入防抖函数
      let currentTime = this.$refs.player && this.$refs.player.currentTime;
      this.$store.commit("setCurSeconds", currentTime);
      currentTime = toMS(currentTime);
      this.$store.commit("setCurTime", currentTime);
    },
  },
};
</script>
<style scoped lang='less'>
.song-audio {
  position: fixed;
  bottom: 0;
}
</style>