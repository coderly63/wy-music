<!--  -->
<template>
  <div class="play-bar">
    <div class="pic-url">
      <img
        :src="picUrl"
        v-show="picUrl !== ''"
        :class="{ change: isChange, pause: !isPlay, active: !isChange }"
      />
    </div>
    <div class="keys">
      <div class="btns">
        <img
          src="../../assets/img/上一首.png"
          @click="$store.dispatch('nextSong', { index: -1 })"
        />
        <img
          src="../../assets/img/飞机.png"
          alt=""
          @click="togglePlay"
          v-if="!isPlay && !isLoading"
        />
        <img
          src="../../assets/img/暂停.png"
          alt=""
          @click="togglePlay"
          v-else-if="isPlay && !isLoading"
        />
        <i class="el-icon-loading loading" v-else></i>
        <img
          src="../../assets/img/下一首.png"
          @click="$store.dispatch('nextSong', { index: 1 })"
        />
      </div>
      <div class="start">{{ curTime }}</div>
      <div class="progress" ref="progress" @mousedown="mousedown">
        <div class="info">
          <span v-show="name !== ''">歌曲：{{ name }}</span>
          <span v-show="artist !== ''" class="artist">歌手：{{ artist }}</span>
        </div>
        <div class="bar" ref="bar" :style="{ width: `${spotPos}%` }"></div>
        <div class="spot" ref="spot" :style="{ left: `${spotPos - 3}%` }" />
      </div>
      <div class="end">{{ duration }}</div>
      <div class="tools">
        <div class="volume" @mouseover="mouseover" @mouseout="mouseout">
          <img src="../../assets/img/音量.png" />
          <div v-show="isVolume" class="volumeKey">
            <el-slider v-model="value" vertical height="130px"> </el-slider>
          </div>
        </div>
        <a title="下载">
          <img src="../../assets/img/下 载.png" alt="" />
        </a>
        <a title="不喜欢" v-if="!isLike" @click="like()">
          <img src="../../assets/img/非爱心.png" alt="" />
        </a>
        <a title="喜欢" v-else @click="noLike()">
          <img src="../../assets/img/爱心.png" alt="" />
        </a>
        <a title="列表" @click="$router.push('/home/player')">
          <img src="../../assets/img/列表.png" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { toSeconds } from "../../utils/index";
