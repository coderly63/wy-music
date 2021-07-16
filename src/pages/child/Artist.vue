<!--  -->
<template>
  <div class="artist">
    <tab title="语种" :array="area" @change="areaChange"></tab>
    <tab title="分类" :array="type" @change="typeChange"></tab>
    <tab title="筛选" :array="initial" @change="initialChange"></tab>
    <artist-list
      :artists="artistList"
      v-if="artistList.length !== 0"
    ></artist-list>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[30, 40, 50, 60]"
      :page-size="limit"
      layout="sizes, prev, pager, next, jumper"
      :total="600"
      background
      v-if="artistList.length !== 0"
      class="page"
    >
    </el-pagination>
  </div>
</template>

<script>
import Tab from "../../components/common/Tab.vue";
import { areas, types, Fnames } from "@/pages/artist/data";
import { getArtist } from "../../network/api/artist";
import ArtistList from "../artist/ArtistList.vue";
export default {
  components: {
    Tab,
    ArtistList,
  },
  data() {
    return {
      area: ["全部", "华语", "欧美", "日本", "韩国", "其他"],
      type: ["全部", "男歌手", "女歌手", "乐队"],
      initial: [
        "全部",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      currentArea: -1,
      currentType: -1,
      currentInitial: -1,
      limit: 30, //每页歌手数量 默认30
      offset: 0, //分页偏移量
      artistList: [],
      page: 1, //当前页
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await getArtist(
        this.currentArea,
        this.currentType,
        this.currentInitial,
        this.limit,
        this.offset
      );
      // console.log(res);
      if (res.code === 200) {
        this.artistList = res.artists;
      }
    },
    areaChange(i) {
      this.currentArea = areas[i].value;
      console.log(this.currentArea);
      this.init();
    },
    typeChange(i) {
      this.currentType = types[i].value;
      this.init();
    },
    initialChange(i) {
      this.currentInitial = Fnames[i].value;
      this.init();
    },
    handleSizeChange(size) {
      this.limit = size;
      this.init();
    },
    //当改变页数时
    handleCurrentChange(page) {
      this.page = page;
      this.offset = (this.page - 1) * this.limit;
      this.init();
      // const top = this.$refs.comments.$el.offsetTop;
      // window.scroll(0, top);
      //增加滚动使体验更好
    },
  },
};
</script>
<style scoped lang="less">
.artist {
  width: 1080px;
  min-height: 300px;
  background-color: #fff;
  margin: 0 auto;
  padding: 20px 0 10px 20px;
  .page {
    margin: 0 auto;
    margin-left: 190px;
  }
}
</style>