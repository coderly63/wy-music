<!--  -->
<template>
  <div class="side-bar">
    <div class="title">MV介绍</div>
    <div class="info">
      <span class="span">发布时间{{ mvDetail.publishTime }}</span>
      <span class="span">播放次数{{ mvDetail.playCount }}次</span>
      <div class="desc">简介： {{ mvDetail.desc }}</div>
    </div>
    <div class="recommend">
      <div class="text">相关推荐</div>
      <div class="item" v-for="item in mvs" :key="item.id">
        <div class="mv" @click="toDetail(item.id)">
          <img :src="item.cover" />
        </div>
        <div class="info">
          <div class="name"><span class="btn">MV</span>{{ item.name }}</div>
          <div class="artist">{{ item.artistName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSimiMv, getDetail } from "@/network/api/mv";
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      mvs: [],
      mvDetail: {},
    };
  },
  created() {
    this.init();
  },
  watch: {
    id() {
      this.init();
    },
  },
  methods: {
    async init() {
      let res = await getSimiMv(this.id);
      // console.log(res);
      if (res.code === 200) {
        this.mvs = res.mvs;
      }
      res = await getDetail(this.id);
      if (res && res.code == 200) {
        this.mvDetail = res.data;
        console.log(res.data);
      }
    },
    toDetail(id) {
      this.$router.push("/home/mv/" + id);
    },
  },
};
</script>
<style scoped lang='less'>
.side-bar {
  padding-right: 20px;
  margin-top: 20px;
  .recommend {
    .text {
      font-size: 20px;
      margin-top: 15px;
    }
    .item {
      display: flex;
      margin-top: 10px;
      position: relative;
      .mv {
        img {
          width: 160px;
          height: 90px;
          cursor: pointer;
        }
      }
      .info {
        margin-left: 10px;
        .artist {
          position: absolute;
          bottom: 3px;
        }
        .name {
          overflow: hidden;
          width: 200px;
          white-space: nowrap;
          text-overflow: ellipsis;
          .btn {
            width: 40px;
            height: 22px;
            border: 2px solid red;
            text-align: center;
            display: inline-block;
            border-radius: 7px;
            font-size: 15px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .title {
    font-size: 20px;
  }
  .info {
    .span {
      font-size: 13px;
      margin-right: 28px;
      margin-top: 10px;
    }
    .desc {
      margin-top: 20px;
      font-size: 14px;
    }
  }
}
</style>