import { likeSong } from "@/network/api/user";
export default {
  data() {
    return {
      isChange: false,
      progressLength: 0, //进度条长度
      spotPos: 0, //当前点的位置
      allTime: 0, //歌曲总时间的秒数
      flag: false, //判断小点是否被点击
      startX: 0, //点击的起始位置
      isDrag: false, //进度条是否被拖拽中
      isVolume: false,
      value: 0, //音量值
    };
  },
  computed: {
    ...mapGetters([
      "id",
      "url",
      "isPlay",
      "curTime",
      "duration",
      "isLoading",
      "artist",
      "name",
      "picUrl",
      "volume",
      "curSeconds",
      "isLike",
      "likeList",
      "isLogin",
    ]),
  },
  watch: {
    id() {
      this.isChange = true;
      setTimeout(() => {
        this.isChange = false;
      }, 10);
      this.allTime = toSeconds(this.duration);
    },
    curSeconds() {
      if (!this.isDrag) {
        this.spotPos = (this.curSeconds / this.allTime) * 100;
        if (this.curSeconds === this.allTime) {
          this.duration = 0;
        }
      }
    },
    value() {
      this.$store.commit("setVolume", this.value / 100);
    },
  },
  mounted() {
    this.value = this.volume * 100;
    this.progressLength = this.$refs.progress.offsetWidth;
    let progress = this.$refs.progress;
    let spot = this.$refs.spot;
    let that = this;
    let startTime = 0; //设置点击时间差 判断是否为点击原点
    let endTime = 0;
    spot.addEventListener("mousedown", function (e) {
      e = e || window.Event;
      that.isDrag = true;
      startTime = e.timeStamp;
      e.stopPropagation();
      let offsetLength = e.clientX - spot.offsetLeft;
      document.onmousemove = function (e) {
        e = e || window.Event;
        let realLength = e.clientX - offsetLength;
        if (realLength > progress.offsetWidth - spot.offsetWidth) {
          realLength = progress.offsetWidth - spot.offsetWidth;
        } else if (realLength < 0) realLength = 0;
        let newPercent = (realLength / that.progressLength) * 100;
        that.spotPos = newPercent;
      };
      document.onmouseup = function (e) {
        e = e || window.Event;
        endTime = e.timeStamp;
        if (endTime - startTime >= 100) {
          that.changeTime();
        }
        that.isDrag = false;
        document.onmouseup = document.onmousemove = null;
      };
      //解决h5原生拖拽事件
      document.ondragstart = function (ev) {
        ev.preventDefault();
        console.log(1212);
      };
      document.ondragend = function (ev) {
        ev.preventDefault();
        console.log("asd");
      };
    });
  },
  methods: {
    mousedown(e) {
      e = e || window.Event;
      let offsetLength = e.clientX - this.$refs.progress.offsetLeft;
      let offsetPercent = (offsetLength / this.progressLength) * 100;
      this.spotPos = offsetPercent;
      this.changeTime();
    },
    mouseover(e) {
      this.isVolume = true;
    },
    mouseout() {
      this.isVolume = false;
    },
    togglePlay() {
      if (this.url === "") return;
      if (this.isPlay) {
        this.$store.commit("setIsPlay", false);
      } else {
        this.$store.commit("setIsPlay", true);
      }
    },
    changeTime() {
      this.$store.commit("setChangeTime", this.spotPos * 0.01 * this.allTime);
    },
    async like() {
      if (this.isLogin && this.id > 0) {
        if (!this.isLike) {
          const res = await likeSong(this.id);
          if (res && res.code === 200) {
            this.$message.success("已添加到我的喜欢");
            this.$store.commit("pushLikeSong", this.id);
            console.log(this.$store.getters.likeList);
            this.$store.commit("setIsLike", true);
          }
        }
      } else if (!this.isLogin) {
        this.$message.error("请先登录");
      } else if (!this.id) {
        this.$message.error("歌单中暂无歌曲");
      }
    },
    async noLike() {
      const res = await likeSong(this.id, false);
      if (res && res.code === 200) {
        this.$message.success("已从到我的喜欢移除");
        this.$store.commit("spliceLikeSong");
        this.$store.commit("setIsLike", false);
      }
    },
  },
};
</script>
<style scoped lang='less'>
@keyframes rotation1 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
//添加一个相同的动画 目的是切换歌曲的时候让动画重新开始
//若不添加 则默认继续
@keyframes rotation2 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.play-bar {
  z-index: 10;
  position: fixed;
  bottom: 0;
  width: 1520px;
  left: 0;
  right: 0;
  display: flex;
  height: 60px;
  background-color: #fefefe;
  box-shadow: -2px -2px 6px gray;
  border-radius: 40px;
  .pic-url {
    img {
      width: 60px;
      height: 60px;
      position: absolute;
      left: 10%;
      border-radius: 50%;
      animation: rotation2 30s linear infinite;
    }
    .active {
      animation: rotation1 30s linear infinite;
    }
    .change {
      animation: rotation2 30s linear infinite;
    }
    .pause {
      animation-play-state: paused;
    }
  }
  .keys {
    width: 900px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    .start,
    .end {
      margin: 20px 10px 0px 20px;
    }
    .start {
      margin-right: 20px;
    }
    .tools {
      display: flex;
      .volume {
        position: relative;
        .volumeKey {
          position: absolute;
          left: -10px;
          top: -190px;
          height: 200px;
          width: 50px;
          background-color: black;
          opacity: 0.8;
          .el-slider {
            position: absolute;
            bottom: 30px;
            left: 5px;
            :deep(.el-slider__button) {
              width: 17px;
              height: 17px;
            }
          }
        }
      }
      img {
        margin: 17px 20px 0 0;
        cursor: pointer;
      }
    }
    .progress {
      position: relative;
      width: 330px;
      margin: 27px 0;
      height: 10px;
      background-color: darkgray;
      border-radius: 10px;
      .info {
        margin-top: -21px;
        margin-left: 10px;
        width: 280px;
        height: 23px;
        overflow: hidden;
        text-overflow: ellipsis;
        .artist {
          margin-left: 40px;
        }
      }
      .bar {
        position: absolute;
        height: 10px;
        background-color: darkseagreen;
        border-radius: 10px;
        margin-top: -2px;
      }
      .spot {
        position: absolute;
        top: -4px;
        left: -15px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        cursor: pointer;
        background-color: gold;
      }
    }
    .btns {
      margin-top: 15px;
      .loading {
        width: 30px;
        height: 30px;
        margin: 0 10px 0;
      }
      img {
        margin: 0 10px 0;
        cursor: pointer;
      }
    }
    img {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
}
</style>