<!--  -->
<template>
  <div class="playlist-content">
    <el-tag effect="dark" closable @close="handleClose()" v-if="tag !== '全部'">
      {{ tag }}
    </el-tag>
    <el-tag effect="dark" v-else> 全部内容 </el-tag>
    <ul class="playlists">
      <li class="playlist-item" v-for="(item, i) in playlists" :key="item.id">
        <div class="playlist-item-box">
          <transition name="scale">
            <div class="playlist-cover">
              <img
                class="playlist-image"
                :src="item.coverImgUrl"
                @click="toPlaylist(item.id)"
              />
              <i class="playlist-mask"></i>
              <img class="playlist-icon" src="@/assets/img/播放.png" alt="" />
            </div>
          </transition>
          <h5 class="play-list-title">{{ item.name }}</h5>
          <div class="play-list-author">{{ item.creator.nickname }}</div>
          <div class="play-list-other">播放量：{{ item.playCount }}</div>
        </div>
      </li>
    </ul>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :page-size="30"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getPlaylist } from "@/network/api/playlist";
export default {
  data() {
    return {
      tag: "全部",
      limit: 30,
      page: 1,
      playlists: [],
      total: 0,
    };
  },
  mounted() {
    this.$bus.on("screen", (tag) => {
      this.tag = tag;
      this.init();
    });
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      let offset = (this.page - 1) * this.limit;
      const res = await getPlaylist(this.tag, this.limit, offset);
      if (res && res.code === 200) {
        console.log(res);
        this.total = res.total;
        this.playlists = res.playlists;
      }
    },
    handleClose() {
      this.tag = "全部";
      this.init();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.init();
      window.scrollTo(0, 0);
    },
    toPlaylist(id) {
      this.$router.push("/home/playlist/" + id);
    },
  },
};
</script>
<style scoped lang='less'>
.playlist-content {
  margin-top: 30px;
  .el-tag {
    margin-bottom: 30px;
    background-color: #489bb9;
    border: hidden;
  }
  :deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
    background-color: #489bb9;
  }
  .playlists {
    .playlist-item {
      font-size: 15px;
      display: inline-block;
      width: 18%;
      margin-right: 20px;
      margin-bottom: 35px;
      .playlist-item-box {
        .play-list-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .playlist-cover {
          width: 100%;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          &:hover .playlist-mask {
            opacity: 0.4;
          }
          &:hover .playlist-image {
            transform: scale(1.1, 1.1);
            transition: all 0.7s;
          }
          &:hover .playlist-icon {
            opacity: 1;
            transform: scale(1, 1);
            transition: all 0.7s;
          }
          .playlist-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 60px;
            height: 60px;
            opacity: 0;
            margin: -30px;
            transform: scale(0.3, 0.3);
            transition: all 0.7s;
            pointer-events: none;
          }
          .playlist-mask {
            pointer-events: none;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: #000;
            opacity: 0;
            transition: opacity 0.5s;
          }
          .playlist-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.7s;
          }
        }
      }
    }
  }
}
</style>