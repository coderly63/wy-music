<!--  -->
<template>
  <div class="top-list">
    <list>
      <template v-slot:title>
        <h3>官方榜</h3>
      </template>
      <template v-slot:content>
        <div class="content">
          <top-list-item
            v-if="topList[0] && topList[0].id"
            :id="topList[0].id"
            :bgColor="['#56a1e3', '#5a8beb']"
            :title="topList[0].name.slice(-3).split('')"
          ></top-list-item>
          <top-list-item
            v-if="topList[1] && topList[1].id"
            :id="topList[1].id"
            :bgColor="['#34aabe', '#56c2cd']"
            :title="topList[1].name.slice(-3).split('')"
          ></top-list-item>
          <top-list-item
            v-if="topList[2] && topList[2].id"
            :id="topList[2].id"
            :bgColor="['#d53d6a', '#eb638d']"
            :title="topList[2].name.slice(-3).split('')"
          ></top-list-item>
          <top-list-item
            v-if="topList[3] && topList[3].id"
            :id="topList[3].id"
            :bgColor="['#c7523c', '#cc7455']"
            :title="topList[3].name.slice(-3).split('')"
          ></top-list-item>
        </div>
      </template>
    </list>
    <music-list v-if="topList.length !== 0" :topList="topList"></music-list>
  </div>
</template>

<script>
import { getTopList } from "@/network/api/music-list";
import List from "../../components/common/List.vue";
import TopListItem from "../top-list/TopListItem.vue";
import MusicList from "../top-list/MusicList.vue";
export default {
  components: { List, TopListItem, MusicList },
  data() {
    return {
      topList: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await getTopList();
      this.topList = res.list;
      // console.log(this.topList);
    },
  },
};
</script>
<style scoped lang="less">
.top-list {
  width: 1200px;
  min-height: 300px;
  background-color: #fff;
  margin: 0 auto;
  .content {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>