<!--  -->
<template>
  <div class="playlist">
    <el-backtop></el-backtop>
    <div class="baseInfo">
      <div>
        <img :src="baseInfo.img" alt="" />
      </div>
      <div class="info">
        <div class="title">
          <div class="tag">歌单</div>
          <div class="text">
            {{ baseInfo.name }}
          </div>
        </div>
        <div class="author">
          <a href="#">
            <img :src="baseInfo.creatorAvatar" alt="" />
          </a>
          <span>{{ baseInfo.creatorName }}</span>
          <span class="time">{{ getCreateTime }}</span>
        </div>
        <div class="btns">
          <el-button type="primary" round @click="playAll">播放全部</el-button>
          <el-button round>收藏({{ baseInfo.playCount }})</el-button>
          <el-button round>分享({{ baseInfo.shareCount }})</el-button>
        </div>
        <div class="tags">标签：{{ getTags }}</div>
        <div class="desc">
          简介：
          {{ baseInfo.title }}
        </div>
      </div>
    </div>
    <div class="tabs">
      <div
        :class="['item', { active: currentIndex == i }]"
        v-for="(item, i) in tabs"
        @click="changeRoute(i)"
      >
        {{ item }}
      </div>
    </div>
    <!-- 歌曲列表 -->
    <music-list
      :musics="musicList"
      v-if="currentIndex === 0 && musicList.length !== 0"
    ></music-list>
    <comment
      :id="id"
      :recommendsCount="recommendsCount"
      v-else-if="currentIndex === 1 && recommendsCount !== 0"
    ></comment>
    <subscribers v-else :subscribers="subscribers"></subscribers>
  </div>
</template>

<script>
import {
  getPlayListDetail,
  getSongDetail,
  songDetail,
  baseInfo,
} from "@/network/api/music-list";
//
import MusicList from "./child/MusicList.vue";
import Comment from "./child/Comment.vue";
import Subscribers from "./child/Subscribers.vue";
import moment from "moment";
export default {
  name: "PlayList",
  data() {
    return {
      id: 0,
      baseInfo: {},
      recommendsCount: 0, //评论数量
      list: [],
      length: 0,
      musicList: [],
      tabs: ["歌曲列表", "评论", "收藏者"],
      currentIndex: 0,
      subscribers: [],
    };
  },
  components: {
    MusicList,
    Comment,
    Subscribers,
  },
  created() {
    this.getDetailRequest();
  },
  computed: {
    getTags() {
      this.tabs[1] = "评论" + "(" + this.recommendsCount + ")";
      return this.baseInfo.tags && this.baseInfo.tags.join("/");
    },
    getCreateTime() {
      return moment(this.baseInfo.createTime).format("LL");
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.$store.commit("setListIndex", -1);
  },
  methods: {
    playAll() {
      this.$store.commit("setSongsList", this.musicList);
      this.$store.dispatch("nextSong", {
        index: 1,
      });
    },
    changeRoute(i) {
      this.currentIndex = i;
    },
    async getDetailRequest() {
      this.id = this.$route.params.id;
      const res = await getPlayListDetail(this.id);
      // console.log(res);
      if (res) {
        //获取订购人信息
        this.subscribers = res.playlist.subscribers;
        this.baseInfo = new baseInfo(res.playlist);
        /**获取歌单评论数 */
        this.recommendsCount = res.playlist.commentCount;
        /**遍历查询歌单所有歌曲详情 */
        let str = "评论(" + this.recommendsCount + ")";
        this.list = ["歌曲列表", str, "收藏者"];
        const trackIds = res.playlist.trackIds;
        console.log(trackIds);
        /**获取歌曲列表长度 */
        this.length = trackIds.length;
        for (let i = 0; i < this.length; i++) {
          getSongDetail(trackIds[i].id).then((res) => {
            if (res) {
              // console.log(res);
              let song = new songDetail(res.songs);
              this.musicList.push(song);
            }
          });
        }
      }
    },
  },
};
</script>
<style scoped lang='less'>
.playlist {
  width: 710px;
  margin: 0 auto;
  min-height: 700px;
  box-sizing: border-box;
  background-color: #fff;
  padding: 20px;
  .tabs {
    display: flex;
    text-align: center;
    .active {
      border-bottom: 3px solid #2d8cf0;
      color: #2d8cf0;
    }
    .item {
      width: 130px;
      height: 60px;
      margin-left: 10px;
      line-height: 60px;
      font-size: 20px;
    }
    .item:hover {
      color: #2d8cf0;
      border-bottom: 3px solid #2d8cf0;
      cursor: pointer;
    }
  }
  .baseInfo {
    padding: 10px;
    display: flex;
    img {
      width: 180px;
      height: 180px;
    }
    .info {
      margin-left: 20px;
      .tags {
        margin-top: 10px;
        margin-left: 4px;
      }
      .desc {
        margin: 10px 0 0 5px;
        word-wrap: break-word;
        word-break: break-word;
        /* 保留空格和换行符 */
        white-space: pre-line;
        /* white-space: pre-wrap; */
      }
      .author {
        margin-top: 10px;
        line-height: 40px;
        margin-left: 4px;
        display: flex;
        .time {
          margin-left: 40px;
        }
        span {
          margin-left: 20px;
        }
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
      .title {
        display: flex;
        margin-left: 4px;
        .tag {
          width: 50px;
          height: 25px;
          text-align: center;
          line-height: 25px;
          background-color: #db1f1f;
          color: #fff;
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