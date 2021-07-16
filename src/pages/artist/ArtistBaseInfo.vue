<template>
  <div class="artist-base-info" v-if="artist.length !== 0">
    <div class="left">
      <img :src="artist.picUrl" alt />
    </div>
    <div class="right">
      <h3>
        <el-tag type="danger" effect="dark">歌手</el-tag>
        {{ artist.name }}
      </h3>
      <div class="desc">
        <p><span>单曲数：</span>{{ artist.musicSize }}</p>
        <p><span>专辑数：</span>{{ artist.albumSize }}</p>
        <p><span>MV数：</span> {{ mvCount }}</p>
        <p class="desc-title" v-if="!isUnfold"><span>简介：</span>{{ desc }}</p>
        <p v-else><span>简介：</span>{{ desc }}</p>
        <p ref="fold" @click="isUnfold = !isUnfold" class="fold">展开</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getArtistDesc } from "../../network/api/artist";
export default {
  name: "ArtistBaseinfo",
  props: {
    artist: {
      type: Object,
      default: {},
    },
    mvCount: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    isUnfold() {
      this.$refs.fold.innerText = this.isUnfold ? "收起" : "展开";
    },
    artist() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  data() {
    return {
      desc: "",
      desc: "",
      isUnfold: false,
    };
  },
  methods: {
    async init() {
      // console.log(this.artist);
      const res = await getArtistDesc(this.artist.id);
      this.desc = res.briefDesc;
    },
  },
};
</script>
<style lang="less" scoped>
.artist-base-info {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  position: relative;
  margin-bottom: 10px;
  .left {
    width: 200px;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    padding-left: 35px;
    h3 {
      padding: 5px 0px;
    }
  }
}
.desc {
  padding: 10px 0px;
  font-size: 13px;
  .fold {
    position: absolute;
    bottom: -10px;
    right: 20px;
    color: #0c73c2;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  p {
    padding: 3px 0px;
  }
  span {
    color: #0c73c2;
  }
  &-title {
    padding-top: 14px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>