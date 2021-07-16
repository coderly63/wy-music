<!--  -->
<template>
  <div class="mv-detail">
    <div class="left">
      <div class="title">
        <div class="sub">MV</div>
        <div class="name">
          {{ mvDetail.name }}
        </div>
      </div>
      <mv-video :id="id" v-if="id !== null"></mv-video>
      <mv-comment :id="id" v-if="id !== null"></mv-comment>
    </div>
    <side-bar class="right" :id="id" v-if="id !== null"></side-bar>
  </div>
</template>

<script>
import {
  MV,
  getDetail,
  getUrl,
  getMVComment,
  getTopMv,
} from "../../network/api/mv";
import MvVideo from "./child/MvVideo.vue";
import SideBar from "./child/SideBar.vue";
import MvComment from "./child/MvComment.vue";
export default {
  name: "MvDetail",
  data() {
    return {
      id: null,
      mvDetail: {},
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  components: {
    MvVideo,
    SideBar,
    MvComment,
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.init();
      window.scrollTo(0, 0);
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.init();
  },
  methods: {
    async init() {
      const res = await getDetail(this.id);
      if (res && res.code == 200) {
        this.mvDetail = res.data;
        // console.log(res.data);
      }
    },
  },
};
</script>
<style scoped lang='less'>
.mv-detail {
  width: 1200px;
  min-height: 300px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  .left {
    flex: 2;
    .title {
      display: flex;
      margin-left: 30px;
      padding: 20px;
      .sub {
        width: 50px;
        height: 25px;
        border: 2px solid red;
        text-align: center;
        border-radius: 7px;
      }
      .name {
        margin-left: 30px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .right {
    flex: 1;
  }
}
</style>