<!--  -->
<template>
  <div class="music-list">
    <list>
      <template v-slot:title>
        <h3>全球榜</h3>
      </template>
      <template v-slot:content>
        <div class="content">
          <div
            class="item"
            v-for="item in list"
            @click="toDetail(item.id)"
            :key="item.description"
          >
            <img :src="item.coverImgUrl" />
            <div class="desc">{{ item.updateFrequency }}</div>
          </div>
        </div>
      </template>
    </list>
  </div>
</template>

<script>
import List from "../../components/common/List.vue";
export default {
  components: { List },
  props: {
    topList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.list = this.topList.splice(4);
    console.log(this.list);
  },
  methods: {
    toDetail(id) {
      if (id) {
        this.$router.push("/home/playlist/" + id);
      }
    },
  },
};
</script>
<style scoped lang='less'>
.music-list {
  .content {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin: 20px 20px 0 10px;
      cursor: pointer;
      img {
        width: 190px;
        height: 190px;
      }
    }
  }
}
</style>