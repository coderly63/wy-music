<!--  -->
<template>
  <div class="player-info">
    <div class="avator">
      <img :src="song.pic" />
    </div>
    <div class="info-name">歌曲名：{{ song.name }}</div>
    <div class="info-artist">歌手：{{ song.artist }}</div>
    <div class="info-album">专辑: {{ song.album }}</div>
    <div class="info-lyric-box" v-if="lyric.length > 0">
      <div class="lyric" ref="lyricBox">
        <p v-for="(item, i) in result" :key="'info-lyric' + i">
          {{ item.value }}
        </p>
      </div>
    </div>
    <div v-else class="lyric-tit">无歌词 纯音乐</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getLyric } from "@/network/api/music-list";
import { parseLyric } from "@/utils/index";
export default {
  name: "player-info",
  computed: {
    ...mapGetters(["id", "curSeconds"]),
  },
  watch: {
    id() {
      this.init();
    },
    curSeconds() {
      const lyricBox = this.$refs.lyricBox;
      // console.log(lyricBox);
      for (let i = 0; i < this.result.length; i++) {
        if (
          this.result[i].time <= this.curSeconds &&
          i < this.result.length &&
          this.result[i + 1] &&
          this.curSeconds <= this.result[i + 1].time
        ) {
          document.querySelectorAll("p")[i] &&
            document.querySelectorAll("p")[i].classList.add("on");
          if (lyricBox) {
            // console.log(i);
            lyricBox.style.transform = `translateY(-${(i - 1) * 34}px)`;
          }
        } else {
          document.querySelectorAll("p")[i] &&
            document.querySelectorAll("p")[i].classList.remove("on");
        }
      }
    },
  },
  props: {
    song: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      lyric: "",
      result: [],
    };
  },
  async mounted() {
    this.init();
  },
  methods: {
    async init() {
      const res = await getLyric(this.id);
      if (res && res.code === 200 && res.lrc) {
        this.lyric = res.lrc.lyric;
        this.result = parseLyric(this.lyric);
      } else {
        this.lyric = "";
      }
    },
  },
};
</script>
<style scoped lang='less'>
.player-info {
  margin-top: 50px;
  text-align: center;
  color: hsla(0, 0%, 88.2%, 0.8);
  > div {
    margin-bottom: 10px;
  }
  .avator {
    position: relative;
    width: 186px;
    height: 186px;
    margin: 0 auto;
    margin-bottom: 10px;
    overflow: hidden;
    img {
      width: 100%;
    }
    &::after {
      background-image: url("@/assets/img/背景.png");
      position: absolute;
      content: "";
      width: 216px;
      height: 186px;
      background-repeat: no-repeat;
      top: 0;
      right: -40px;
    }
  }
  .info-name,
  .info-artist,
  .info-album {
    &:hover {
      cursor: pointer;
      color: #fff;
    }
  }
  .info-lyric-box {
    position: absolute;
    left: 0;
    top: 380px;
    right: 0;
    bottom: 240px;
    overflow: hidden;
    mask-image: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0) 0,
      hsla(0, 0%, 100%, 0.6) 15%,
      #fff 25%,
      #fff 75%,
      hsla(0, 0%, 100%, 0.6) 85%,
      hsla(0, 0%, 100%, 0)
    );
    -webkit-mask-image: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0) 0,
      hsla(0, 0%, 100%, 0.6) 15%,
      #fff 25%,
      #fff 75%,
      hsla(0, 0%, 100%, 0.6) 85%,
      hsla(0, 0%, 100%, 0)
    );
    .lyric {
      white-space: pre-line;
      transition: transform 0.1s ease-out 0s;
      > p {
        font-size: 14px;
        height: 34px;
        line-height: 34px;
      }
      .on {
        font-size: 17px;
        color: greenyellow;
      }
    }
  }
  .lyric-tit {
    margin-top: 40px;
  }
}
@media (max-height: 670px) {
  .info-lyric-box {
    top: 360px !important;
    bottom: 180px !important;
  }
}
</style>