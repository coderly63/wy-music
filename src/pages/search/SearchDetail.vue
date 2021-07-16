<!--  -->
<template>
  <div class="search-detail">
    <el-backtop></el-backtop>
    <div class="search">
      <div class="input">
        <el-input
          placeholder="搜索音乐、MV、歌单、用户"
          v-model="keywords"
          clearable
          @input="debounceSearch"
          @focus="isUnfold = true"
          @blur="isUnfold = false"
          @change="carefulSearch"
        >
        </el-input>
        <div class="search-box" v-if="isEmpty && isUnfold">
          <div class="search-result">
            <div class="tit">
              <img src="@/assets/img/歌曲.png" alt="" />
              <p>单曲</p>
            </div>
            <ul>
              <li v-for="(item, i) in songs">
                {{ item.name }}--{{ item.artists[0].name }}
              </li>
            </ul>
          </div>
          <div class="search-result">
            <div class="tit">
              <img src="@/assets/img/头 像 .png" alt="" />
              <p>歌手</p>
            </div>
            <ul>
              <li v-for="(item, i) in artists" @mousedown="toArtist(item)">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="search-result">
            <div class="tit">
              <img src="@/assets/img/专辑.png" alt="" />
              <p>专辑</p>
            </div>
            <ul>
              <li v-for="(item, i) in albums" @mousedown="toAlbum(item)">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="result">
      <div class="tabs">
        <div
          v-for="(item, i) in list"
          @click="currentIndex = i"
          :class="{ active: currentIndex === i }"
          class="item"
        >
          {{ item }}
        </div>
      </div>
      <transition :name="transitionName">
        <single-song
          :songs="singleSong"
          :artist="artist"
          :songCount="songCount"
          :page="page"
          @handleCurrentChange="handleCurrentChange"
          v-if="
            singleSong &&
            Object.keys(singleSong).length > 0 &&
            currentIndex === 0
          "
          class="transition-item"
        ></single-song>
      </transition>
      <transition :name="transitionName">
        <search-album
          :albums="singleAlbum"
          v-if="
            singleAlbum &&
            Object.keys(singleAlbum).length > 0 &&
            currentIndex === 1
          "
          class="transition-item"
        ></search-album>
      </transition>
      <transition :name="transitionName">
        <search-playlist
          :playlists="singleList"
          v-if="
            singleList &&
            Object.keys(singleList).length > 0 &&
            currentIndex === 2
          "
          class="transition-item"
        ></search-playlist>
      </transition>
    </div>
  </div>
</template>

<script>
import { search, suggestSearch } from "@/network/api/search.js";
import { getArtistDetail } from "@/network/api/artist";
import { songDetail } from "@/network/api/artist";
import { debounce } from "@/utils/index";
import SingleSong from "./search-child/SingleSong.vue";
import SearchAlbum from "./search-child/SearchAlbum.vue";
import SearchPlaylist from "./search-child/SearchPlaylist.vue";
export default {
  components: {
    SingleSong,
    SearchAlbum,
    SearchPlaylist,
  },
  name: "search-detail",
  data() {
    return {
      keywords: "周杰伦",
      type: 1,
      limit: 30, //搜索数量 默认30
      page: 1, //当前页
      songs: [],
      artists: [],
      albums: [],
      debounceSearch: null,
      isUnfold: false,
      currentIndex: 0,
      list: ["单曲", "专辑", "歌单"],
      singleSong: [],
      singleAlbum: [],
      singleList: [],
      songCount: 0,
      limit: 30,
      page: 1, //当前页
      artist: {},
      transitionName: "",
    };
  },
  created() {
    this.debounceSearch = debounce(this.suggestSearch, 300);
    this.init();
    this.suggestSearch();
    this.carefulSearch();
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
        return false;
      }
      return false;
    },
  },
  watch: {
    $route() {
      this.keywords = this.$route.params.keywords;
      this.suggestSearch();
      this.carefulSearch();
    },
    currentIndex(to, from) {
      if (to < from) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    },
  },
  methods: {
    init() {
      this.keywords = this.$route.params.keywords;
      this.type = this.$route.query.type || 1;
      // console.log(this.type);
    },
    async carefulSearch() {
      let offset = (this.page - 1) * this.limit;
      this.singleSong = [];
      //获取歌曲列表
      const res = await search(this.keywords, this.limit, offset, this.type);
      if (res && res.code === 200) {
        //获取歌手id
        let artistId = res.result.songs && res.result.songs[0].ar[0].id;
        const res2 = await getArtistDetail(artistId);
        if (res2 && res2.code === 200) {
          this.artist = res2.data.artist;
        }
        this.songCount = res.result.songCount;
        let songs = res.result.songs;
        songs &&
          songs.forEach((song) => {
            let item = new songDetail(song);
            this.singleSong.push(item);
          });
        // console.log(this.singleSong);
      }
      const res3 = await search(this.keywords, this.limit, offset, 10);
      if (res3 && res3.code === 200) {
        this.singleAlbum = res3.result.albums;
      }
      // 获取歌单列表
      const res4 = await search(this.keywords, this.limit, offset, 1000);
      if (res4 && res4.code === 200) {
        this.singleList = res4.result.playlists;
        // console.log(this.singleList);
      }
    },
    async suggestSearch() {
      const res = await suggestSearch(this.keywords);
      // console.log(res);
      if (res && res.code === 200) {
        this.songs = res.result.songs;
        this.artists = res.result.artists;
        this.albums = res.result.albums;
      }
    },
    toArtist(item) {
      let str = JSON.stringify(item);
      this.$router.push({
        path: "/home/artist-detail",
        query: {
          artist: str,
        },
      });
    },
    toAlbum(item) {
      // console.log(item);
      this.$router.push("/home/album-detail/" + item.id);
    },
    handleCurrentChange(page) {
      this.page = page;
      this.carefulSearch();
    },
  },
};
</script>
<style scoped lang='less'>
.search-detail {
  background-color: #fff;
  .search {
    height: 300px;
    width: 100%;
    background-image: url("../../assets/img/wallhaven-9m5321_1920x1080.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 -100px;
    position: relative;
    .input {
      width: 550px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0);
      .search-box {
        width: 550px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 10px 10px 0 10px;
        border-bottom: 1px solid rgb(228, 227, 227);
        .search-result {
          box-sizing: border-box;
          padding: 0 0 0 5px;
          display: flex;
          ul {
            list-style: none;
            border-bottom: 1px solid rgb(228, 227, 227);
            width: 100%;
            li {
              padding-left: 20px;
              cursor: pointer;
              padding-top: 10px;
              padding-bottom: 10px;
              &:hover {
                background-color: #489bb9;
              }
            }
          }
          .tit {
            width: 70px;
            display: flex;
            margin-left: 20px;
            padding-right: 20px;
            border-right: 1px solid rgb(190, 190, 190);
            p {
              color: darkgrey;
            }
            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
  }
  .result {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    .tabs {
      border-bottom: 1px solid #f7f7f7;
      display: flex;
      margin-bottom: 30px;
      .item {
        height: 56px;
        line-height: 56px;
        font-size: 16px;
        margin-right: 55px;
        cursor: pointer;
        &:hover {
          color: #5aabc3;
        }
      }
      .active {
        color: #5aabc3;
      }
    }
  }
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
.transition-item {
  // position: absolute;
  // width: 100%;
  // height: 100%;
  transition: all 0.4s;
}
</style>