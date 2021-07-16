<!--  -->
<template>
  <div class="box">
    <div class="content">
      <ul class="nav">
        <li>
          <em
            :class="{ active: currentIndex == i }"
            v-for="(item, i) in list"
            :key="item.path"
            @click="changePage(i, item.path)"
            >{{ item.name }}</em
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      list: [
        { name: "推荐", path: "/discover" },
        { name: "排行榜", path: "/toplist" },
        { name: "歌单", path: "/playlist" },
        { name: "主播电台", path: "/djradio" },
        { name: "歌手", path: "/artist" },
        { name: "新碟上架", path: "/album" },
      ],
    };
  },
  watch: {
    $route() {
      if (this.$route.path.indexOf("discover") !== -1) this.currentIndex = 0;
    },
  },
  methods: {
    changePage(i, path) {
      this.currentIndex = i;
      this.$router.push("/home" + path);
    },
  },
};
</script>
<style scoped lang="less">
.box {
  height: 35px;
  background-color: #a2b58f;
  border-bottom: 1px solid #f9dfcc;
  box-sizing: border-box;
  .content {
    width: 1100px;
    height: 34px;
    margin: 0 auto;
    .nav {
      padding-left: 150px;
      height: 30px;
      line-height: 30px;
      display: flex;
      li {
        list-style: none;
        text-align: center;
        em {
          height: 20px;
          line-height: 20px;
          padding: 0 13px;
          margin: 7px 17px 0;
          border-radius: 20px;
          font-size: 14px;
        }
        em:hover {
          background: #f9dfcc;
          cursor: pointer;
        }
      }
      .active {
        background: #f9dfcc;
        cursor: pointer;
      }
    }
  }
}
</style>