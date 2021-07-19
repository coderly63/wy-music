<!--  -->
<template>
  <div class="musiclist">
    <el-table
      :data="musics"
      highlight-current-row
      style="width: 100%"
      stripe
      size="mini"
      @row-dblclick="dbClick"
      :row-class-name="rowClassName"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="name" label="歌曲标题" width="180">
      </el-table-column>
      <el-table-column prop="time" label="时长" width="70"> </el-table-column>
      <el-table-column prop="artist" label="歌手"> </el-table-column>
      <el-table-column prop="album" label="专辑"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSongUrl } from "@/network/api/music-list";
export default {
  props: {
    //应该每次只加载一部分 分批加载 现在是一次性全部加载完 资源浪费
    musics: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    //给每一行加上行数列数
    rowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    async dbClick(row, column, event) {
      console.log(row);
      this.$store.commit("setIsLoading", true);
      const res = await getSongUrl(row.id);
      if (res && res.code === 200) {
        this.$store.commit("setSongsList", this.musics);
        this.$store.commit("setListIndex", row.index - 1);
        this.$store.dispatch("nextSong", { index: 1 });
      }
    },
  },
};
</script>
<style scoped lang='less'>
</style>