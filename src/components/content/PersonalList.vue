<!--  -->
<template>
  <div class="personal-list">
    <list>
      <template v-slot:title>
        <span>独家放送</span>
      </template>
      <template v-slot:content>
        <div
          class="item"
          v-for="item in personalList"
          :key="item.id"
          @click="toDetail(item.id)"
        >
          <div class="img">
            <img :src="item.picUrl" />
          </div>
          <div class="text">
            {{ item.copywriter }}
          </div>
        </div>
      </template>
    </list>
  </div>
</template>

<script>
import { getPersonal } from "@/network/api/music-list";
import List from "../common/List.vue";
export default {
  data() {
    return {
      personalList: [],
    };
  },
  components: {
    List,
  },
  async created() {
    const res = await getPersonal();
    if (res && res.code === 200) {
      // console.log(res);
      this.personalList = res.result;
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push("/home/mv/" + id);
    },
  },
};
</script>
<style scoped lang='less'>
.personal-list {
  .item {
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 30px;
    cursor: pointer;
    .img {
      width: 500px;
      height: 200px;
      img {
        width: 500;
        height: 200px;
      }
    }
    .text {
      text-align: center;
    }
  }
}
</style>