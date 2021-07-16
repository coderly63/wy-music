<template>
  <div class="artist-desc-detail">
    <div class="desc">
      <h4>{{ name }}简介</h4>
      <p>{{ descDetail.briefDesc }}</p>
    </div>
    <div class="content">
      <div
        class="intro-item"
        v-for="(item, index) in descDetail.introduction"
        :key="index"
      >
        <h4>{{ item.ti }}</h4>
        <div>
          <p v-for="(item, index) in formatText(item.txt)" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArtistDesc } from "@/network/api/artist";
export default {
  name: "ArtistDesc",
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      descDetail: {},
    };
  },
  watch: {
    $route() {
      this.initRequest();
    },
  },
  created() {
    if (this.id != 0) {
      this.initRequest();
    }
  },
  methods: {
    /**格式化文本 */
    formatText(text) {
      let newText = text.split("\n");
      return newText;
    },
    initRequest() {
      getArtistDesc(this.id).then((res) => {
        // console.log(res);
        this.descDetail = res;
      });
    },
  },
  watch: {
    id() {
      this.initRequest();
    },
  },
};
</script>
<style lang="less" scoped>
.artist-desc-detail {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
}
h4 {
  padding: 10px 0px;
}
p {
  margin-top: 10px;
  text-indent: 35px;
  line-height: 30px;
}
</style>