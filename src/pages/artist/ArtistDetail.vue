<!--  -->
<template>
  <div class="artist-detail">
    <article-base-info
      :artist="artist"
      :mvCount="mvs.length"
      v-if="artist.length !== 0"
    ></article-base-info>
    <el-tabs v-model="activeNum">
      <el-tab-pane label="专辑" name="0">
        <album :id="artist.id" v-if="artist.length !== 0"></album>
      </el-tab-pane>
      <el-tab-pane label="MV" name="1" lazy>
        <artist-mv :id="artist.id" v-if="artist.length !== 0"></artist-mv>
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="2" lazy>
        <artist-desc
          :id="artist.id"
          :name="artist.name"
          v-if="artist.length !== 0"
        ></artist-desc>
      </el-tab-pane>
      <el-tab-pane label="相似歌手" name="3" lazy>
        <artist-list
          :artists="simiArtists"
          v-if="simiArtists.length !== 0"
          @changeActiveNum="activeNum = '0'"
        ></artist-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ArticleBaseInfo from "./ArtistBaseInfo.vue";
import Album from "./Album.vue";
import { getSimiArtist, getArtistMv } from "@/network/api/artist";
import ArtistMv from "./ArtistMv.vue";
import ArtistList from "./ArtistList.vue";
import ArtistDesc from "./ArtistDesc.vue";
export default {
  name: "artistDetail",
  components: { ArticleBaseInfo, Album, ArtistMv, ArtistDesc, ArtistList },
  data() {
    return {
      artist: {},
      mvs: [],
      activeNum: "0",
      simiArtists: [],
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    },
  },
  methods: {
    async init() {
      if (this.$route.query.artist !== undefined) {
        this.artist = JSON.parse(this.$route.query.artist);
        const res = await getArtistMv(this.artist.id);
        this.mvs = res.mvs;
      }
      const res2 = await getSimiArtist(this.artist.id);
      if (res2 && res2.code === 200) {
        this.simiArtists = res2.artists;
      }
    },
  },
};
</script>
<style scoped lang='less'>
.artist-detail {
  width: 930px;
  min-height: 500px;
  background-color: #fff;
  margin: 0 auto;
  .el-tabs {
    margin-left: 20px;
  }
}
</style>