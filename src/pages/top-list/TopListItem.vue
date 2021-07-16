<!--  -->
<template>
  <div class="top-list-item" @click="toDetail">
    <div
      class="top"
      :style="{
        background:
          'linear-gradient(to right,' + bgColor[0] + ',' + bgColor[1] + ')',
      }"
    >
      <div class="left">
        <div class="first">{{ title[0] }}</div>
        <div class="scond">
          <div class="text">{{ title[1] }}{{ title[2] }}</div>
          <div class="time">{{ getTime }}</div>
        </div>
      </div>
      <div class="right">
        <img src="@/assets/img/播放.png" alt="" />
      </div>
    </div>
    <div class="bottom">
      <el-table :data="musiclist" style="width: 100%" size="mini">
        <el-table-column type="index" width="30"> </el-table-column>
        <el-table-column prop="name" width="160"> </el-table-column>
        <el-table-column prop="artist" width="110"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getPlayListDetail,
  getSongDetail,
  songDetail,
} from "@/network/api/music-list";
import moment from "moment";
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    bgColor: {
      type: Array,
      defaule() {
        return [];
      },
    },
    title: {
      type: Array,
      defaule() {
        return [];
      },
    },
  },
  data() {
    return {
      musiclist: [],
      playlist: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      if (this.id !== 0) {
        const res = await getPlayListDetail(this.id);
        this.playlist = res.playlist;
        let trackIds = res.playlist.trackIds.slice(0, 8);
        trackIds.forEach(async (item, index) => {
          const res = await getSongDetail(item.id);
          let song = new songDetail(res.songs);
          this.musiclist.push(song);
        });
      }
      // console.log(this.musiclist);
    },
    toDetail() {
      if (this.id !== 0) {
        this.$router.push("/home/playlist/" + this.id);
      }
    },
  },
  computed: {
    getTime() {
      return moment(this.playlist.createTime).format("MMM Do YY");
    },
  },
};
</script>
<style scoped lang='less'>
.top-list-item {
  margin: 10px 20px 20px 0;
  width: 350px;
  cursor: pointer;
  min-height: 300px;
  .top {
    display: flex;
    width: 300px;
    height: 100px;
    font-style: italic;
    position: relative;
    .left {
      display: flex;
      color: #fff;
      margin-left: 15px;
      margin-top: 10px;
      .first {
        font-size: 50px;
      }
      .scond {
        margin-left: 10px;
        font-size: 27px;
        margin-top: 5px;
        .time {
          font-size: 17px;
        }
      }
    }
    .right {
      position: absolute;
      right: 22px;
      top: 22px;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>