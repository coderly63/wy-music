<!--  -->
<template>
  <label for="search"></label>
  <input
    type="text"
    name="search"
    placeholder="音乐/视频/电台/用户"
    @keyup="debounceSearch"
    @focus="isUnfold = true"
    @blur="isUnfold = false"
    @keyup.enter="
      $router.push('/home/search/' + (keywords === '' ? '周杰伦' : keywords))
    "
    v-model="keywords"
  />
  <div class="search-box" v-if="isUnfold && isEmpty">
    <ul v-if="keywords === ''">
      <li
        v-for="(item, i) in hotList"
        @mousedown="searchDetail(i)"
        :key="item.alg"
      >
        <span class="number" :class="{ hot: i < 3 }">{{ i + 1 }} </span
        ><span class="name">{{ item.searchWord }}</span>
        <span class="score">{{ getscore(item.score) }}万</span>
      </li>
    </ul>
    <div class="recommend" v-else>
      <div class="songs" v-if="songs && songs.length > 0">
        <div class="title">
          <img src="@/assets/img/歌曲.png" alt="" />
          <div class="song">歌曲</div>
        </div>
        <div
          class="item"
          @mousedown="accurateSearch(i, 1)"
          v-for="(item, i) in songs"
          :key="item.id"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="artists" v-if="artists && artists.length > 0">
        <div class="title">
          <img src="@/assets/img/头 像 .png" alt="" />
          <div class="artist">歌手</div>
        </div>
        <div
          class="item"
          v-for="(item, i) in artists"
          :key="item.id"
          @mousedown="accurateSearch(i, 100)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="albums" v-if="albums && albums.length > 0">
        <div class="title">
          <img src="@/assets/img/专辑.png" alt="" />
          <div class="album">专辑</div>
        </div>
        <div
          class="item"
          v-for="(item, i) in albums"
          :key="item.id"
          @mousedown="accurateSearch(i, 10)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/index";
import { hotSearch, suggestSearch } from "@/network/api/search.js";
export default {
  data() {
    return {
      hotList: [],
      isUnfold: false,
      keywords: "",
      songs: [],
      artists: [],
      albums: [],
      empty: true,
      debounceSearch: null,
    };
  },
  created() {
    this.debounceSearch = debounce(this.suggestSearch, 200);
    this.init();
  },
  computed: {
    isEmpty() {
      if (this.keywords !== "") {
        if (
          (this.songs && this.songs.length > 0) ||
          (this.artists && this.artists.length > 0) ||
          (this.albums && this.albums.length > 0)
        )
          return true;
        else return false;
      }
      return true;
    },
  },
  methods: {
    async init() {
      const res = await hotSearch();
      if (res && res.code === 200) {
        // console.log(res);
        this.hotList = res.data;
      }
    },
    getscore(score) {
      return (score / 10000).toFixed(1);
    },
    accurateSearch(i, type) {
      let arr = [];
      if (type === 1) arr = this.songs;
      else if (type === 100) arr = this.artists;
      else arr = this.albums;
      this.keywords = arr[i].name;
      this.$router.push({
        path: "/home/search/" + arr[i].name,
        query: {
          type,
        },
      });
    },
    searchDetail(i) {
      this.songs = [];
      this.artists = [];
      this.albums = [];
      this.$router.push("/home/search/" + this.hotList[i].searchWord);
    },
    //后期加入防抖函数 避免多余消耗 有bug
    async suggestSearch() {
      const res = await suggestSearch(this.keywords);
      // console.log(res);
      if (res && res.code === 200) {
        this.songs = res.result.songs;
        this.artists = res.result.artists;
        this.albums = res.result.albums;
        // console.log(this.songs);
        // console.log(this.artists);
        // console.log(this.albums);
      }
    },
  },
};
</script>
<style scoped lang='less'>
input {
  appearance: none;
  border-radius: 20px;
  outline: 0;
  height: 20px;
  padding: 5px;
  line-height: 20px;
  width: 180px;
}
.search-box {
  position: absolute;
  box-sizing: border-box;
  padding: 0 0 5px 5px;
  overflow-y: scroll;
  width: 180px;
  max-height: 300px;
  top: 50px;
  background-color: #fff;
  left: 12px;
  z-index: 2;

  ul {
    cursor: pointer;
    li {
      .hot {
        color: red;
      }
      width: 100%;
      line-height: 30px;
      list-style: none;
      height: 30px;
      padding-top: 3px;
      color: black;
      .number {
        width: 13px;
        float: left;
        margin-right: 10px;
      }
      .name {
        text-align: left;
        width: 80px;
        white-space: nowrap;
        overflow: hidden;
        float: left;
        text-overflow: ellipsis;
      }
      .score {
        float: right;
      }
    }
    li:hover {
      transition: all 0.3s;
      background-color: #489bb9;
    }
  }
  .recommend {
    padding: 5px;
    line-height: 20px;
    color: black;
    > div {
      border-bottom: 1px solid #f2f2f2;
    }
    img {
      width: 20px;
      height: 20px;
    }
    .title {
      display: flex;
      margin-top: 10px;
      margin-bottom: 10px;
      div {
        margin-left: 7px;
      }
    }
    .item {
      margin-top: 6px;
      text-align: left;
      margin-left: 30px;
      width: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      &:hover {
        transition: all 0.3s;
        background-color: #489bb9;
      }
    }
  }
}
</style>